uniform vec3 color;
varying vec3 world_normal;
varying vec4 world_pos;
uniform vec3 camera_pos;

void main() {

	float diff = max(0.0, -dot(normalize(world_pos.xyz), normalize(world_normal)));
	float amb = 0.30;
	float specular = pow(max(0.0, dot(normalize(camera_pos - world_pos.xyz),  normalize(world_normal))), 80.0);
	if(diff <= 0.00001)
	 	specular = 0.0;

	gl_FragColor = vec4((diff + amb) * color + specular * vec3(0.8), 1.0);

}
