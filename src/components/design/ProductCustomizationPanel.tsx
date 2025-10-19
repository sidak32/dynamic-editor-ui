import React, { useState } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { CustomizationOptions } from "../../types";
import { useUIConfiguration } from "../../context/UIConfigurationContext";

const CustomizationContainer = styled.div<{
  $borderRadius?: number;
  $padding?: number;
  $strokeColor?: string;
  $strokeWeight?: number;
}>`
  background: white;
  border-radius: ${(props) => props.$borderRadius || 12}px;
  padding: ${(props) => props.$padding || 24}px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: ${(props) => props.$strokeWeight || 0}px solid
    ${(props) => props.$strokeColor || "transparent"};
`;

const Title = styled.h2<{
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  font-size: ${(props) => props.$fontSize || 24}px;
  font-weight: ${(props) => props.$fontWeight || 600};
  font-family: ${(props) => props.$fontFamily || "inherit"};
  color: #1e293b;
  margin-bottom: 24px;
`;

const CustomizeLabel = styled.div<{
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  font-size: ${(props) => (props.$fontSize || 16) - 2}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => props.$fontWeight || 400};
  color: #64748b;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionGroup = styled.div`
  margin-bottom: 24px;
`;

// Layout 2 - Tabbed Layout Components
const TabContainer = styled.div`
  margin-bottom: 24px;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const TabButton = styled.button<{
  $isActive: boolean;
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  padding: 8px 16px;
  border: none;
  background: ${(props) => (props.$isActive ? "#eff6ff" : "transparent")};
  color: ${(props) => (props.$isActive ? "#3b82f6" : "#6b7280")};
  font-size: ${(props) => (props.$fontSize || 16) - 2}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => Math.min((props.$fontWeight || 400) + 100, 700)};
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? "#3b82f6" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px 4px 0 0;

  &:hover {
    background: ${(props) => (props.$isActive ? "#eff6ff" : "#f8fafc")};
    color: ${(props) => (props.$isActive ? "#3b82f6" : "#374151")};
  }
`;

const TabContent = styled.div`
  min-height: 120px;
`;

const OptionLabel = styled.label<{
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  display: block;
  font-size: ${(props) => (props.$fontSize || 16) - 2}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => Math.min((props.$fontWeight || 400) + 100, 700)};
  color: #374151;
  margin-bottom: 8px;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Dropdown = styled.select<{
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: ${(props) => (props.$fontSize || 16) - 2}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => props.$fontWeight || 400};
  background: white;
  cursor: pointer;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const DropdownIcon = styled(ChevronDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #9ca3af;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;

const ColorSwatch = styled.button<{ $color: string; $isSelected: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: 3px solid ${(props) => (props.$isSelected ? "#3b82f6" : "#e5e7eb")};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
    border-color: ${(props) => (props.$isSelected ? "#3b82f6" : "#9ca3af")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const PriceContainer = styled.div`
  margin: 32px 0 24px 0;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

const PriceLabel = styled.div<{
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  font-size: ${(props) => (props.$fontSize || 16) - 2}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => props.$fontWeight || 400};
  color: #64748b;
  margin-bottom: 4px;
`;

const Price = styled.div<{
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  font-size: ${(props) => (props.$fontSize || 16) + 12}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => Math.min((props.$fontWeight || 400) + 300, 700)};
  color: #1e293b;
`;

const ButtonContainer = styled.div<{ $alignment?: string }>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => {
    switch (props.$alignment) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
      default:
        return "center";
    }
  }};
`;

const AddToCartButton = styled.button<{
  $backgroundColor?: string;
  $textColor?: string;
  $borderRadius?: number;
  $shadow?: string;
  $width?: string;
  $fontFamily?: string;
  $fontWeight?: number;
  $fontSize?: number;
}>`
  ${(props) => {
    switch (props.$width) {
      case "auto":
        return "width: auto; min-width: 160px;";
      case "medium":
        return "width: 200px;";
      case "large":
        return "width: 280px;";
      case "full":
        return "width: 100%;";
      default:
        return "width: auto; min-width: 160px;";
    }
  }}
  padding: 14px 24px;
  background-color: ${(props) => props.$backgroundColor || "#dc2626"};
  color: ${(props) => props.$textColor || "white"};
  border: none;
  border-radius: ${(props) => props.$borderRadius || 8}px;
  font-size: ${(props) => props.$fontSize || 16}px;
  font-family: ${(props) => props.$fontFamily || "inherit"};
  font-weight: ${(props) => Math.min((props.$fontWeight || 400) + 200, 700)};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => {
    switch (props.$shadow) {
      case "small":
        return "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
      case "medium":
        return "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
      case "large":
        return "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      case "none":
      default:
        return "none";
    }
  }};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface ProductCustomizationPanelProps {
  title: string;
  price: number;
  currency: string;
  customization: CustomizationOptions;
  onCustomizationChange?: (option: string, value: string) => void;
}

const ProductCustomizationPanel: React.FC<ProductCustomizationPanelProps> = ({
  title,
  price,
  currency,
  customization,
  onCustomizationChange,
}) => {
  const { configuration } = useUIConfiguration();
  const [activeTab, setActiveTab] = useState<"fabric" | "leather">("fabric");

  const handleDropdownChange = (option: string, value: string) => {
    onCustomizationChange?.(option, value);
  };

  const handleColorChange = (option: string, value: string) => {
    onCustomizationChange?.(option, value);
  };

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  // Layout 1: Vertical layout - show all options
  const renderVerticalLayout = () => (
    <>
      <OptionGroup>
        <OptionLabel
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
        >
          {customization.fabric.label}
        </OptionLabel>
        <ColorGrid>
          {customization.fabric.colors.map((color) => (
            <ColorSwatch
              key={color.value}
              $color={color.color}
              $isSelected={customization.fabric.selected === color.value}
              onClick={() => handleColorChange("fabric", color.value)}
              title={color.name}
            />
          ))}
        </ColorGrid>
      </OptionGroup>

      <OptionGroup>
        <OptionLabel
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
        >
          {customization.leather.label}
        </OptionLabel>
        <ColorGrid>
          {customization.leather.colors.map((color) => (
            <ColorSwatch
              key={color.value}
              $color={color.color}
              $isSelected={customization.leather.selected === color.value}
              onClick={() => handleColorChange("leather", color.value)}
              title={color.name}
            />
          ))}
        </ColorGrid>
      </OptionGroup>
    </>
  );

  // Layout 2: Tabbed layout - show tabs for fabric and leather
  const renderTabbedLayout = () => (
    <TabContainer>
      <TabButtons>
        <TabButton
          $isActive={activeTab === "fabric"}
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
          onClick={() => setActiveTab("fabric")}
        >
          {customization.fabric.label}
        </TabButton>
        <TabButton
          $isActive={activeTab === "leather"}
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
          onClick={() => setActiveTab("leather")}
        >
          {customization.leather.label}
        </TabButton>
      </TabButtons>

      <TabContent>
        {activeTab === "fabric" && (
          <ColorGrid>
            {customization.fabric.colors.map((color) => (
              <ColorSwatch
                key={color.value}
                $color={color.color}
                $isSelected={customization.fabric.selected === color.value}
                onClick={() => handleColorChange("fabric", color.value)}
                title={color.name}
              />
            ))}
          </ColorGrid>
        )}

        {activeTab === "leather" && (
          <ColorGrid>
            {customization.leather.colors.map((color) => (
              <ColorSwatch
                key={color.value}
                $color={color.color}
                $isSelected={customization.leather.selected === color.value}
                onClick={() => handleColorChange("leather", color.value)}
                title={color.name}
              />
            ))}
          </ColorGrid>
        )}
      </TabContent>
    </TabContainer>
  );

  return (
    <CustomizationContainer
      $borderRadius={configuration.layout.cardCornerRadius}
      $padding={configuration.layout.containerPadding}
      $strokeColor={configuration.stroke.color}
      $strokeWeight={configuration.stroke.weight}
    >
      <Title
        $fontFamily={configuration.typography.fontFamily}
        $fontSize={configuration.typography.fontSize + 8}
        $fontWeight={configuration.typography.fontWeight}
      >
        {title}
      </Title>

      <CustomizeLabel
        $fontFamily={configuration.typography.fontFamily}
        $fontSize={configuration.typography.fontSize}
        $fontWeight={configuration.typography.fontWeight}
      >
        🎨 Customize your Chair
      </CustomizeLabel>

      <OptionGroup>
        <OptionLabel
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
        >
          {customization.arms.label}
        </OptionLabel>
        <DropdownContainer>
          <Dropdown
            $fontFamily={configuration.typography.fontFamily}
            $fontSize={configuration.typography.fontSize}
            $fontWeight={configuration.typography.fontWeight}
            value={customization.arms.selected}
            onChange={(e) => handleDropdownChange("arms", e.target.value)}
          >
            {customization.arms.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Dropdown>
          <DropdownIcon size={16} />
        </DropdownContainer>
      </OptionGroup>

      {/* Dynamic Layout based on configuration.currentLayout */}
      {configuration.currentLayout === "layout1"
        ? renderVerticalLayout()
        : renderTabbedLayout()}

      <OptionGroup>
        <OptionLabel
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
        >
          {customization.legs.label}
        </OptionLabel>
        <DropdownContainer>
          <Dropdown
            $fontFamily={configuration.typography.fontFamily}
            $fontSize={configuration.typography.fontSize}
            $fontWeight={configuration.typography.fontWeight}
            value={customization.legs.selected}
            onChange={(e) => handleDropdownChange("legs", e.target.value)}
          >
            {customization.legs.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Dropdown>
          <DropdownIcon size={16} />
        </DropdownContainer>
      </OptionGroup>

      <PriceContainer>
        <PriceLabel
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
        >
          Product Price
        </PriceLabel>
        <Price
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
        >
          {currency} {price}
        </Price>
      </PriceContainer>

      <ButtonContainer $alignment={configuration.button.alignment}>
        <AddToCartButton
          $backgroundColor={configuration.button.backgroundColor}
          $textColor={configuration.button.textColor}
          $borderRadius={configuration.button.borderRadius}
          $shadow={configuration.button.shadow}
          $width={configuration.button.width}
          $fontFamily={configuration.typography.fontFamily}
          $fontSize={configuration.typography.fontSize}
          $fontWeight={configuration.typography.fontWeight}
          onClick={handleAddToCart}
        >
          Add to cart
        </AddToCartButton>
      </ButtonContainer>
    </CustomizationContainer>
  );
};

export default ProductCustomizationPanel;
