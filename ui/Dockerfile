FROM node:11-alpine AS builder

COPY . ./cd-ui
WORKDIR /cd-ui

RUN npm install
RUN npm run build:prod:en
# ========== end of builder section ===========

# ========== Start of server section ==========
FROM alpine:3.6

COPY --from=builder /cd-ui/dist/browser /www

RUN set -x && \
    apk add --update --no-cache nginx-mod-http-headers-more && \
    mkdir -p /run/nginx

COPY ./config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./config/nginx/mime.types /etc/nginx/conf/mime.types
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 80