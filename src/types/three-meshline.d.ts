import "react";
import type * as THREE from "three";

// Extend the ThreeElements interface to include meshLineGeometry and meshLineMaterial
declare module "@react-three/fiber" {
  type ThreeElements = {
    meshLineGeometry: {
      attach?: string;
      points?: THREE.Vector3[] | Float32Array;
    };
    meshLineMaterial: {
      attach?: string;
      lineWidth?: number;
      color?: THREE.Color | string | number;
      transparent?: boolean;
      depthTest?: boolean;
      resolution?: [number, number];
      useMap?: boolean;
    };
  };
}
