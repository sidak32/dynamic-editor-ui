import { useUIConfiguration } from "../context/UIConfigurationContext";
import { UIConfiguration } from "../types";

// Hook for typography controls
export const useTypography = () => {
  const { configuration, updateTypography } = useUIConfiguration();

  return {
    typography: configuration.typography,
    updateFontFamily: (
      fontFamily: UIConfiguration["typography"]["fontFamily"]
    ) => updateTypography({ fontFamily }),
    updateFontWeight: (
      fontWeight: UIConfiguration["typography"]["fontWeight"]
    ) => updateTypography({ fontWeight }),
    updateFontSize: (fontSize: number) =>
      updateTypography({ fontSize: Math.max(10, Math.min(60, fontSize)) }),
  };
};

// Hook for button controls
export const useButton = () => {
  const { configuration, updateButton } = useUIConfiguration();

  return {
    button: configuration.button,
    updateBorderRadius: (borderRadius: number) =>
      updateButton({ borderRadius: Math.max(0, borderRadius) }),
    updateShadow: (shadow: UIConfiguration["button"]["shadow"]) =>
      updateButton({ shadow }),
    updateAlignment: (alignment: UIConfiguration["button"]["alignment"]) =>
      updateButton({ alignment }),
    updateWidth: (width: UIConfiguration["button"]["width"]) =>
      updateButton({ width }),
    updateBackgroundColor: (backgroundColor: string) =>
      updateButton({ backgroundColor }),
    updateTextColor: (textColor: string) => updateButton({ textColor }),
  };
};

// Hook for gallery controls
export const useGallery = () => {
  const { configuration, updateGallery } = useUIConfiguration();

  return {
    gallery: configuration.gallery,
    updateAlignment: (alignment: UIConfiguration["gallery"]["alignment"]) =>
      updateGallery({ alignment }),
    updateSpacing: (spacing: number) =>
      updateGallery({ spacing: Math.max(0, spacing) }),
    updateBorderRadius: (borderRadius: number) =>
      updateGallery({ borderRadius: Math.max(0, borderRadius) }),
  };
};

// Hook for layout controls
export const useLayout = () => {
  const { configuration, updateLayout, setLayout } = useUIConfiguration();

  return {
    layout: configuration.layout,
    currentLayout: configuration.currentLayout,
    updateCardCornerRadius: (cardCornerRadius: number) =>
      updateLayout({ cardCornerRadius: Math.max(0, cardCornerRadius) }),
    updateContainerPadding: (containerPadding: number) =>
      updateLayout({ containerPadding: Math.max(0, containerPadding) }),
    updateSectionBackgroundColor: (sectionBackgroundColor: string) =>
      updateLayout({ sectionBackgroundColor }),
    switchLayout: (layout: UIConfiguration["currentLayout"]) =>
      setLayout(layout),
  };
};

// Hook for stroke controls
export const useStroke = () => {
  const { configuration, updateStroke } = useUIConfiguration();

  return {
    stroke: configuration.stroke,
    updateColor: (color: string) => updateStroke({ color }),
    updateWeight: (weight: number) =>
      updateStroke({ weight: Math.max(0, weight) }),
  };
};

// Hook for configuration management
export const useConfigurationManager = () => {
  const {
    configuration,
    resetConfiguration,
    exportConfiguration,
    importConfiguration,
  } = useUIConfiguration();

  return {
    configuration,
    reset: resetConfiguration,
    export: exportConfiguration,
    import: importConfiguration,
  };
};

// Hook for validation
export const useValidation = () => {
  const isValidColor = (color: string): boolean => {
    // Check if valid hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(color)) return true;

    // Check if valid rgb/rgba color
    const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/;
    if (rgbRegex.test(color)) return true;

    return false;
  };

  const isValidFontSize = (size: number): boolean => {
    return size >= 10 && size <= 60;
  };

  const isValidRadius = (radius: number): boolean => {
    return radius >= 0;
  };

  const isValidSpacing = (spacing: number): boolean => {
    return spacing >= 0;
  };

  return {
    isValidColor,
    isValidFontSize,
    isValidRadius,
    isValidSpacing,
  };
};
