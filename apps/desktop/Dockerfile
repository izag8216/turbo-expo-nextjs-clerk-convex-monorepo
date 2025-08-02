FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/build ./build

VOLUME ["/app/build"]

CMD ["echo", "Desktop app built successfully"]
