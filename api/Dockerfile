# =============Start of Builder section================
FROM node:12-alpine AS builder

COPY . ./cd-api

WORKDIR /cd-api

RUN npm install

# RUN npm run build

# ============End of Builder section================

# ============Start of server section================
FROM node:12-alpine

COPY --from=builder /cd-api /app

WORKDIR /app

RUN ls -lah

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 80

# ============End of server section==================