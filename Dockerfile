FROM xtls/xray-core:latest

COPY config.json /etc/xray/config.json

EXPOSE 80

CMD ["xray", "run", "-config", "/etc/xray/config.json"]
