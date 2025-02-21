# BELABOX Auto Start Streaming

This is a simple script to enable auto-start streaming on the BELABOX. The service is configured to wait for `belaUI.socket` (and delay for an extra 10 seconds) before running. Increase this delay if you need time for modems, WiFi etc. to become active.

## Files to Download

-  `autostart.js` (to be placed in `/home/user`)
- `BELABOXAutoStart.service` (to be placed in `/etc/systemd/system/`) so it can run as a service on boot.

## Installation Steps

1. Change `let BELABOXpassword = "password";` at the top of the script to match your BELABOX UI password.
2. Place `autostart.js` in your home directory located at `/home/user`
3. Install the service as mentioned above in `/etc/systemd/system/`
4. Reload systemd `sudo systemctl daemon-reload`
5. Enable the service: `sudo systemctl enable BELABOXAutoStart`

### Changing the delay
Some modems take longer to recognize and become ready than others. By default, the delay between BELA UI starting up and the Autostart working is 10 seconds. You can change `ExecStartPre=/bin/sleep 10` value to whatever is required. 

### Stopping / Disabling auto start
You can simply disable the service from starting: `sudo systemctl disable BELABOXAutoStart`

### Note: 
This doesn't change any of the BELABOX code and simply uses a local websocket connection to connect, get the current saved config and send the start stream command. That doesn't mean it won't break in the future if changes are made to belaUI though.
