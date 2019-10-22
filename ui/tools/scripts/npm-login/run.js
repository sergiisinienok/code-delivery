const RegistryClient = require('npm-registry-client');
const fs = require('fs');
const home = require('os').homedir();

const registry = new RegistryClient({});
const repository = 'npm.heartlandcommerce.com/repository/npm-all/';
const repositoryUri = `https://${repository}`;

// arguments
const username = process.argv[2];
const password = process.argv[3];
const email = process.argv[4];

if (!username) {
  throw new Error('NPM_USERNAME environment variable is required');
}
if (!password) {
  throw new Error('NPM_PASSWORD environment variable is required');
}
if (!email) {
  throw new Error('NPM_EMAIL environment variable is required');
}

const auth = {
  username,
  password,
  email,
};

registry.adduser(repositoryUri, { auth }, (error, data) => {
  if (error) {
    throw new Error(error);
  }
  const npmrc = `@hc:registry=${repositoryUri}
//${repository}:_authToken=${data.token}`;
  try {
    fs.writeFileSync(`${home}/.npmrc`, npmrc);
  } catch (err) {
    throw new Error(err);
  }
  /* eslint-disable no-console */
  console.log('NPM login was successful, ~/.npmrc written on the disk');
  process.exit(0);
});
