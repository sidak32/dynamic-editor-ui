import React, { useState } from "react";
import styled from "styled-components";
import { ProductImage } from "../../types";
import { useUIConfiguration } from "../../context/UIConfigurationContext";

const ViewerContainer = styled.div<{
  $borderRadius?: number;
  $strokeColor?: string;
  $strokeWeight?: number;
}>`
  position: relative;
  background: white;
  border-radius: ${(props) => props.$borderRadius || 12}px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: ${(props) => props.$strokeWeight || 0}px solid
    ${(props) => props.$strokeColor || "transparent"};
`;

const MainImageContainer = styled.div<{
  $borderRadius?: number;
}>`
  position: relative;
  aspect-ratio: 16/12;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.$borderRadius || 12}px;
  overflow: hidden;
`;

const MainImage = styled.img<{
  $borderRadius?: number;
}>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${(props) => props.$borderRadius || 8}px;
`;

const ThumbnailStrip = styled.div<{
  $spacing?: number;
  $alignment?: string;
}>`
  display: flex;
  gap: ${(props) => props.$spacing || 8}px;
  padding: 16px;
  background: #f8fafc;
  overflow-x: auto;
  justify-content: ${(props) => {
    switch (props.$alignment) {
      case "grid-left":
        return "flex-start";
      case "grid-right":
        return "flex-end";
      case "grid-center":
      default:
        return "center";
    }
  }};

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #e2e8f0;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
`;

const Thumbnail = styled.img<{
  $isActive: boolean;
  $borderRadius?: number;
}>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${(props) => props.$borderRadius || 8}px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${(props) => (props.$isActive ? "#3b82f6" : "transparent")};

  &:hover {
    transform: scale(1.05);
  }
`;

interface ProductImageViewerProps {
  images: ProductImage[];
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({ images }) => {
  const { configuration } = useUIConfiguration();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] || images[0];

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <ViewerContainer
      $borderRadius={configuration.gallery.borderRadius}
      $strokeColor={configuration.stroke.color}
      $strokeWeight={configuration.stroke.weight}
    >
      <MainImageContainer $borderRadius={configuration.gallery.borderRadius}>
        {activeImage && (
          <MainImage
            src={activeImage.url}
            alt={activeImage.alt}
            $borderRadius={configuration.gallery.borderRadius}
          />
        )}
      </MainImageContainer>

      {images.length > 1 && (
        <ThumbnailStrip
          $spacing={configuration.gallery.spacing}
          $alignment={configuration.gallery.alignment}
        >
          {images.map((image, index) => (
            <Thumbnail
              key={image.id}
              src={image.url}
              alt={image.alt}
              $isActive={index === activeImageIndex}
              $borderRadius={configuration.gallery.borderRadius}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </ThumbnailStrip>
      )}
    </ViewerContainer>
  );
};

export default ProductImageViewer;
