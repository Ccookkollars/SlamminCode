package org.eclipse.jetty.demo;

import java.io.IOException;
import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ClientEndpoint
@ServerEndpoint(value = "/events/")
public class EventSocket {

    private static final Logger LOG = LoggerFactory.getLogger(EventSocket.class);

    static {
        LOG.info("Hey this is the normal way to write out log messages");
    }

    @OnOpen
    public void onWebSocketConnect(Session sess) {
        System.out.println("Socket Connected: " + sess);

    }

    @OnMessage
    public void onWebSocketText(String message, Session sess) {
        String realMessage = message.toUpperCase();
        try {
            switch (realMessage) {
                case "HELLO":
                    System.out.println("Received TEXT message: " + message);
                    break;
                case "W":
                    System.out.println("Player Moved Up");

                    sess.getBasicRemote().sendText(EventServer.red.moveRelative(0, -5));

                    break;
                case "A":
                    System.out.println("Player Moved Left");
                    sess.getBasicRemote().sendText(EventServer.red.moveRelative(-5, 0));

                    break;
                case "S":
                    System.out.println("Player Moved Down");
                    sess.getBasicRemote().sendText(EventServer.red.moveRelative(0, 5));

                    break;
                case "D":
                    System.out.println("Player Moved Right");
                    sess.getBasicRemote().sendText(EventServer.red.moveRelative(5, 0));
                    break;

            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    @OnClose
    public void onWebSocketClose(CloseReason reason) {
        System.out.println("Socket Closed: " + reason);
    }

    @OnError
    public void onWebSocketError(Throwable cause) {
        cause.printStackTrace(System.err);
    }

    private void sendMessage(Session sess) {

        try {
            sess.getBasicRemote().sendText("This better work");
        } catch (Throwable t) {

        }
    }
}
