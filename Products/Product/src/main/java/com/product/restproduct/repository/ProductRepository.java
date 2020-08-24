package com.product.restproduct.repository;

import com.product.restproduct.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface  ProductRepository extends JpaRepository<Product, Long> {
    //List<Product> findByIdProduct(Long id);
    @Query("select p from Product p where p.updated_at between  ?1 and ?2")
    List<Product> findByDateInterval(Date fromD, Date toD);

    // List<Product> findAllByUpdatedAtBetween(Date fromD, Date toD);
}
