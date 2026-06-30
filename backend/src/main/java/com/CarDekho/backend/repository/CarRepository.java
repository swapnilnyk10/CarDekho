package com.CarDekho.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.CarDekho.backend.model.*;
import java.util.*;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    
    List<Car> findByFuelType(String fuelType);
    List<Car> findByBodyType(String bodyType);
    List<Car> findByPriceBetween(double minPrice, double maxPrice);
    List<Car> findByFuelTypeAndBodyTypeAndPriceBetween(String fuelType, String bodyType, double minPrice, double maxPrice);

}
