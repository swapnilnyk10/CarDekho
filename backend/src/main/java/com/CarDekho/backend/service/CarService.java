package com.CarDekho.backend.service;

import org.springframework.stereotype.Service;

import com.CarDekho.backend.model.Car;
import com.CarDekho.backend.repository.CarRepository;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class CarService {
    
    private CarRepository carRepository;

    public CarService(CarRepository carRepository){
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    public List<Car> filterCars(String fuelType, String bodyType, Double minPrice, Double maxPrice){
        List<Car> cars = carRepository.findAll();

        if(fuelType != null && !fuelType.isEmpty()){
            cars = cars.stream()
                        .filter(c->c.getFuelType().equalsIgnoreCase(fuelType))
                        .collect(Collectors.toList());
        }
        if(bodyType != null && !bodyType.isEmpty()){
            cars = cars.stream()
                        .filter(c->c.getBodyType().equalsIgnoreCase(bodyType))
                        .collect(Collectors.toList());
        }
        if(minPrice != null && maxPrice != null){
            cars = cars.stream()
                        .filter(c->c.getPrice() >= minPrice && c.getPrice()<= maxPrice)
                        .collect(Collectors.toList());
        }
        else if(maxPrice != null){
            cars = cars.stream()
                        .filter(c->c.getPrice()<= maxPrice)
                        .collect(Collectors.toList());
        }

        else if(minPrice != null){
            cars = cars.stream()
                        .filter(c->c.getPrice()>= minPrice)
                        .collect(Collectors.toList());
        }

        return cars;
    }

    public Car getCarById(Long id){
        return carRepository.findById(id).orElse(null);
    }

    public Car addCar(Car car){
        return carRepository.save(car);
    }

    public void deleteCar(Long id){
        carRepository.deleteById(id);
    }
}
