package com.example.e_meseum.service;

import com.example.e_meseum.dto.Model3dDTO;
import com.example.e_meseum.model.Model3D;
import com.example.e_meseum.repository.Model3DRepository;
import org.hibernate.annotations.TimeZoneColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class Model3DService {

    @Autowired
    private Model3DRepository model3DRepository;

    // Récupérer tous les modèles

    // Récupérer un modèle par son ID
    public Optional<Model3D> getModeleById(Long id) {
        return model3DRepository.findById(id);
    }



    // Sauvegarder un nouveau modèle
    public Model3D saveModele(String name, String description, String contentType, MultipartFile file) {

        try {
            Model3D model3D = new Model3D();
            model3D.setName(name);
            model3D.setDescription(description);
            model3D.setContentType(contentType);
            model3D.setDataFile(file.getBytes());
            return model3DRepository.save(model3D);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Ajoute le DTO pour alléger le transfert de données
        return null;
    }


//
}
