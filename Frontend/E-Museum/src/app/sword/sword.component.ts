import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'app-sword',
  imports: [],
  templateUrl: './sword.component.html',
  styleUrl: './sword.component.css'
})
export class SwordComponent implements OnInit, OnDestroy  {
  @Input() modelPath2: string = '/models/armor.glb';
  @Input() modelScale2: number = 1;
  @Input() modelPosition2: { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };

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
    const canvas = document.getElementById('pillier3') as HTMLCanvasElement;
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

 // ✅ Créer un canvas temporaire avec texte
  const textCanvas = document.createElement('canvas');
  textCanvas.width = 512;
  textCanvas.height = 512;
  const ctx = textCanvas.getContext('2d')!;
    if (!ctx) return;
  const text = 'Un glaive';
  ctx.font = `bold 40px Arial`;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 3);
  ctx.fillText('(cladio en gaulois)', textCanvas.width / 2, textCanvas.height / 2);



  // ✅ Créer texture à partir du canvas
  const texture = new THREE.CanvasTexture(textCanvas);
  texture.needsUpdate = true;

  // ✅ Matériau avec la texture du texte
  const pilierMaterial = new THREE.MeshBasicMaterial({ map: texture });

  const pilierGeometry = new THREE.BoxGeometry(200, 250, 200);
  const pilier = new THREE.Mesh(pilierGeometry, pilierMaterial);
  scenePilier.add(pilier);

  const lightPilier = new THREE.PointLight(0xffffff, 0);
  scenePilier.add(lightPilier);

  const ambientLightPilier = new THREE.AmbientLight(0xffffff, 0.5);
  scenePilier.add(ambientLightPilier);
    // === GESTION DU CLIC ===
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

    const mouse = new THREE.Vector2(mouseX, mouseY);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraPilier);

  const intersects = raycaster.intersectObjects(scenePilier.children, true);
if (intersects.length > 0 && intersects[0].object === pilier) {
  window.open('https://fr.wikipedia.org/wiki/Glaive');
}

  });

  function animatePilier() {
    requestAnimationFrame(animatePilier);
    rendererPilier.render(scenePilier, cameraPilier);
  }
  animatePilier();

  const resizeObserverPilier = new ResizeObserver(() => {
    cameraPilier.aspect = canvas.clientWidth / canvas.clientHeight;
    cameraPilier.updateProjectionMatrix();
    rendererPilier.setSize(canvas.clientWidth, canvas.clientHeight, false);
  });
  resizeObserverPilier.observe(canvas);
}

  private initThreeJS() {
    const canvas = document.getElementById('model3') as HTMLCanvasElement;
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    this.scene.add(ambientLight);

    const loader = new GLTFLoader();
    console.log('Tentative de chargement du modèle:', this.modelPath2);

    loader.load(this.modelPath2,
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

        this.model.scale.set(this.modelScale2, this.modelScale2, this.modelScale2);
        this.model.position.set(
          this.modelPosition2.x,
          this.modelPosition2.y,
          this.modelPosition2.z
        );

        this.scene?.add(this.model);
        console.log('Modèle chargé avec succès:', {
          path: this.modelPath2,
          scale: this.model.scale,
          position: this.model.position
        });
      },
      (progress) => {
        console.log(`Chargement ${this.modelPath2}: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error('Erreur de chargement du modèle:', this.modelPath2, error);
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

