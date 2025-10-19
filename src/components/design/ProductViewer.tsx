import React, { useState } from "react";
import styled from "styled-components";
import ProductImageViewer from "./ProductImageViewer";
import ProductCustomizationPanel from "./ProductCustomizationPanel";
import { useUIConfiguration } from "../../context/UIConfigurationContext";

const ProductContainer = styled.div<{
  $backgroundColor?: string;
  $padding?: number;
}>`
  background-color: ${(props) => props.$backgroundColor || "#f8fafc"};
  padding: ${(props) => props.$padding || 24}px;
  min-height: 100vh;
`;

const ProductLayout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const MobileLayout = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LayoutToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  gap: 12px;
`;

const LayoutButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.$isActive ? "#3b82f6" : "#e5e7eb")};
  background: ${(props) => (props.$isActive ? "#3b82f6" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "#64748b")};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

const ProductViewer: React.FC = () => {
  const { configuration, updateConfiguration } = useUIConfiguration();
  const [currentLayout, setCurrentLayout] = useState<"mobile" | "desktop">(
    "desktop"
  );

  const handleCustomizationChange = (option: string, value: string) => {
    const updatedProduct = { ...configuration.product };

    if (option === "arms" || option === "legs") {
      updatedProduct.customization[option].selected = value;
    } else if (option === "fabric" || option === "leather") {
      updatedProduct.customization[option].selected = value;
    }

    updateConfiguration({ product: updatedProduct });
  };

  const handleLayoutSwitch = (layout: "mobile" | "desktop") => {
    setCurrentLayout(layout);
  };

  return (
    <ProductContainer
      $backgroundColor={configuration.layout.sectionBackgroundColor}
      $padding={configuration.layout.containerPadding}
    >
      <LayoutToggle>
        <LayoutButton
          $isActive={currentLayout === "desktop"}
          onClick={() => handleLayoutSwitch("desktop")}
        >
          Desktop View
        </LayoutButton>
        <LayoutButton
          $isActive={currentLayout === "mobile"}
          onClick={() => handleLayoutSwitch("mobile")}
        >
          Mobile View
        </LayoutButton>
      </LayoutToggle>

      {currentLayout === "desktop" ? (
        <ProductLayout>
          <ProductImageViewer images={configuration.product.images} />
          <ProductCustomizationPanel
            title={configuration.product.title}
            price={configuration.product.price}
            currency={configuration.product.currency}
            customization={configuration.product.customization}
            onCustomizationChange={handleCustomizationChange}
          />
        </ProductLayout>
      ) : (
        <MobileLayout>
          <ProductImageViewer images={configuration.product.images} />
          <ProductCustomizationPanel
            title={configuration.product.title}
            price={configuration.product.price}
            currency={configuration.product.currency}
            customization={configuration.product.customization}
            onCustomizationChange={handleCustomizationChange}
          />
        </MobileLayout>
      )}
    </ProductContainer>
  );
};

export default ProductViewer;
