import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {

  tree(){

    const container = document.querySelector(".container")

    
    // 1. Créer la scène
    const scene = new THREE.Scene();

    // 2. Créer une caméra
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 100);

    // 3. Créer un renderer (rendu)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (container) {
      container.appendChild(renderer.domElement);
    }
    renderer.setClearColor(0x000000, 0); // Set background to transparent


    // 1. Ajouter une lumière
    const light = new THREE.PointLight(0xffffff, 10000); // couleur blanche, intensité ajustée
    light.position.set(10, 0, 120);
    light.castShadow = true; // Permet de générer des ombres
    scene.add(light);

    const loader = new GLTFLoader();
    // Load the first model
    let model; // Declare the model variable outside

    loader.load('/models/scutum.glb', function (glb) {
        model = glb.scene; // Assign the loaded model to the variable
        model.scale.set(15, 15, 15);
        model.position.set(0, -5, 0);
        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });

    // 5. Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // 6. Ajuster la taille quand on redimensionne
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

}
}