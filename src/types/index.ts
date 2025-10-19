export interface UIConfiguration {
  typography: TypographyConfig;
  button: ButtonConfig;
  gallery: GalleryConfig;
  layout: LayoutConfig;
  stroke: StrokeConfig;
  product: ProductConfig;
  currentLayout: LayoutType;
}

// Product Customizer Configuration
export interface ProductConfig {
  title: string;
  price: number;
  currency: string;
  images: ProductImage[];
  customization: CustomizationOptions;
}

// Product Image
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain?: boolean;
}

// Customization Options
export interface CustomizationOptions {
  arms: DropdownOption;
  fabric: ColorPalette;
  leather: ColorPalette;
  legs: DropdownOption;
}

export interface DropdownOption {
  label: string;
  selected: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export interface ColorPalette {
  label: string;
  selected: string;
  colors: Array<{
    value: string;
    name: string;
    color: string;
  }>;
}

// Typography Configuration
export interface TypographyConfig {
  fontFamily: FontFamily;
  fontWeight: FontWeight;
  fontSize: number; // 10px to 60px
}

export type FontFamily =
  | "Roboto"
  | "Inter"
  | "Poppins"
  | "Arial"
  | "Times New Roman";
export type FontWeight = 400 | 500 | 600 | 700;

// Button Configuration
export interface ButtonConfig {
  borderRadius: number;
  shadow: ShadowType;
  alignment: Alignment;
  width: ButtonWidth;
  backgroundColor: string; // HEX/RGB
  textColor: string; // HEX/RGB
}

export type ShadowType = "none" | "small" | "medium" | "large";
export type Alignment = "left" | "center" | "right";
export type ButtonWidth = "auto" | "full" | "large" | "medium";

// Gallery Configuration
export interface GalleryConfig {
  alignment: GalleryAlignment;
  spacing: number;
  borderRadius: number;
}

export type GalleryAlignment = "grid-left" | "grid-center" | "grid-right";

// Layout Configuration
export interface LayoutConfig {
  cardCornerRadius: number;
  containerPadding: number;
  sectionBackgroundColor: string;
}

// Stroke/Border Configuration
export interface StrokeConfig {
  color: string;
  weight: number;
}

// Layout Types
export type LayoutType = "layout1" | "layout2";

// Theme and Styling Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}
