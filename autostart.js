  const ws = new (require('ws'))('ws://belabox.local');
  
  // Change to match your BELABOX UI password.
  let BELABOXpassword = "password";

  // On Opened connection to BELABOX, handle its response.
  ws.on('open', () => {
    console.log('[AUTOSTART] Connected to the WebSocket server.');
    sendLoginAuth(BELABOXpassword);
  });

  // Received Data
  ws.on('message', (message) => {
    handleResponse(message);
  });

  // Handle connection errors
  ws.on('error', (error) => {
    console.error('[AUTOSTART] WebSocket error:', error);
  });
  
  // Handle connection closure
  ws.on('close', () => {
    console.log('[AUTOSTART] Disconnected.');
  });

  /**
   * Process the response from the BELABOX. We only need this
   * to grab the default saved config for starting the stream.
   */
  function handleResponse(jsonData) {
    try {
        const message = JSON.parse(jsonData.toString('utf8'));
        for (const type in message) {
            switch (type) {
                case 'config':
                    console.log("[AUTOSTART] Received Config Object.");
                    startStreaming(message[type]);
                break;
            }
        }
      } catch (error) {
        console.error('[AUTOSTART] ERROR', error);
    }
  }

  /**
   * Send login authentication.
   */
  function sendLoginAuth(password) {
    try {
        ws.send(JSON.stringify({auth: {password, persistent_token: false}}));
      } catch (error) {
        console.error('[AUTOSTART] ERROR', error);
    }
  }

  /**
   * Send the start stream process.
   */
  function startStreaming(config) {
    try {
        if (config) {
            console.log("[AUTOSTART] Config valid. Sending start stream command.")
            ws.send(JSON.stringify({start: config}));
            disconnect();
        }
    } catch (error) {
        console.error('[AUTOSTART] ERROR', error);
    }
  }

  /**
   * Disconnect from the websocket.
   */
  function disconnect() {
    try {
        ws.close();
    } catch (error) {
        console.error('[AUTOSTART] ERROR', error);
    }
  }
