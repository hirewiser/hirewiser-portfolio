/* eslint-disable react/no-unknown-property */
"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import React from "react";

import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
  Text,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Vector3 } from "three";
import type { GetUserPortfolioV3Response } from "@/types/portfolio.types";

// Extend Three.js with meshline components
extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("https://dakshie.xyz/Dakshie.glb");
useTexture.preload("https://dakshie.xyz/band.png");

// Add proper type declarations for the extended components
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.ComponentProps<"mesh">;
      meshLineMaterial: React.ComponentProps<"meshBasicMaterial"> & {
        color?: string;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: THREE.Texture;
        repeat?: [number, number];
        lineWidth?: number;
        transparent?: boolean;
      };
    }
  }
}

// Define types for mesh line ref
interface MeshLineRef {
  geometry: {
    setPoints: (points: THREE.Vector3[]) => void;
  };
}

// Define types for GLTF models
interface CustomGLTFResult {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
    [key: string]: THREE.Object3D;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
    [key: string]: THREE.Material;
  };
  scene: THREE.Group;
}

// Extend Rigid body to include additional properties
interface ExtendedRigidBody extends RapierRigidBody {
  lerped?: THREE.Vector3;
}

interface CardProps {
  portfolioData: GetUserPortfolioV3Response;
}

export default function Card({ portfolioData }: CardProps) {
  return (
    <div className="w-full h-[646px] relative overflow-visible -mt-10 bg-transparent">
      {/* User Image on Top - HTML Overlay */}

      <Canvas
        camera={{ position: [0, -2, 18], fov: 22 }}
        className="pointer-events-auto w-full h-full overflow-visible bg-transparent"
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          preserveDrawingBuffer: true
        }}
        dpr={[1, 2]} // Higher DPI for better quality
      >
        <SetClearColor /> 
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -30, 0]} timeStep={1 / 120}>
          <Band position={[0, -2, 0]} />
        </Physics>
        <Environment background={false}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  position?: [number, number, number];
  username?: string;
}

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  position = [0, 0, 0],
  username = "User"
}: BandProps) {
  const band = useRef<MeshLineRef>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<ExtendedRigidBody>(null);
  const j2 = useRef<ExtendedRigidBody>(null);
  const j3 = useRef<ExtendedRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 3,
    linearDamping: 3,
  } as const;

  const gltf = useGLTF("https://dakshie.xyz/Dakshie.glb");
  const { nodes, materials } = gltf as unknown as CustomGLTFResult;

  const texture = useTexture("https://dakshie.xyz/band.png");
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  const fixedRef = fixed as unknown as React.RefObject<RapierRigidBody>;
  const j1Ref = j1 as unknown as React.RefObject<RapierRigidBody>;
  const j2Ref = j2 as unknown as React.RefObject<RapierRigidBody>;
  const j3Ref = j3 as unknown as React.RefObject<RapierRigidBody>;
  const cardRef = card as unknown as React.RefObject<RapierRigidBody>;

  // Increase the distance between joints (3rd parameter is the length of the rope)
  useRopeJoint(fixedRef, j1Ref, [[0, 0, 0], [0, 0, 0], 1.5]);
  useRopeJoint(j1Ref, j2Ref, [[0, 0, 0], [0, 0, 0], 1.5]);
  useRopeJoint(j2Ref, j3Ref, [[0, 0, 0], [0, 0, 0], 1.5]);
  useSphericalJoint(j3Ref, cardRef, [
    [0, 0, 0],
    [0, 3.6, 0], // Lowered the Y position from 2.35 to 1.5
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  const lastUpdateTime = useRef(0);

  useFrame((state, delta) => {
    const currentTime = state.clock.getElapsedTime();

    if (dragged && card.current) {
      // Get pointer position in world space
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      // Calculate new position with drag offset
      const newPos = {
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      };

      // No boundaries - free movement

      if (currentTime - lastUpdateTime.current > 0.016) {
        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
        lastUpdateTime.current = currentTime;
      }

      // Update card position with boundaries applied
      card.current.setNextKinematicTranslation(newPos);
    }

    if (fixed.current && band.current) {
      [j1, j2].forEach((ref) => {
        const rigidBody = ref.current as ExtendedRigidBody;
        if (rigidBody) {
          if (!rigidBody.lerped) {
            rigidBody.lerped = new THREE.Vector3().copy(
              rigidBody.translation()
            );
          }

          const clampedDistance = Math.max(
            0.1,
            Math.min(1, rigidBody.lerped.distanceTo(rigidBody.translation()))
          );

          const lerpSpeed = minSpeed + clampedDistance * (maxSpeed - minSpeed);
          rigidBody.lerped.lerp(
            rigidBody.translation(),
            Math.min(1, delta * lerpSpeed)
          );
        }
      });

      if (j3.current && j2.current && j1.current) {
        const j2Body = j2.current as ExtendedRigidBody;
        const j1Body = j1.current as ExtendedRigidBody;

        curve.points[0].copy(j3.current.translation());
        if (j2Body.lerped) curve.points[1].copy(j2Body.lerped);
        if (j1Body.lerped) curve.points[2].copy(j1Body.lerped);
        curve.points[3].copy(fixed.current.translation());

        band.current.geometry.setPoints(curve.getPoints(64));

        if (card.current) {
          ang.copy(card.current.angvel());
          rot.copy(card.current.rotation());
          card.current.setAngvel(
            { x: ang.x, y: ang.y - rot.y * 0.2, z: ang.z },
            true
          );
        }
      }
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[position[0], position[1] + 8.3, position[2]]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[1, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[3, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.1, 1.5, 0.01]} />
          <group
            scale={4}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const target = e.target as HTMLElement;
              target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement;
              target.setPointerCapture(e.pointerId);
              if (card.current) {
                drag(
                  new Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation()))
                );
              }
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
                transparent={true}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
     
      {React.createElement("mesh", { ref: band }, [
        React.createElement("meshLineGeometry", { key: "geometry" }, null),
        React.createElement(
          "meshLineMaterial",
          {
            key: "material",
            color: "white",
            depthTest: false,
            resolution: [width, height],
            useMap: true,
            map: texture,
            repeat: [-3, 1],
            lineWidth: 1,
            transparent: true,
          },
          null
        ),
      ])}
    </>
  );
}

function SetClearColor() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0); // transparent background
  }, [gl]);
  return null;
}
