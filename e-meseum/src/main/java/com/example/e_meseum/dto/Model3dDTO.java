package com.example.e_meseum.dto;

import lombok.Data;
import lombok.extern.java.Log;

@Data
public class Model3dDTO {
    private Long id;
    private String nom;
    private String description;
    private String contentType;
    private Long size;

}
