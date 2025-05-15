import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-viking',
  imports: [],
  templateUrl: './viking.component.html',
  styleUrl: './viking.component.css'
})
export class VikingComponent implements OnInit, OnDestroy  {
  @Input() modelPath5: string = '/models/armor.glb';
  @Input() modelScale5: number = 1;
  @Input() modelPosition5: { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };

  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private model: THREE.Group | null = null;
  private animationFrameId: number | null = null;

  ngOnInit() {
    this.initThreeJS();
    this.initPilier();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Nettoyer les ressources WebGL
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
  }

  private initPilier() {
    const canvas = document.getElementById('pillier5') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas pilier not found');
      return;
    }

    // Créer la scène du pilier
    const scenePilier = new THREE.Scene();

    // Créer la caméra
    const cameraPilier = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    cameraPilier.position.set(0, 0, 300);
    cameraPilier.lookAt(0, 0, 0);

    // Créer le renderer
    const rendererPilier = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      antialias: true,
      alpha: true 
    });
    rendererPilier.setSize(canvas.clientWidth, canvas.clientHeight);
    rendererPilier.setClearColor(0x000000, 0);

    // Créer le pilier
    const pilierGeometry = new THREE.BoxGeometry(200, 250, 200);
    const pilierMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x808080,
      shininess: 30
    });
    const pilier = new THREE.Mesh(pilierGeometry, pilierMaterial);
    scenePilier.add(pilier);

    // Ajouter les lumières
    const lightPilier = new THREE.PointLight(0xffffff, 0);
    lightPilier.position.set(0, 0, 0);
    scenePilier.add(lightPilier);

    const ambientLightPilier = new THREE.AmbientLight(0xffffff, 0.5);
    scenePilier.add(ambientLightPilier);

    // Animation du pilier
    function animatePilier() {
      requestAnimationFrame(animatePilier);
      rendererPilier.render(scenePilier, cameraPilier);
    }
    animatePilier();

    // Gestion du redimensionnement
    const resizeObserverPilier = new ResizeObserver(() => {
      cameraPilier.aspect = canvas.clientWidth / canvas.clientHeight;
      cameraPilier.updateProjectionMatrix();
      rendererPilier.setSize(canvas.clientWidth, canvas.clientHeight, false);
    });
    resizeObserverPilier.observe(canvas);
  }

  private initThreeJS() {
    const canvas = document.getElementById('model5') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
    this.camera.position.set(0, -1, 180);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    const light = new THREE.PointLight(0xffffff, 100);
    light.position.set(10, 0, 120);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const loader = new GLTFLoader();
    console.log('Tentative de chargement du modèle:', this.modelPath5);

    loader.load(this.modelPath5, 
      (gltf) => {
        if (this.model) {
          this.scene?.remove(this.model);
        }
        
        this.model = gltf.scene;
        
        // Optimiser les matériaux
        this.model.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.frustumCulled = true;
            if (node.material) {
              node.material.needsUpdate = true;
            }
          }
        });

        this.model.scale.set(this.modelScale5, this.modelScale5, this.modelScale5);
        this.model.position.set(
          this.modelPosition5.x,
          this.modelPosition5.y,
          this.modelPosition5.z
        );

        this.scene?.add(this.model);
        console.log('Modèle chargé avec succès:', {
          path: this.modelPath5,
          scale: this.model.scale,
          position: this.model.position
        });
      },
      (progress) => {
        console.log(`Chargement ${this.modelPath5}: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error('Erreur de chargement du modèle:', this.modelPath5, error);
      }
    );

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      
      if (this.model) {
        this.model.rotation.y += 0.01;
      }
      
      controls.update();
      
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    
    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (this.camera && this.renderer) {
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      }
    });
    
    resizeObserver.observe(canvas);
  }
}