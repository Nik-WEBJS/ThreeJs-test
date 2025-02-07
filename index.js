import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight("white", 2);
dirLight.position.set(3, 3, 3);
dirLight.castShadow = true;
scene.add(dirLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 5, 10);
camera.rotation.x = 6;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Фигуры

const road = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 20),
  new THREE.MeshStandardMaterial({ color: "black" })
);
road.rotation.x = -Math.PI / 2;
scene.add(road);

//Load
const loader = new GLTFLoader();
let car;
loader.load(
  "models/car/scene.gltf",
  (gltf) => {
    car = gltf.scene;
    car.scale.set(50, 50, 50);
    car.position.set(0, 0, 0);
    scene.add(car);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log("Error " + error);
  }
);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


let carVelocity = new THREE.Vector3(0, 0, 0);
let carSpeed = 0.2;
let rotationAngle = 0;
let keys = {};

// Обработчики событий для управления
window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function moveCar() {
  if (!car) return;

  // Вперёд
  if (keys["ArrowUp"]) {
    carVelocity.x = -Math.sin(rotationAngle) * carSpeed;
    carVelocity.z = -Math.cos(rotationAngle) * carSpeed;
  }
  // Назад
  else if (keys["ArrowDown"]) {
    carVelocity.x = Math.sin(rotationAngle) * carSpeed;
    carVelocity.z = Math.cos(rotationAngle) * carSpeed;
  } else {
    carVelocity.set(0, 0, 0);
  }

  // Повороты
  if (keys["ArrowLeft"]) {
    rotationAngle += 0.05;
  }
  if (keys["ArrowRight"]) {
    rotationAngle -= 0.05;
  }

  // Применяем позицию и поворот
  car.position.add(carVelocity);
  car.rotation.y = rotationAngle;
}

//Points
const infoPoints = [
  {
    position: new THREE.Vector3(5, 0, 0),
    message: "Point 1 пройдет чек",
  },
  {
    position: new THREE.Vector3(-5, 0, 0),
    message: "Point 2 пройдет чек",
  },
  {
    position: new THREE.Vector3(0, 0, 5),
    message: "Point 3 пройдет чек",
  },
];

function checkInfoPoints() {
  infoPoints.forEach((point) => {
    const distance = car.position.distanceTo(point.position);
    if (distance < 0.5) {
      showInfo(point.message);
    }
  });
}
function showInfo(message) {
  const infoBox = document.getElementById("info-block");
  infoBox.innerText = message;
  infoBox.style.display = "block";
}

infoPoints.forEach((point) => {
  createInfoSphere(point.position);
});

function createInfoSphere(position) {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: "red" })
  );
  sphere.position.copy(position);
  sphere.position.y = 2;
  scene.add(sphere);
}

function animate() {
  requestAnimationFrame(animate);
  raycaster.setFromCamera(mouse, camera);
  moveCar();
  checkInfoPoints();
  renderer.setClearColor("lightblue");
  renderer.render(scene, camera);
}

animate();
