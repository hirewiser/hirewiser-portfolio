/** biome-ignore-all lint/style/useConsistentTypeDefinitions: For running 3js */
/** biome-ignore-all lint/style/noNamespace: Global JSX namespace needed */
import type { Object3DNode, MaterialNode } from "@react-three/fiber";
import type { MeshLineGeometry, MeshLineMaterial } from "meshline";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}
