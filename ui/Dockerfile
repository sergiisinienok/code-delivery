FROM node:11-alpine AS builder
COPY . ./angular-example-app
WORKDIR /angular-example-app
RUN npm install
RUN npm run build:prod:en

FROM nginx:1-alpine
COPY --from=builder /angular-example-app/dist/browser/ /usr/share/nginx/html
EXPOSE 80

-----

FROM node:8.12.0-alpine as builder

ARG NPM_USERNAME
ARG NPM_PASSWORD
ARG NPM_EMAIL

WORKDIR /dm-ui

RUN set -x && apk add --update --no-cache git

COPY ./tools/scripts/npm-login /dm-ui/tools/scripts/npm-login

# Login to npm
RUN cd ./tools/scripts/npm-login && \
    npm install --unsafe-perm --loglevel=warn && \
    node run.js "$NPM_USERNAME" "$NPM_PASSWORD" "$NPM_EMAIL"

COPY package.json /dm-ui/package.json
COPY package-lock.json /dm-ui/package-lock.json

RUN set -x && \
    git config --global credential.helper store && \
    set +x && \
    echo "https://$NPM_USERNAME:$NPM_PASSWORD@bit.heartlandcommerce.com/" > ~/.git-credentials && \
    set -x && \
    npm install --unsafe-perm --loglevel=warn && \
    rm -f ~/.git-credentials

COPY . /dm-ui

RUN set -x && npm run build:prod
# ========== end of builder section ==========

# ========== Start of server section ==========
FROM alpine:3.6

COPY --from=builder /dm-ui/dist /www

RUN set -x && \
    apk add --update --no-cache nginx-mod-http-headers-more && \
    mkdir -p /run/nginx

COPY ./config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/nginx/mime.types /etc/nginx/conf/mime.types
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 80