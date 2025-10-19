import React, { createContext, useContext, useState, ReactNode } from "react";
import { UIConfiguration } from "../types";
import { defaultConfiguration } from "../data/defaults";

// Context interface
interface UIConfigurationContextType {
  configuration: UIConfiguration;
  updateConfiguration: (updates: Partial<UIConfiguration>) => void;
  updateTypography: (updates: Partial<UIConfiguration["typography"]>) => void;
  updateButton: (updates: Partial<UIConfiguration["button"]>) => void;
  updateGallery: (updates: Partial<UIConfiguration["gallery"]>) => void;
  updateLayout: (updates: Partial<UIConfiguration["layout"]>) => void;
  updateStroke: (updates: Partial<UIConfiguration["stroke"]>) => void;
  updateProduct: (updates: Partial<UIConfiguration["product"]>) => void;
  setLayout: (layout: UIConfiguration["currentLayout"]) => void;
  resetConfiguration: () => void;
  exportConfiguration: () => string;
  importConfiguration: (configJson: string) => boolean;
}

// Create context
const UIConfigurationContext = createContext<
  UIConfigurationContextType | undefined
>(undefined);

// Provider component
interface UIConfigurationProviderProps {
  children: ReactNode;
}

export const UIConfigurationProvider: React.FC<
  UIConfigurationProviderProps
> = ({ children }) => {
  const [configuration, setConfiguration] =
    useState<UIConfiguration>(defaultConfiguration);

  // Update entire configuration
  const updateConfiguration = (updates: Partial<UIConfiguration>) => {
    setConfiguration((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Update typography configuration
  const updateTypography = (
    updates: Partial<UIConfiguration["typography"]>
  ) => {
    setConfiguration((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        ...updates,
      },
    }));
  };

  // Update button configuration
  const updateButton = (updates: Partial<UIConfiguration["button"]>) => {
    setConfiguration((prev) => ({
      ...prev,
      button: {
        ...prev.button,
        ...updates,
      },
    }));
  };

  // Update gallery configuration
  const updateGallery = (updates: Partial<UIConfiguration["gallery"]>) => {
    setConfiguration((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        ...updates,
      },
    }));
  };

  // Update layout configuration
  const updateLayout = (updates: Partial<UIConfiguration["layout"]>) => {
    setConfiguration((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        ...updates,
      },
    }));
  };

  // Update stroke configuration
  const updateStroke = (updates: Partial<UIConfiguration["stroke"]>) => {
    setConfiguration((prev) => ({
      ...prev,
      stroke: {
        ...prev.stroke,
        ...updates,
      },
    }));
  };

  // Update product configuration
  const updateProduct = (updates: Partial<UIConfiguration["product"]>) => {
    setConfiguration((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        ...updates,
      },
    }));
  };

  // Set current layout
  const setLayout = (layout: UIConfiguration["currentLayout"]) => {
    setConfiguration((prev) => ({
      ...prev,
      currentLayout: layout,
    }));
  };

  // Reset to default configuration
  const resetConfiguration = () => {
    setConfiguration(defaultConfiguration);
  };

  // Export configuration as JSON
  const exportConfiguration = (): string => {
    const exportData = {
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      configuration,
    };
    return JSON.stringify(exportData, null, 2);
  };

  // Validate configuration structure
  const isValidConfiguration = (config: any): config is UIConfiguration => {
    try {
      return (
        config &&
        typeof config === "object" &&
        config.typography &&
        typeof config.typography.fontFamily === "string" &&
        typeof config.typography.fontWeight === "number" &&
        typeof config.typography.fontSize === "number" &&
        config.button &&
        typeof config.button.borderRadius === "number" &&
        typeof config.button.backgroundColor === "string" &&
        typeof config.button.width === "string" &&
        config.gallery &&
        typeof config.gallery.spacing === "number" &&
        config.layout &&
        typeof config.layout.cardCornerRadius === "number" &&
        config.stroke &&
        typeof config.stroke.color === "string" &&
        config.product
      );
    } catch {
      return false;
    }
  };

  // Import configuration from JSON
  const importConfiguration = (configJson: string): boolean => {
    try {
      const importData = JSON.parse(configJson);
      if (
        importData.configuration &&
        isValidConfiguration(importData.configuration)
      ) {
        setConfiguration(importData.configuration);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to import configuration:", error);
      return false;
    }
  };

  const value: UIConfigurationContextType = {
    configuration,
    updateConfiguration,
    updateTypography,
    updateButton,
    updateGallery,
    updateLayout,
    updateStroke,
    updateProduct,
    setLayout,
    resetConfiguration,
    exportConfiguration,
    importConfiguration,
  };

  return (
    <UIConfigurationContext.Provider value={value}>
      {children}
    </UIConfigurationContext.Provider>
  );
};

// Custom hook to use the context
export const useUIConfiguration = (): UIConfigurationContextType => {
  const context = useContext(UIConfigurationContext);
  if (context === undefined) {
    throw new Error(
      "useUIConfiguration must be used within a UIConfigurationProvider"
    );
  }
  return context;
};
