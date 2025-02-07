// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// const originNaterial = new THREE.MeshStandardMaterial({ color: "red" });
// const higlightNaterial = new THREE.MeshStandardMaterial({
//   color: "yellow",
//   emissive: "white",
//   emissiveIntensity: 0.5,
// });

//const geometry = new THREE.BoxGeometry();
// const cube = new THREE.Mesh(geometry, originNaterial);
// cube.position.set(0, 0, 0);
//scene.add(cube);

//GSAP
// gsap.to(cube.position, {
//   y: 2,
//   x: 1,
//   duration: 1,
//   easy: "power1.inOut",
//   repeat: -1,
//   yoyo: true,
// });
//END GSAP

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(),
//   new THREE.MeshStandardMaterial({ color: "green" })
// );
// sphere.position.x = 2;
//scene.add(sphere);

// const pointLight = new THREE.PointLight("white", 10, 100);
// pointLight.position.set(0.5, 1, 1);
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5)
// scene.add(pointLightHelper)

// const spotLight = new THREE.SpotLight("white", 1);
// spotLight.position.set(1, 1, 1);
// scene.add(spotLight)

// let isHovered = false;

// function animate() {
// const intersects = raycaster.intersectObject(cube);

// if (intersects.length > 0 && !isHovered) {
//   cube.material = higlightNaterial;
//   isHovered = true;
//   gsap.to(cube.scale, { x: 1.5, y: 1.5, duration: 1.5, ease: "power1.out" });
// } else if (intersects.length == 0 && isHovered) {
//   cube.material = originNaterial;
//   isHovered = false;
//   gsap.to(cube.scale, { x: 1, y: 1, duration: 1.5, ease: "power1.out" });
// }
// }

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.screenSpacePanning = false;
// controls.minDistance = 2;
// controls.maxDistance = 10;

//Post Process
// const renderPass = new RenderPass(scene, camera);
// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   1.5,
//   0.4,
//   0.85
// );

// const composer = new EffectComposer(renderer);
// composer.addPass(renderPass);
// composer.addPass(bloomPass);

//sShader
// const vertexShader = `
//   varying vec3 vPosition;

//   void main(){
//     vPosition = position;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   varying vec3 vPosition;

//   void main() {
//     gl_FragColor = vec4(abs(vPosition.x), abs(vPosition.y), abs(vPosition.z), 1.0);
//   }
// `;

// const shaderMaterial = new THREE.ShaderMaterial({
//   vertexShader: vertexShader,
//   fragmentShader: fragmentShader,
// });

// const newCube = new THREE.Mesh(new THREE.BoxGeometry(), shaderMaterial);
// newCube.position.y = 5;
// scene.add(newCube);

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// function onMouseMove(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
// }
// window.addEventListener("mousemove", onMouseMove);