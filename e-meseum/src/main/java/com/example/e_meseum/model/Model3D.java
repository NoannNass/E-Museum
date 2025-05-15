package com.example.e_meseum.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "model3d")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Model3D {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String contentType;

    private Long size;

    // De glb a blob pour MySQL
    @Lob // Large Object
    @Column(length = 16777215) // Medium Blob / 16 MO dans mysql
    private byte[] dataFile;
}
