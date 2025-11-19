type ModelViewerBaseProps = import("react").DetailedHTMLProps<
  import("react").HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type ModelViewerProps = ModelViewerBaseProps & {
  src?: string;
  poster?: string;
  alt?: string;
  preload?: boolean | "auto" | "lazy" | "eager";
  loading?: "auto" | "lazy" | "eager";
  reveal?: "auto" | "interaction" | "manual" | string;
  importance?: "high" | "low" | "auto";
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  "auto-rotate-delay"?: string | number;
  "auto-rotate-speed"?: string;
  autoplay?: boolean;
  "interaction-prompt"?: string;
  "environment-image"?: string;
  exposure?: string | number;
  "shadow-intensity"?: string | number;
  "shadow-softness"?: string | number;
  "camera-target"?: string;
  "camera-orbit"?: string;
  "field-of-view"?: string;
  "min-field-of-view"?: string;
  "max-field-of-view"?: string;
  bounds?: string;
  "tone-mapping"?: string;
  style?: import("react").CSSProperties;
  suppressHydrationWarning?: boolean;
  "disable-default-environment"?: boolean;
  "data-mv-hover"?: string | boolean;
  "data-theta-delta"?: string;
  "data-fov-hover"?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}
