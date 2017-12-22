/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Phiyawat
 */
@Controller

public class JSONController {

    @RequestMapping(value = "/price", method = RequestMethod.POST)
    public ResponseEntity<Flight> update(@RequestBody Flight f) {
        if (f != null) {
            f.setVat(7);
            double result = ((f.getPrice()*43.75)+f.getService()+f.getInsurance());
            //System.out.println(result);
            f.setTotalofFlight(result+(f.getVat()*0.01)*result);
            //System.out.println(f.getVat());
            //f.setTotalofFlight(String.valueOf(f.getPrice()+f.getService()+f.getInsurance()));
            
        }
        return new ResponseEntity<Flight>(f, HttpStatus.OK);
    }

}
