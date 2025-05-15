package com.example.e_meseum.repository;

import com.example.e_meseum.model.Model3D;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Model3DRepository extends JpaRepository<Model3D, Long> {

    List<Model3D> findAllByOrderByIdDesc();


}
