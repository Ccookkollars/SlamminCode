package org.eclipse.jetty.demo;

import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ClientEndpoint
@ServerEndpoint(value="/events/")
public class EventSocket
{
    @OnOpen
    public void onWebSocketConnect(Session sess)
    {
        System.out.println("Socket Connected: " + sess);
                 
    }
    
    @OnMessage
    public void onWebSocketText(String message, Session sess)
    {
        String realMessage = message.toUpperCase();
        
        switch(realMessage){
            case "HELLO" :    
            System.out.println("Received TEXT message: " + message);
            break;
            case "W":
            System.out.println("Player Moved Up");  
            sendMessage(sess);
            break;
            case "A":
            System.out.println("Player Moved Left");    
            break;
            case "S":
            System.out.println("Player Moved Down");    
            break;
            case "D":
            System.out.println("Player Moved Right");    
            break;
        }
    }
    
    @OnClose
    public void onWebSocketClose(CloseReason reason)
    {
        System.out.println("Socket Closed: " + reason);
    }
    
    @OnError
    public void onWebSocketError(Throwable cause)
    {
        cause.printStackTrace(System.err);
    }
    
    private void sendMessage(Session sess){
        
        try{
             sess.getBasicRemote().sendText("This better work");
        }
        catch(Throwable t){
            
        }
    }
}
