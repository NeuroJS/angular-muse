import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

import * as THREE from 'three';
import 'imports-loader?THREE=three!three/examples/js/loaders/ColladaLoader';

@Component({
  selector: 'app-head-view',
  templateUrl: './head-view.component.html',
  styleUrls: ['./head-view.component.css']
})
export class HeadViewComponent implements OnInit, OnDestroy {
  @Input() xyz: Observable<XYZ>;

  modelLoaded = false;

  private destroy = new Subject<void>();
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private headModel: THREE.Mesh;

  constructor(private element: ElementRef) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20000);
    this.camera.position.set(0, 0, 20);
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);

    const light = new THREE.HemisphereLight(0xffffff, 0);
    light.position.set(10, 10, 30);
    this.scene.add(light);
    const loader = new (THREE as any).ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('./assets/head.dae', (collada) => {
      this.headModel = collada.scene;
      this.headModel.scale.set(10, 10, 10);
      this.scene.add(this.headModel);
      this.modelLoaded = true;
    });

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(300, 300);
  }

  ngOnInit() {
    this.element.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
    this.xyz
      .takeUntil(this.destroy)
      .subscribe(acceleration => {
        if (this.headModel) {
          const gVector = new THREE.Vector3(acceleration.y, -acceleration.x, acceleration.z);
          gVector.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
          const yAxis = new THREE.Vector3(0, 1, 0);
          this.headModel.quaternion.setFromUnitVectors(yAxis, gVector.clone().normalize());
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
