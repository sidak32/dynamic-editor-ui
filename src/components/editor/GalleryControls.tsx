import React from "react";
import styled from "styled-components";
import { useGallery } from "../../hooks";
import { galleryAlignmentOptions } from "../../data/defaults";

const ControlGroup = styled.div`
  margin-bottom: 24px;
`;

const ControlHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ControlLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RangeContainer = styled.div`
  position: relative;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const RangeValue = styled.div`
  position: absolute;
  right: 0;
  top: -24px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

const AlignmentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

const AlignmentButton = styled.button<{ $isSelected: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${(props) => (props.$isSelected ? "#3b82f6" : "#e5e7eb")};
  background: ${(props) => (props.$isSelected ? "#eff6ff" : "white")};
  color: ${(props) => (props.$isSelected ? "#3b82f6" : "#6b7280")};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: #3b82f6;
  }
`;

const GalleryControls: React.FC = () => {
  const { gallery, updateAlignment, updateSpacing, updateBorderRadius } =
    useGallery();

  return (
    <div>
      <ControlGroup>
        <ControlHeader>Gallery Controls</ControlHeader>
        <ControlLabel>Gallery Alignment</ControlLabel>
        <AlignmentGrid>
          {galleryAlignmentOptions.map((option) => (
            <AlignmentButton
              key={option.value}
              $isSelected={gallery.alignment === option.value}
              onClick={() => updateAlignment(option.value as any)}
            >
              {option.label}
            </AlignmentButton>
          ))}
        </AlignmentGrid>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Image Spacing</ControlLabel>
        <RangeContainer>
          <RangeValue>{gallery.spacing}px</RangeValue>
          <RangeInput
            type="range"
            min="0"
            max="40"
            value={gallery.spacing}
            onChange={(e) => updateSpacing(parseInt(e.target.value))}
          />
        </RangeContainer>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Image Border Radius</ControlLabel>
        <RangeContainer>
          <RangeValue>{gallery.borderRadius}px</RangeValue>
          <RangeInput
            type="range"
            min="0"
            max="20"
            value={gallery.borderRadius}
            onChange={(e) => updateBorderRadius(parseInt(e.target.value))}
          />
        </RangeContainer>
      </ControlGroup>
    </div>
  );
};

export default GalleryControls;
