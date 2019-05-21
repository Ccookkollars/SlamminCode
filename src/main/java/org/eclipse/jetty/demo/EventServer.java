package org.eclipse.jetty.demo;

import java.io.File;

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
    static Logger log = Log.getLogger(EventServer.class);

    public static void main(String[] args) {
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
}
