/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

/**
 *
 * @author User
 */
public class Flight {

	int vat;
        double totalofFlight;
        int price;
        int insurance;
        int service;
        
        
    public int getVat(){
        return vat;
    }

    void setVat(int vat) {
       this.vat = vat;
    }

    public double getTotalofFlight(){
        return totalofFlight;
    }
    
    void setTotalofFlight(double totalofFlight) {
        this.totalofFlight = totalofFlight;
    }
    
    public int getPrice(){
        return price;
    }

    void setPrice(int price) {
       this.price = price;
    }
    
    public int getInsurance(){
        return insurance;
    }

    void setInsurance(int insurance) {
       this.insurance = insurance;
    }
    
    public int getService(){
        return service;
    }

    void setService(int service) {
       this.service = service;
    }
    
    

}
