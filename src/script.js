import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 )
const geometry2 = new THREE.BoxGeometry( 1, 2, 1 )
const geometry3 = new THREE.OctahedronGeometry( 1, 3 )
const geometry32 = new THREE.OctahedronGeometry( .3, 3 )
const geometry4 = new THREE.TorusKnotGeometry( .3, .1, 100, 16 )

// Materials

const material = new THREE.LineBasicMaterial()
material.wireframe = true

const material2 = new THREE.MeshBasicMaterial()
material2.wireframe = true
material2.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
//scene.add(sphere)

const cube = new THREE.Mesh(geometry2, material)
//scene.add(cube)

const octa = new THREE.Mesh(geometry3, material)
scene.add(octa)

const knot = new THREE.Mesh(geometry32, material2)
scene.add(knot)

// Model Loader

let heart = new THREE.Mesh(geometry2, material2);

const loader = new GLTFLoader();

loader.load( '../heart_ts01.gltf', function ( gltf ) {

    console.log(gltf)
    //gltf.scene.material.wireframe = true;
	scene.add(gltf.scene);

    heart = gltf.scene;

}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, function ( error ) {

	console.error( error );

} );


// Lights

const pointLight = new THREE.PointLight(0xffffff, .6)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x0000FF, .2)
pointLight2.position.x = 3
pointLight2.position.y = 4
pointLight2.position.z = 5
scene.add(pointLight2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 10 * elapsedTime

    octa.rotation.y = 2 * elapsedTime
    octa.rotation.x = 1 * elapsedTime

    knot.rotation.y = 1 * elapsedTime
    //knot.rotation.x = 2 * elapsedTime

    cube.rotation.y = .5 * elapsedTime
    cube.rotation.x = 1 * elapsedTime
    cube.position.x = Math.sin(elapsedTime)
    cube.position.y = Math.cos(elapsedTime)

    heart.rotation.y = 1 * elapsedTime
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()