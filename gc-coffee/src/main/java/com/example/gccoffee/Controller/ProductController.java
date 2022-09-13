package com.example.gccoffee.Controller;

import com.example.gccoffee.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

//REST API Controller가 아님.
@Controller
public class ProductController {

    private final ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public String productPage(Model model){
        var products= productService.getAllProducts();
        model.addAttribute("products",products);
        return "product-list";
    }
}
