package com.CarDekho.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CarDekho.backend.service.*;
import com.CarDekho.backend.model.*;
import java.util.*;


@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {
    
    private CarService carService;

    public CarController(CarService carService){
        this.carService = carService;
    }

    @GetMapping
    public List<Car> getAllCars(){
        return carService.getAllCars();
    }

    @GetMapping("/filter")
    public List<Car> filteCars(
        @RequestParam(required = false) String fuelType,
        @RequestParam(required = false) String bodyType,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    )
    {
        return carService.filterCars(fuelType, bodyType, minPrice, maxPrice);
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id){
        return carService.getCarById(id);
    }

    @PostMapping
    public Car addCar(@RequestBody Car car){
        return carService.addCar(car);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id){
        carService.deleteCar(id);
    }
}
