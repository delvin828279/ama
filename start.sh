#!/bin/sh
nginx -g "daemon off;" &
xray run -config /etc/xray/config.json
