/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.runrunrun;

import org.eclipse.jetty.demo.EventServer;


public class Dinosaur {
    
    public static final String BLUECOLOR = "blue";
    public static final String REDCOLOR = "red";
    
    private String color;
    private int x;
    private int y;
    
    public Dinosaur(){
        color = BLUECOLOR;
        x = 0;
        y = 0;
    }

    
     public Dinosaur(String color, int xpos, int ypos){
        this.color = color;
        this.x = xpos;
        this.y = ypos;
    }
     
     public String moveAbsolute(int newx, int newy){
         this.setX(newx);
         this.setY(newy);
         return EventServer.mrg.toJson(this);
     }
     
      public String moveRelative(int newx, int newy){
         this.moveAbsolute(this.x+newx, this.y+newy);
         return EventServer.mrg.toJson(this);
     }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
     
     
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    
}
