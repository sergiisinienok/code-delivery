const path = require('path');
const { ECR } = require('../aws-sdk');
const shell = require('shelljs');
const yamljs = require('yamljs');
const gitInfo = require('./git-info');
const pathToServerless = path.resolve(__dirname, '../../serverless.yml');
const serverlessFile = yamljs.load(pathToServerless);

const serviceName = serverlessFile.service;
const imageTag = gitInfo.imageTag();
const containerName = `${serviceName}:${imageTag}`

const ecr = new ECR();

const exec = (...args) => {
  const execution =  shell.exec(...args);

  if (execution.stderr) throw new Error(execution.stderr);

  return execution;
}

ecr.getAuthorizationToken({}).promise()
  .then(data => {
    const authorizationData = data.authorizationData[0];
    const { authorizationToken, proxyEndpoint } = authorizationData;
    const decodedToken = Buffer.from(authorizationToken, 'base64').toString();
    const [username, password] = decodedToken.split(':');
    const repository = proxyEndpoint.replace('https:\/\/', '');

    return { username, password, proxyEndpoint, repository };
  })
  .then(data =>
    ecr.describeRepositories({}).promise()
      .then(response => response.repositories
        .map(repository => repository.repositoryName)
        .find(repositoryName => repositoryName === serviceName)
      )
      .then(repositoryName => (
        repositoryName ? data : ecr.createRepository({ repositoryName: serviceName }).promise().then(() => data)
      ))
  )
  .then(({ username, password, proxyEndpoint, repository }) => {
    try {
      execution = shell.echo(password).exec(`docker login -u ${username} --password-stdin ${proxyEndpoint}`);

      if (execution.stderr) throw new Error(execution.stderr);
    } catch (error) {
      exec(`docker login -u ${username} -p ${password} ${proxyEndpoint}`);
    }

    // eslint-disable-next-line max-len
    const npm = `--build-arg NPM_USERNAME=${process.env.NPM_USERNAME} --build-arg NPM_PASSWORD=${process.env.NPM_PASSWORD} --build-arg NPM_EMAIL=${process.env.NPM_EMAIL}`;

    exec(`docker build -t ${containerName} ${npm} .`);
    exec(`docker tag ${containerName} ${repository}/${containerName}`);
    exec(`docker push ${repository}/${containerName}`);

    return `Image ${repository}/${containerName} was pushed successfuly`
  })
  .then(message => {
    console.log(message);

    process.exit();
  })
  .catch(error => {
    console.log(error);

    process.exit(1);
  });
