#!/bin/sh

set -ex

project='pos-datamanagement-ui';
registry='https://npm.heartlandcommerce.com/repository/npm-private/';

cd /;
git clone -b $BRANCH_NAME --single-branch "https://${HEARTLAND_USERNAME}:${HEARTLAND_PASSWORD}@bit.heartlandcommerce.com/scm/hc/${project}.git";
cd ${project};

git config user.name ${HEARTLAND_USERNAME};
git config user.email ${HEARTLAND_EMAIL};

git checkout $BRANCH_NAME;

npm i;

current_version=$(git describe --tags `git rev-list --tags --max-count=1` | sed 's/BUILD-//g');

major_version=$(echo $current_version | sed 's/\./\n/g' | sed -n 1p);
minor_version=$(echo $current_version | sed 's/\./\n/g' | sed -n 2p);
bugfix_version=$(echo $current_version | sed 's/\./\n/g' | sed -n 3p);

tag_name="${major_version}.${minor_version}.$(($bugfix_version + 1))";

git tag -a ${tag_name} -m "Increment version to ${tag_name} by Jenkins";
git checkout $tag_name;

npm run deploy:docker-publish;

case "${PUSH_TAG_TO_GIT}" in
  "true" ) git push origin --tags;;
  * ) echo "PUSH_TAG_TO_GIT has been set to false"
esac

npm config set registry ${registry};
npm login --registry=${registry}<<!
$HEARTLAND_USERNAME
$HEARTLAND_PASSWORD
$HEARTLAND_EMAIL
!

npm --no-git-tag-version version $tag_name -m "Increment version to ${tag_name} by Jenkins";

case "${PUBLISH_TO_NEXUS}" in
  "true" ) npm publish .;;
  * ) echo "PUBLISH_TO_NEXUS has been set to false"
esac
