const shell = require('shelljs');
const minimist = require('minimist');
const moment = require('moment');
const gitInfo = require('./git-info');

const commandLineArguments = process.argv.slice(2).join(' ');
const serviceName = process.env.SERVICE_NAME || 'code-delivery-ui';

const { stage } = minimist(commandLineArguments.split(' '));
const version = gitInfo.tag();
const deploymentTime = moment().utc().format();

const { SERVICE_NAME = 'code-delivery-ui' } = process.env;

const exec = (...args) => {
  const execution = shell.exec(...args);

  if (execution.code) throw new Error(execution.stderr);

  return execution;
};

async function main() {
  exec('npm run deploy:docker-publish');
  exec(`sls deploy ${commandLineArguments}`);
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);

    process.exit(1);
  });
