package com.product.restproduct.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "product")
public class Product implements Serializable {
    //private static final long serialVersionUID = -3009157732242241606L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "prod_name")
    @NotBlank
    @Size(min = 3, max = 50)
    private String prod_name;

    @Column(name = "prod_desc")
    @Size(min = 3, max = 255)
    private String prod_desc;

    @Column(name = "prod_price")
    // @NotBlank
    private double prod_price;

    @Column(name = "updated_at")
    // @NotBlank
    private Date updated_at;

    public Long getId() {
        return id;
    }

    public void setId(Long id) { this.id = id; }

    public String getProd_name() {
        return prod_name;
    }

    public void setProd_name(String prod_name) {
        this.prod_name = prod_name;
    }

    public String getProd_desc() {
        return prod_desc;
    }

    public void setProd_desc(String prod_desc) {
        this.prod_desc = prod_desc;
    }

    public double getProd_price() {
        return prod_price;
    }

    public void setProd_price(double prod_price) {
        this.prod_price = prod_price;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }
}
