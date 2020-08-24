package com.product.restproduct.controller;

import com.product.restproduct.exception.ResourceNotFoundException;
import com.product.restproduct.model.Product;
import com.product.restproduct.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    public Product  getProductById(@PathVariable  Long id) {
        Optional<Product> product1 = productRepository.findById(id);
        return product1.orElseThrow(() -> new ResourceNotFoundException("Product not found. Id = " + id));
    }

    @GetMapping("/products/interval")
    // get with query Date parameters e.g. /products/interval?fromD="dd.MM.yyyy"&toD="dd.MM.yyyy"
    // @ApiOperation(value = "Get the Products by fromD and toD")
    public List<Product>  getProductByInterval(@RequestParam("fromD") String fromD,
                                               @RequestParam("toD") String toD) {
        Date dfrom = new Date();
        Date dto = new Date();

        System.out.println("from D= " + fromD + " toD = " + toD);
        SimpleDateFormat formatter1 = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);
        SimpleDateFormat formatter2 = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);
        try {
            dfrom = formatter1.parse(fromD);
            dto = formatter2.parse(toD);
        } catch (Exception e) {
            System.out.println("Exception = " + e.getMessage() + " from = " + dfrom + " to = " + dto);
        };
        System.out.println("from = " + dfrom + " to = " + dto);
        List<Product> products = productRepository.findByDateInterval(dfrom, dto);
        if (products.size() > 0){
            return products;
        }
        throw new ResourceNotFoundException("Products not found. from = " + fromD + " to = " + toD);
    }

    @PostMapping("/products")
    public Product createProduct(@Valid @RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/products/{productId}")
    public Product updateProduct(@PathVariable Long productId,
                                   @Valid @RequestBody Product productRequest) throws ParseException {
        // DateFormat df = new SimpleDateFormat("yyyy-MM-dd ");
        Date updated_at =productRequest.getUpdated_at();
        // Date updated_at = df.parse(productRequest.getUpdated_at().toString());
        //System.out.println("product_save getProd_name = " + productRequest.getProd_name());
        //System.out.println("product_save getUpdated_at() = " + updated_at);
        //System.out.println("product_save price = " + productRequest.getProd_price());
        Double price = productRequest.getProd_price();
        // Double price = Double.parseDouble((new Formatter()).format("%.2f",productRequest.getProd_price()).toString());
        return productRepository.findById(productId)
                .map(product -> {
                    product.setProd_name(productRequest.getProd_name());
                    product.setProd_desc(productRequest.getProd_desc());
                    product.setProd_price(price);
                    product.setUpdated_at(updated_at);
                    //System.out.println("product_saved = " + product.getProd_name());
                    return productRepository.save(product);
                }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));
    }


    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        return productRepository.findById(productId)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));
    }


}
