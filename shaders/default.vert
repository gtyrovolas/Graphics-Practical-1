varying vec3 world_normal;
varying vec3 col;
varying vec4 world_pos;
uniform vec3 camera_pos;

void main() {

	world_normal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
	world_pos = modelMatrix * vec4(position, 1.0);

}
