// types/model-viewer.d.ts
import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        seamlessPoster?: boolean;
        "auto-rotate"?: boolean;
        "camera-controls"?: boolean;
        "shadow-intensity"?: string;
        ar?: boolean;
        "ar-modes"?: string;
        "environment-image"?: string;
        exposure?: string;
        reveal?: string;
        loading?: string;
      };
    }
  }
}

export {};
