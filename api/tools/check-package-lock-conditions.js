const fs = require('fs');
const fp = require('lodash/fp').convert({ 'cap': false });

const PRIVATE_REGISTRY = 'https://npm.heartlandcommerce.com/repository/npm-all/';

const readFile = fp.flow(fs.readFileSync, fp.toString, JSON.parse);
const publicPackagesPredicate = fp.flow(fp.get('resolved'), fp.startsWith(PRIVATE_REGISTRY), fp.negate(Boolean));
const getPackages = object => {
  const { dependencies } = object;

  return dependencies
    ? [object, ...fp.flatMap((val, key) => getPackages({...val, name: key }), dependencies)]
    : [object];
};

const publicPackagesErrors = fp.flow(
  readFile,
  getPackages,
  fp.filter('resolved'),
  fp.filter(publicPackagesPredicate),
  fp.map(({ name, resolved }) => `${name}: ${resolved}`),
  fp.uniq,
)('./package-lock.json');

if (publicPackagesErrors.length) {
  console.log(`All packages should be resolved from ${PRIVATE_REGISTRY} \n`);
  console.log(fp.join('\n', publicPackagesErrors));

  process.exit(1);
}
