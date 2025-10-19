import React from "react";
import styled from "styled-components";
import { useTypography } from "../../hooks";
import { fontFamilyOptions, fontWeightOptions } from "../../data/defaults";

const ControlGroup = styled.div`
  margin-bottom: 24px;
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

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
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

const NumberInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const WeightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const WeightButton = styled.button<{ $isSelected: boolean; $weight: number }>`
  padding: 8px 12px;
  border: 2px solid ${(props) => (props.$isSelected ? "#3b82f6" : "#e5e7eb")};
  background: ${(props) => (props.$isSelected ? "#eff6ff" : "white")};
  color: ${(props) => (props.$isSelected ? "#3b82f6" : "#6b7280")};
  border-radius: 6px;
  font-size: 12px;
  font-weight: ${(props) => props.$weight};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

const TypographyControls: React.FC = () => {
  const { typography, updateFontFamily, updateFontWeight, updateFontSize } =
    useTypography();

  return (
    <div>
      <ControlGroup>
        <ControlLabel>Font Family</ControlLabel>
        <Select
          value={typography.fontFamily}
          onChange={(e) => updateFontFamily(e.target.value as any)}
        >
          {fontFamilyOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </Select>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Font Weight</ControlLabel>
        <WeightGrid>
          {fontWeightOptions.map((weight) => (
            <WeightButton
              key={weight}
              $isSelected={typography.fontWeight === weight}
              $weight={weight}
              onClick={() => updateFontWeight(weight)}
            >
              {weight}
            </WeightButton>
          ))}
        </WeightGrid>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Font Size</ControlLabel>
        <RangeContainer>
          <RangeValue>{typography.fontSize}px</RangeValue>
          <RangeInput
            type="range"
            min="10"
            max="60"
            value={typography.fontSize}
            onChange={(e) => updateFontSize(parseInt(e.target.value))}
          />
        </RangeContainer>
        <NumberInput
          type="number"
          min="10"
          max="60"
          value={typography.fontSize}
          onChange={(e) => updateFontSize(parseInt(e.target.value))}
          style={{ marginTop: "8px" }}
        />
      </ControlGroup>
    </div>
  );
};

export default TypographyControls;
