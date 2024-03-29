package com.backend.service1.Entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "medicine")
public class Medicine {

    @javax.persistence.Id
    private String Id;

    private String medId;

    private String name;
    private String manufacturer;
    private double dosage;
    private double price;
    private Date expiryDate;
    private int quantityInStock;
    private String shelfAddress;

}
