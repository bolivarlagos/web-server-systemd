## Starting Web-server as a Linux systemd

Linux:
```
vim /etc/systemd/system/web-server.service
```
web-server.service:
```
[Unit]
Description=Anything
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/node /path/to/file.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
Start the server:
```
systemctl start web-server
```