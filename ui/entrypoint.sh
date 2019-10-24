#!/bin/sh
# Shell strict mode:
# - Abort if process return non-zero exit code
# - Show undefined variable error
# - Abort pipeline if process return non-zero exit code
set -euo pipefail

APP_VARS='
API_URI
API_JWT
COMMIT
BRANCH
VERSION
DEPLOYMENT_TIME
STAGE
IMAGE_TAG
'

init_app_vars() {
  FILE=$(find $1 | head -1)
  echo " - ${FILE}"

  for VARIABLE in ${APP_VARS}; do
    echo " -- replacing ${VARIABLE}"

    VALUE=$(eval "echo \$${VARIABLE}");

    # replace any '${SOMETHING}' -> 'VALUE' where `VALUE` = `printenv SOMETHING`
    sed -ie 's?${'"${VARIABLE}"'}?'"${VALUE}"'?g' ${FILE}
  done
}

# Process nginx configuration files
init_app_vars '/etc/nginx/conf.d/default.conf'

# Process dm application files
init_app_vars '/www/index.html'
init_app_vars '/www/main-*.js'
# init_app_vars '/www/vendor.*bundle.js'
# init_app_vars '/www/polyfills.*bundle.js'

nginx -g "daemon off;"
