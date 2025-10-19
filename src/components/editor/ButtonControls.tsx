import React, { useState } from "react";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { useButton } from "../../hooks";
import {
  shadowOptions,
  alignmentOptions,
  buttonWidthOptions,
} from "../../data/defaults";

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

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const OptionButton = styled.button<{ $isSelected: boolean }>`
  padding: 8px 12px;
  border: 2px solid ${(props) => (props.$isSelected ? "#3b82f6" : "#e5e7eb")};
  background: ${(props) => (props.$isSelected ? "#eff6ff" : "white")};
  color: ${(props) => (props.$isSelected ? "#3b82f6" : "#6b7280")};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: #3b82f6;
  }
`;

const ColorPickerContainer = styled.div`
  position: relative;
`;

const ColorSwatch = styled.div<{ $color: string }>`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.$color};
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

const ColorPickerPopover = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  z-index: 100;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const ColorPickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`;

const ButtonControls: React.FC = () => {
  const {
    button,
    updateBorderRadius,
    updateShadow,
    updateAlignment,
    updateWidth,
    updateBackgroundColor,
    updateTextColor,
  } = useButton();
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [showTextPicker, setShowTextPicker] = useState(false);

  return (
    <div>
      <ControlGroup>
        <ControlLabel>Border Radius</ControlLabel>
        <RangeContainer>
          <RangeValue>{button.borderRadius}px</RangeValue>
          <RangeInput
            type="range"
            min="0"
            max="50"
            value={button.borderRadius}
            onChange={(e) => updateBorderRadius(parseInt(e.target.value))}
          />
        </RangeContainer>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Shadow</ControlLabel>
        <OptionGrid>
          {shadowOptions.map((option) => (
            <OptionButton
              key={option.value}
              $isSelected={button.shadow === option.value}
              onClick={() => updateShadow(option.value as any)}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionGrid>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Alignment</ControlLabel>
        <OptionGrid style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {alignmentOptions.map((option) => (
            <OptionButton
              key={option.value}
              $isSelected={button.alignment === option.value}
              onClick={() => updateAlignment(option.value as any)}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionGrid>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Width</ControlLabel>
        <OptionGrid>
          {buttonWidthOptions.map((option) => (
            <OptionButton
              key={option.value}
              $isSelected={button.width === option.value}
              onClick={() => updateWidth(option.value as any)}
            >
              {option.label}
            </OptionButton>
          ))}
        </OptionGrid>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Background Color</ControlLabel>
        <ColorPickerContainer>
          <ColorSwatch
            $color={button.backgroundColor}
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
          >
            {button.backgroundColor}
          </ColorSwatch>
          {showBackgroundPicker && (
            <>
              <ColorPickerOverlay
                onClick={() => setShowBackgroundPicker(false)}
              />
              <ColorPickerPopover>
                <ChromePicker
                  color={button.backgroundColor}
                  onChange={(color) => updateBackgroundColor(color.hex)}
                  disableAlpha
                />
              </ColorPickerPopover>
            </>
          )}
        </ColorPickerContainer>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Text Color</ControlLabel>
        <ColorPickerContainer>
          <ColorSwatch
            $color={button.textColor}
            onClick={() => setShowTextPicker(!showTextPicker)}
          >
            {button.textColor}
          </ColorSwatch>
          {showTextPicker && (
            <>
              <ColorPickerOverlay onClick={() => setShowTextPicker(false)} />
              <ColorPickerPopover>
                <ChromePicker
                  color={button.textColor}
                  onChange={(color) => updateTextColor(color.hex)}
                  disableAlpha
                />
              </ColorPickerPopover>
            </>
          )}
        </ColorPickerContainer>
      </ControlGroup>
    </div>
  );
};

export default ButtonControls;
