import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, Text3D, Center, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

// Improved Model Component
function Model({ path, scale = 1, rotation = [0, 0, 0], materialColor = '#ffffff' }) {
    const { scene } = useGLTF(path);
    const ref = useRef<THREE.Object3D>(null);
    const texture = useTexture('/textures/metal_plate_texture.jpg'); // Example texture
    const [modelLoaded, setModelLoaded] = useState(false);

    useEffect(() => {
        if (scene) {
            scene.traverse((child: THREE.Object3D) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Use a more flexible material
                    child.material = new THREE.MeshStandardMaterial({
                        color: materialColor,
                        map: texture, // Apply texture
                        metalness: 0.8,
                        roughness: 0.2,
                        normalMap: useTexture('/textures/metal_plate_normal.jpg'), // Example normal map
                        normalScale: [0.8, 0.8],
                        envMapIntensity: 1,
                    });
                }
            });
            setModelLoaded(true);
        }
    }, [scene, materialColor, texture]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        modelLoaded && (  // Only render if the model is loaded
            <primitive
                ref={ref}
                object={scene}
                scale={scale}
                rotation={rotation}
                position={[0, 0, 0]}
                castShadow
                receiveShadow
            />
        )
    );
}

// Improved Floating Text
function FloatingText({ text, position, color, font = '/fonts/inter_bold.json' }) { // Added font prop
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const textColor = hovered ? '#ffffff' : color;

    return (
        <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setActive(!active)}
        >
            <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={2}
                position={position}
            >
                <Text3D
                    font={font}
                    size={0.5}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelSize={0.02}
                    bevelThickness={0.02}
                >
                    {text}
                    <meshStandardMaterial
                        color={textColor}
                        metalness={0.8}
                        roughness={0.2}
                        emissive={active ? color : '#000000'}
                        emissiveIntensity={active ? 0.5 : 0}
                        toneMapped={false}
                    />
                </Text3D>
            </Float>
        </group>
    );
}

// Improved Animated Spheres
function AnimatedSpheres() {
    const noise = useMemo(() => createNoise3D(), []);
    const spheres = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({ // Increased sphere count
            position: [
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
            ],
            scale: Math.random() * 0.3 + 0.1, // Smaller spheres
            color: new THREE.Color(
                `hsl(${Math.random() * 360}, 100%, 65%)`
            ), // More vibrant colors
            speed: Math.random() * 0.02 + 0.01, // Varying speeds
            offset: Math.random() * 1000, // Phase offset for noise
        }));
    }, []);

    const { viewport } = useThree();

    useFrame((state) => {
        spheres.forEach((sphere, i) => {
            const t = state.clock.elapsedTime;
            const noiseValue = noise(
                sphere.position[0] + t * 0.1,
                sphere.position[1] + t * 0.1,
                sphere.position[2] + t * 0.1 + sphere.offset
            );

            const sway = noiseValue * 2;
            const float = Math.sin(t * sphere.speed + sphere.offset) * 0.5;

            sphere.position[0] += sway * 0.05;
            sphere.position[1] += float;
        });
    });

    return (
        <group>
            {spheres.map((sphere, i) => (
                <mesh
                    key={i}
                    position={sphere.position}
                    scale={sphere.scale}
                    castShadow
                    receiveShadow
                >
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial
                        color={sphere.color}
                        metalness={0.7}
                        roughness={0.3}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Improved Scene Component
export function Scene({ modelPath, scale, rotation }) {
    const [fogColor] = useState('#ffe082'); // Light orange fog
    const [useCustomFog] = useState(true);

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ height: '400px', background: '#f5f5f5' }} // Light background
            shadows
        >
            {useCustomFog && (
                <fog attach="fog" args={[fogColor, 10, 20]} />
            )}
            <ambientLight intensity={0.3} /> {/* Reduced ambient */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={1.2} // Increased directional
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-far={50}
            />
            <directionalLight
                position={[-5, 5, 5]}
                intensity={0.8}
            />
            <Center>
                <Model path={modelPath} scale={scale} rotation={rotation} materialColor="#6a1b9a" />  {/* Darker Purple Model */}
            </Center>

            <AnimatedSpheres />
            <Environment preset="sunset" />
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                autoRotate
                autoRotateSpeed={0.7}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
}

// Improved HeroScene
export function HeroScene() {
    const [fogColor] = useState('#ffe082');  // Light orange fog
    const [useCustomFog] = useState(true);

    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }} // Increased camera distance
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#f5f5f5' }} // Light background
            shadows
        >
            {useCustomFog && (
                <fog attach="fog" args={[fogColor, 15, 30]} /> // Adjusted fog distance
            )}
            <ambientLight intensity={0.2} /> {/* Reduced ambient */}
            <directionalLight
                position={[8, 8, 10]}
                intensity={1.5}  // Increased directional
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-far={50}
            />
             <directionalLight
                position={[-8, 8, 10]}
                intensity={1}
            />

            <Center>
                <FloatingText
                    text="EDIZO"
                    position={[0, 1.5, 0]} // Raised text
                    color="#D32F2F"
                    font="/fonts/righteous_regular.json" // Added new font
                />
            </Center>

            <AnimatedSpheres />
            <Sparkles
                count={300}  // Increased sparkles
                scale={30}     // Increased scale
                size={3}
                speed={0.5}
                opacity={0.7} // Increased opacity
                color="#ff8a65" // A lighter shade
            />

            <Environment preset="sunset" />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3} // Slower rotation
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
}
