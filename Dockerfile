FROM golang:1.24-alpine AS builder

RUN apk add --no-cache git
RUN git clone --depth=1 --branch v25.1.30 https://github.com/XTLS/Xray-core.git /xray
WORKDIR /xray
RUN GOTOOLCHAIN=go1.24 go build -o /usr/local/bin/xray ./main

FROM alpine:latest
RUN apk add --no-cache ca-certificates
COPY --from=builder /usr/local/bin/xray /usr/local/bin/xray
COPY config.json /etc/xray/config.json
EXPOSE 80
CMD ["xray", "run", "-config", "/etc/xray/config.json"]
