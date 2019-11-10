/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.runrunrun;

import javax.websocket.Session;

public class Player {
    
    private String idNumber;
    private Session sess;

    public Session getSess() {
        return sess;
    }

    public void setSess(Session sess) {
        this.sess = sess;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Dinosaur getDinosaur() {
        return dinosaur;
    }

    public void setDinosaur(Dinosaur dinosaur) {
        this.dinosaur = dinosaur;
    }
    private Dinosaur dinosaur;
    
    public Player(String id, Dinosaur dino, Session sess){
        this.idNumber = id;
        this.dinosaur = dino;
        this.sess = sess;
    }
    
    
}
