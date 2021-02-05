import { v4 } from "https://deno.land/std/uuid/mod.ts";

import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
  acceptable,
} from "https://deno.land/std/ws/mod.ts";

import Config from "../config/config.ts";

const users = new Map<string, WebSocket>();

function broadcast(message: string, senderId?: string): void {
  if (!message) return;
  for (const user of users.values()) {
    console.log("message sending", message);
    user.send(senderId ? `[${senderId}]: ${message}` : message);
  }
}

async function handleWs(sock: WebSocket) {
  console.log("socket connected!");
  try {
    const userId = v4.generate();

    // Register user connection
    users.set(userId, sock);
    broadcast(`> User with the id ${userId} is connected`);

    for await (const ev of sock) {
      console.log("ev", ev);
      if (typeof ev === "string") {
        // text message.
        console.log("ws:Text", ev);
        await sock.send(ev);
      } else if (ev instanceof Uint8Array) {
        // binary message.
        console.log("ws:Binary", ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping.
        console.log("ws:Ping", body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close.
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);
        users.delete(userId);
        broadcast(`> User with the id ${userId} is disconnected`);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      console.info("closing socket");
      await sock.close(1000).catch(console.error);
    }
  }
}

const websocketListener = async (context: any) => {
  console.log("entered");

  const port: number | string = Config.WEBSOCKET_PORT;

  if (!acceptable(context.request.serverRequest))
    throw new Error("request is not acceptable");

  console.log(`websocket server is running on :${port}`);

  const {
    conn,
    r: bufReader,
    w: bufWriter,
    headers,
  } = context.request.serverRequest;
  acceptWebSocket({
    conn,
    bufReader,
    bufWriter,
    headers,
  })
    .then(handleWs)
    .catch(
      async (err: any): Promise<void> => {
        console.error(`failed to accept websocket: ${err}`);
        // await req.respond({ status: 400 });
      }
    );
};

export default websocketListener;
