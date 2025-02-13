uniform vec2 uFraquency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

  
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFraquency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFraquency.y - uTime) * 0.1;
    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv=uv;
    vElevation = elevation;
}