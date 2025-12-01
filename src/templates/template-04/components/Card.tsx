"use client";

import {
  AlwaysStencilFunc,
  CatmullRomCurve3,
  FrontSide,
  LinearFilter,
  ReplaceStencilOp,
  SRGBColorSpace,
  Vector3,
} from "three";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  useTexture,
  Environment,
  Lightformer,
  Text,
  RoundedBox,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

interface ExtendedRigidBody extends RapierRigidBody {
  lerped?: Vector3;
}

type CardProps = {
  portfolioData: {
    firstName: string;
    lastName?: string;
    title?: string;
    profileImage?: string;
    headerText?: string;
  };
};

export default function Card({ portfolioData }: CardProps) {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 1, 18], fov: 22 }}
        className="w-full h-full bg-transparent mb-72"
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, 5]} intensity={0.2} />
        <Physics interpolate gravity={[0, -30, 0]} timeStep={1 / 120}>
          <Band
            name={`${portfolioData.firstName} ${
              portfolioData.lastName || ""
            }`.trim()}
            title={
              portfolioData.headerText || portfolioData.title || "Professional"
            }
            profilePicUrl={
              portfolioData.profileImage ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
            }
          />
        </Physics>
        <Environment background={false} blur={0.75}>
          <Lightformer
            intensity={1}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={2}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
  name: string;
  title: string;
  profilePicUrl: string;
};

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  name = "John Doe",
  title = "Professional",
  profilePicUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<ExtendedRigidBody>(null);
  const j2 = useRef<ExtendedRigidBody>(null);
  const j3 = useRef<ExtendedRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new Vector3(),
    ang = new Vector3(),
    rot = new Vector3(),
    dir = new Vector3();
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  } as const;

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ])
  );
  const [dragged, drag] = useState<Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Use the provided profile picture URL with offset and repeat for proper aspect ratio
  const profileTexture = useTexture(profilePicUrl, (texture) => {
    texture.offset.set(0, 0);
    texture.repeat.set(1, 1);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.colorSpace = SRGBColorSpace;
  });

  const fixedRef = fixed as unknown as React.RefObject<RapierRigidBody>;
  const j1Ref = j1 as unknown as React.RefObject<RapierRigidBody>;
  const j2Ref = j2 as unknown as React.RefObject<RapierRigidBody>;
  const j3Ref = j3 as unknown as React.RefObject<RapierRigidBody>;
  const cardRef = card as unknown as React.RefObject<RapierRigidBody>;

  // Joints - Increased length for larger card
  useRopeJoint(fixedRef, j1Ref, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j1Ref, j2Ref, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j2Ref, j3Ref, [[0, 0, 0], [0, 0, 0], 1.2]);

  // Connect the last joint (j3) directly to the top of the card
  useSphericalJoint(j3Ref, cardRef, [
    [0, 0, 0],
    [0, 1.8, 0], // Adjusted anchor point for larger card
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      const newPos = {
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      };

      for (const ref of [card, j1, j2, j3, fixed]) {
        ref.current?.wakeUp();
      }
      card.current.setNextKinematicTranslation(newPos);
    }

    if (fixed.current && band.current) {
      for (const ref of [j1, j2]) {
        const rigidBody = ref.current as ExtendedRigidBody;
        if (rigidBody) {
          if (!rigidBody.lerped) {
            rigidBody.lerped = new Vector3().copy(
              (rigidBody as any).translation()
            );
          }

          const clampedDistance = Math.max(
            0.1,
            Math.min(
              1,
              rigidBody.lerped.distanceTo((rigidBody as any).translation())
            )
          );

          const lerpSpeed = minSpeed + clampedDistance * (maxSpeed - minSpeed);
          rigidBody.lerped.lerp(
            (rigidBody as any).translation(),
            Math.min(1, delta * lerpSpeed)
          );
        }
      }

      if (j3.current && j2.current && j1.current) {
        const j2Body = j2.current as ExtendedRigidBody;
        const j1Body = j1.current as ExtendedRigidBody;

        curve.points[0].copy(j3.current.translation());
        if (j2Body.lerped) {
          curve.points[1].copy(j2Body.lerped);
        }
        if (j1Body.lerped) {
          curve.points[2].copy(j1Body.lerped);
        }
        curve.points[3].copy(fixed.current.translation());

        band.current.geometry.setPoints(curve.getPoints(32));

        if (card.current) {
          ang.copy(card.current.angvel());
          rot.copy(card.current.rotation());
          card.current.setAngvel(
            { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
            true
          );
        }
      }
    }
  });

  curve.curveType = "chordal";
  const bandColor = "#000000"; // Black strap color

  return (
    <>
      <group position={[0, 4.9, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.4, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.12]} />
        </RigidBody>
        <RigidBody position={[0.8, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.12]} />
        </RigidBody>
        <RigidBody position={[1.2, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.12]} />
        </RigidBody>
        <RigidBody
          position={[1.6, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[1.25, 2.0, 0.02]} />

          <group
            position={[0, 0, 0]}
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
            {/* Card Body - Black - Increased size */}
            <RoundedBox args={[2.5, 4.0, 0.02]} radius={0.1}>
              <meshPhysicalMaterial
                clearcoat={1}
                clearcoatRoughness={0.1}
                roughness={0.2}
                metalness={0.4}
                color="#050505" // Almost black
              />
            </RoundedBox>

            {/* Clip Connector - Black Metal */}
            <group position={[0, 2.0, 0]}>
              <RoundedBox args={[0.5, 0.25, 0.1]} radius={0.02}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  metalness={0.8}
                  roughness={0.4}
                />
              </RoundedBox>
            </group>

            {/* Circular Profile Picture with Border */}
            <group position={[0, 0.7, 0.02]}>
              {/* Profile Image with Border - Single Mesh */}
              <mesh>
                <circleGeometry args={[0.8, 64]} />
                <meshStandardMaterial
                  map={profileTexture}
                  transparent={true}
                  alphaTest={0.1}
                  toneMapped={true}
                  color="#ffffff"
                  side={FrontSide}
                  stencilWrite={true}
                  stencilRef={1}
                  stencilFunc={AlwaysStencilFunc}
                  stencilZPass={ReplaceStencilOp}
                />
              </mesh>
              {/* Thinner Border - Using a ring geometry */}
              <mesh>
                <ringGeometry args={[0.82, 0.83, 64]} />
                <meshBasicMaterial color="#ffffff" side={FrontSide} />
              </mesh>
            </group>

            {/* Text Info - White */}
            <group position={[0, -0.5, 0.02]}>
              <group position={[0, 0, 0]}>
                <Text
                  position={[0, -0.1, 0]} // Adjust Y position for padding
                  fontSize={0.3}
                  color="white"
                  font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                  maxWidth={1.8} // Reduce maxWidth to create padding effect
                  overflowWrap="normal"
                  textAlign="center"
                >
                  {name}
                </Text>
              </group>
              <Text
                position={[0, -0.6, 0]}
                fontSize={0.18}
                color="#cccccc"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                maxWidth={1.6}
                overflowWrap="normal"
                whiteSpace="nowrap"
              >
                {title && title.length > 20
                  ? `${title.substring(0, 20)}...`
                  : title}
              </Text>
            </group>
          </group>
        </RigidBody>
      </group>

      {/* The Lanyard/Band MeshLine */}
      <mesh ref={band} position={[0, 0.2, 0]}>
        <meshLineGeometry />
        <meshLineMaterial
          color={bandColor}
          depthTest={false}
          resolution={[width, height]}
          useMap={false}
          lineWidth={1}
          transparent={false}
        />
      </mesh>
    </>
  );
}
