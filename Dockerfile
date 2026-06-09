FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git
RUN git clone https://github.com/XTLS/Xray-core.git /xray
WORKDIR /xray
RUN go build -o /usr/local/bin/xray ./main

FROM alpine:latest
RUN apk add --no-cache ca-certificates
COPY --from=builder /usr/local/bin/xray /usr/local/bin/xray
COPY config.json /etc/xray/config.json
EXPOSE 80
CMD ["xray", "run", "-config", "/etc/xray/config.json"]
