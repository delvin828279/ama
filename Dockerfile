FROM golang:1.24-alpine AS builder

RUN apk add --no-cache git
RUN git clone --depth=1 --branch v24.12.31 https://github.com/XTLS/Xray-core.git /xray
WORKDIR /xray
RUN go build -o /usr/local/bin/xray ./main

FROM alpine:latest
RUN apk add --no-cache ca-certificates nginx
COPY --from=builder /usr/local/bin/xray /usr/local/bin/xray
COPY config.json /etc/xray/config.json
COPY index.html /usr/share/nginx/html/index.html
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 80
CMD ["/start.sh"]
