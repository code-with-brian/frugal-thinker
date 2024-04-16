# Base image
FROM node:lts-alpine AS base
WORKDIR /app

# Dependencies
FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Builder stage
FROM dependencies AS builder
COPY . .
RUN mkdir -p /data

# Note: Alpine does not use apt-get, it uses apk. Add apk update && apk add openssh-client if needed.
# RUN apt-get install openssh-client

RUN npm run build

# Runtime image
FROM base AS runtime
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle
COPY --from=litestream/litestream:latest /usr/local/bin/litestream /usr/local/bin/litestream
COPY --from=builder /app/scripts/run.sh run.sh
COPY --from=builder /app/litestream.yml /etc/litestream.yml
RUN chmod +x run.sh

# Copy db.sqlite3 to /data directory in the runtime container
COPY ./db.sqlite3 /data/db.sqlite3

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

CMD ["sh", "run.sh"]
