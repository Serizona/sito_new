'use client';

import React from 'react';

interface ModelViewerProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  autoRotate?: boolean;
  autoplay?: boolean;
  cameraControls?: boolean;
  shadowIntensity?: string | number;
  suppressHydrationWarning?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  alt,
  autoRotate,
  autoplay,
  cameraControls,
  shadowIntensity,
  suppressHydrationWarning,
  style,
  ...rest
}) => {
  return React.createElement('model-viewer', {
    src,
    alt,
    'auto-rotate': autoRotate,
    autoplay,
    'camera-controls': cameraControls,
    'shadow-intensity': shadowIntensity,
    'suppress-hydration-warning': suppressHydrationWarning,
    style,
    ...rest,
  });
};

export default ModelViewer;
