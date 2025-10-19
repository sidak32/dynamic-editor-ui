import React, { useState } from "react";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { useLayout, useStroke } from "../../hooks";

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
  color: ${(props) => {
    // Simple contrast calculation
    const hex = props.$color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000" : "#fff";
  }};
  font-size: 12px;
  font-weight: 500;
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

const SectionDivider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 32px 0 24px 0;
`;

const LayoutOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const LayoutOption = styled.button<{ $isSelected: boolean }>`
  padding: 12px 16px;
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

const LayoutControls: React.FC = () => {
  const {
    layout,
    currentLayout,
    switchLayout,
    updateCardCornerRadius,
    updateContainerPadding,
    updateSectionBackgroundColor,
  } = useLayout();
  const { stroke, updateColor, updateWeight } = useStroke();
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [showStrokePicker, setShowStrokePicker] = useState(false);

  return (
    <div>
      <ControlGroup>
        <ControlHeader>Layout Controls</ControlHeader>
        <ControlLabel>Layout Type</ControlLabel>
        <LayoutOptions>
          <LayoutOption
            $isSelected={currentLayout === "layout1"}
            onClick={() => switchLayout("layout1")}
          >
            Layout 1<br />
            <span style={{ fontSize: "10px", opacity: 0.7 }}>Vertical</span>
          </LayoutOption>
          <LayoutOption
            $isSelected={currentLayout === "layout2"}
            onClick={() => switchLayout("layout2")}
          >
            Layout 2<br />
            <span style={{ fontSize: "10px", opacity: 0.7 }}>Tabbed</span>
          </LayoutOption>
        </LayoutOptions>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Card Corner Radius</ControlLabel>
        <RangeContainer>
          <RangeValue>{layout.cardCornerRadius}px</RangeValue>
          <RangeInput
            type="range"
            min="0"
            max="30"
            value={layout.cardCornerRadius}
            onChange={(e) => updateCardCornerRadius(parseInt(e.target.value))}
          />
        </RangeContainer>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Container Padding</ControlLabel>
        <RangeContainer>
          <RangeValue>{layout.containerPadding}px</RangeValue>
          <RangeInput
            type="range"
            min="8"
            max="60"
            value={layout.containerPadding}
            onChange={(e) => updateContainerPadding(parseInt(e.target.value))}
          />
        </RangeContainer>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Section Background Color</ControlLabel>
        <ColorPickerContainer>
          <ColorSwatch
            $color={layout.sectionBackgroundColor}
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
          >
            {layout.sectionBackgroundColor}
          </ColorSwatch>
          {showBackgroundPicker && (
            <>
              <ColorPickerOverlay
                onClick={() => setShowBackgroundPicker(false)}
              />
              <ColorPickerPopover>
                <ChromePicker
                  color={layout.sectionBackgroundColor}
                  onChange={(color) => updateSectionBackgroundColor(color.hex)}
                  disableAlpha
                />
              </ColorPickerPopover>
            </>
          )}
        </ColorPickerContainer>
      </ControlGroup>

      <SectionDivider />

      <ControlGroup>
        <ControlLabel>Stroke Color</ControlLabel>
        <ColorPickerContainer>
          <ColorSwatch
            $color={stroke.color}
            onClick={() => setShowStrokePicker(!showStrokePicker)}
          >
            {stroke.color}
          </ColorSwatch>
          {showStrokePicker && (
            <>
              <ColorPickerOverlay onClick={() => setShowStrokePicker(false)} />
              <ColorPickerPopover>
                <ChromePicker
                  color={stroke.color}
                  onChange={(color) => updateColor(color.hex)}
                  disableAlpha
                />
              </ColorPickerPopover>
            </>
          )}
        </ColorPickerContainer>
      </ControlGroup>

      <ControlGroup>
        <ControlLabel>Stroke Weight</ControlLabel>
        <RangeContainer>
          <RangeValue>{stroke.weight}px</RangeValue>
          <RangeInput
            type="range"
            min="0"
            max="8"
            value={stroke.weight}
            onChange={(e) => updateWeight(parseInt(e.target.value))}
          />
        </RangeContainer>
      </ControlGroup>
    </div>
  );
};

export default LayoutControls;
