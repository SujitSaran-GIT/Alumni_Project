// services/websocket.service.js
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocketServer({ server });
    this.clients = new Map(); // Store clients with user IDs

    this.setupConnectionHandlers();
  }

  setupConnectionHandlers() {
    this.wss.on('connection', (ws) => {
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);

          if (data.type === 'AUTH' && data.token) {
            this.handleAuthentication(ws, data.token);
          }
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      });

      ws.on('close', () => {
        this.removeClient(ws);
      });
    });
  }

  async handleAuthentication(ws, token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      ws.userId = userId;
      this.clients.set(userId, ws);

      ws.send(JSON.stringify({
        type: 'AUTH_SUCCESS',
        message: 'WebSocket authenticated successfully'
      }));
    } catch (error) {
      console.error('WebSocket auth error:', error);
      ws.send(JSON.stringify({
        type: 'AUTH_ERROR',
        message: 'Authentication failed'
      }));
      ws.close();
    }
  }

  removeClient(ws) {
    if (ws.userId) {
      this.clients.delete(ws.userId);
    }
  }

  sendToUser(userId, payload) {
    const client = this.clients.get(userId.toString());
    if (client && client.readyState === 1) {
      client.send(JSON.stringify(payload));
    }
  }

  broadcast(payload, excludeUserIds = []) {
    this.wss.clients.forEach(client => {
      if (
        client.readyState === 1 &&
        client.userId &&
        !excludeUserIds.includes(client.userId.toString())
      ) {
        client.send(JSON.stringify(payload));
      }
    });
  }
}

let webSocketService = null;

export const initializeWebSocket = (server) => {
  if (!webSocketService) {
    webSocketService = new WebSocketService(server);
  }
  return webSocketService;
};

export const getWebSocketService = () => {
  if (!webSocketService) {
    throw new Error('WebSocket service not initialized');
  }
  return webSocketService;
};
