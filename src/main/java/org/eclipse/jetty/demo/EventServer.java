package org.eclipse.jetty.demo;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.runrunrun.Dinosaur;
import com.runrunrun.Player;
import java.util.ArrayList;
import java.util.HashMap;
import java.io.File;
import java.io.IOException;
import java.util.function.BiConsumer;
import java.util.logging.Level;
import javax.websocket.Session;

import javax.websocket.server.ServerContainer;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.util.log.Log;
import org.eclipse.jetty.util.log.Logger;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;

public class EventServer {
    //Create Singleton Instance
    private static EventServer eventServer = null;
    private EventServer(){
        
    }
    public static EventServer getInstance() 
    { 
        if (eventServer == null) 
            eventServer = new EventServer(); 
  
        return eventServer; 
    }  
    
    public static final Gson mrg= new GsonBuilder().create();
    static Logger log = Log.getLogger(EventServer.class);
    
    //Setup Dinosaurs
    public Dinosaur red = new Dinosaur(Dinosaur.REDCOLOR,0,0);
    public Dinosaur blue = new Dinosaur(Dinosaur.BLUECOLOR,0,0);
    private ArrayList<Dinosaur> dinoList = new ArrayList<>(); 
    private int dinoIndex = 0;
    
    public HashMap<String, Player> playerHash = new HashMap<>(); 
     

    public static void main(String[] args) {
        
     getInstance().startServer();
    }
    
    
    public String addPlayer(String playerID, Session sess){
        StringBuilder b = new StringBuilder();
        Dinosaur d = dinoList.get(dinoIndex);
        playerHash.put(playerID, new Player(playerID, d, sess));
        dinoIndex++;
        return b.append("Player " + playerID + " assigned Dino " ).toString();
    }
    
    private void startServer(){
        Server server = new Server();
                
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(8080);
        server.addConnector(connector);

        // Servlet for websockets
        ServletContextHandler socketContext = new ServletContextHandler(ServletContextHandler.SESSIONS);
        socketContext.setContextPath("/sockets/");

        // Resource handler for serving the game front end
        ResourceHandler resourceHandler = new ResourceHandler();
        ContextHandler resourceContext = new ContextHandler();
        resourceContext.setContextPath("/");
        File resourceBase = new File("src/main/webapp");
        resourceContext.setBaseResource(Resource.newResource(resourceBase));
        resourceContext.setHandler(resourceHandler);

        // Mash those bitches together, we need to do both of them
        HandlerCollection contexts = new HandlerCollection(socketContext, resourceContext);
        server.setHandler(contexts);
        
        this.populateDinoList();
        
       

        try {
            // Initialize javax.websocket layer
            ServerContainer wscontainer = WebSocketServerContainerInitializer.configureContext(socketContext);

            // Add WebSocket endpoint to javax.websocket layer
            wscontainer.addEndpoint(EventSocket.class);

            server.start();
//            server.dump(System.err); // just kind of annoying
            server.join();
        } catch (Throwable t) {
            t.printStackTrace(System.err);
        }
    }
    
    public void handleSocketMessage(String message, String sessID, Session sess){
        Player sender = getInstance().playerHash.get(sessID);
        String realMessage = message.toUpperCase();
        String outputMessage = "";
        
            switch (realMessage) {
                case "HELLO":
                    System.out.println("Received TEXT message: " + message);
                    break;
                case "W":
                    System.out.println("Player " + sender.getDinosaur().toString() + " Moved Up");
                    outputMessage = sender.getDinosaur().moveRelative(0, -5);
                    break;
                case "A":
                    System.out.println("Player " + sender.getDinosaur().toString() + " Moved Left");
                    outputMessage = sender.getDinosaur().moveRelative(-5, 0);

                    break;
                case "S":
                    System.out.println("Player " + sender.getDinosaur().toString() + " Moved Down");
                    outputMessage = sender.getDinosaur().moveRelative(0, 5);

                    break;
                case "D":
                    System.out.println("Player " + sender.getDinosaur().toString() + " Moved Right");
                    outputMessage = sender.getDinosaur().moveRelative(5, 0);
                    break;

            }
            
        getInstance().updatePlayers(outputMessage);
    }
    
    
    private void updatePlayers(String message){
     
           
            playerHash.forEach(new BiConsumer<String, Player>(){
            @Override
            public void accept(String s, Player p){
                try {
                    p.getSess().getBasicRemote().sendText(message);
                } catch (IOException ex) {
                    java.util.logging.Logger.getLogger(EventServer.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            
            
            });
    
    }
    
    private void populateDinoList(){
     this.dinoList.add(red);
     this.dinoList.add(blue);
    }
}
