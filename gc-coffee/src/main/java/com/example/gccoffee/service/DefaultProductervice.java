package com.example.gccoffee.service;

import com.example.gccoffee.model.Category;
import com.example.gccoffee.model.Product;
import com.example.gccoffee.repository.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class DefaultProductervice implements ProductService{

    private final ProductRepository productRepository;

    public DefaultProductervice(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getProductsByCategory(Category category) {
        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        return null;
    }

    @Override
    public Product createProduct(String productName, Category category, long price) {
        var product=new Product(UUID.randomUUID(), productName,category,price);
        return productRepository.insert(product);
    }

    @Override
    public Product createProduct(String productName, Category category, long price, String description) {
        var product=new Product(UUID.randomUUID(), productName,category,price,description, LocalDateTime.now(), LocalDateTime.now());
        return productRepository.insert(product);
    }
}
