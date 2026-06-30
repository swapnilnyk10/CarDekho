package com.CarDekho.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String make;
    private String model;
    private String variant;
    private String fuelType;
    private String bodyType;
    private double price;
    private double mileage;
    private double safetyRating;
    private String imageUrl;

    public Car(){}

    public Car(Long id, String make, String model, String variant, String fuelType, String bodyType, double price,
            double mileage, double safetyRating, String imageUrl) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.variant = variant;
        this.fuelType = fuelType;
        this.bodyType = bodyType;
        this.price = price;
        this.mileage = mileage;
        this.safetyRating = safetyRating;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getBodyType() {
        return bodyType;
    }

    public void setBodyType(String bodyType) {
        this.bodyType = bodyType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getMileage() {
        return mileage;
    }

    public void setMileage(double mileage) {
        this.mileage = mileage;
    }

    public double getSafetyRating() {
        return safetyRating;
    }

    public void setSafetyRating(double safetyRating) {
        this.safetyRating = safetyRating;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    
}
