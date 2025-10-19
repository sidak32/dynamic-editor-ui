import { UIConfiguration, Theme } from "../types";

export const defaultConfiguration: UIConfiguration = {
  typography: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    shadow: "small",
    alignment: "center",
    width: "auto",
    backgroundColor: "#3B82F6",
    textColor: "#FFFFFF",
  },
  gallery: {
    alignment: "grid-center",
    spacing: 16,
    borderRadius: 8,
  },
  layout: {
    cardCornerRadius: 12,
    containerPadding: 24,
    sectionBackgroundColor: "#F8FAFC",
  },
  stroke: {
    color: "#E2E8F0",
    weight: 1,
  },
  product: {
    title: "Cozy Longe Chair",
    price: 200,
    currency: "$",
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Cozy Longe Chair - Front View",
        isMain: true,
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Cozy Longe Chair - Front View",
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Cozy Longe Chair - Front View",
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        alt: "Cozy Longe Chair - Front View",
      },
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        alt: "Cozy Longe Chair",
      },
    ],
    customization: {
      arms: {
        label: "Arms",
        selected: "walnut-brown",
        options: [
          { value: "walnut-brown", label: "Walnut Brown" },
          { value: "oak-natural", label: "Oak Natural" },
          { value: "cherry-wood", label: "Cherry Wood" },
        ],
      },
      fabric: {
        label: "Fabric",
        selected: "brown-leather",
        colors: [
          { value: "brown-leather", name: "Brown Leather", color: "#8B4513" },
          { value: "dark-brown", name: "Dark Brown", color: "#654321" },
          { value: "black-leather", name: "Black Leather", color: "#2C2C2C" },
          { value: "gray-fabric", name: "Gray Fabric", color: "#696969" },
          { value: "blue-fabric", name: "Blue Fabric", color: "#4682B4" },
          { value: "green-fabric", name: "Green Fabric", color: "#228B22" },
        ],
      },
      leather: {
        label: "Leather Brown",
        selected: "cognac",
        colors: [
          { value: "cognac", name: "Cognac", color: "#A0522D" },
          { value: "chocolate", name: "Chocolate", color: "#7B3F00" },
          { value: "espresso", name: "Espresso", color: "#4A2C2A" },
          { value: "caramel", name: "Caramel", color: "#D2691E" },
          { value: "mahogany", name: "Mahogany", color: "#C04000" },
          { value: "burgundy", name: "Burgundy", color: "#800020" },
        ],
      },
      legs: {
        label: "Legs Finish",
        selected: "dark-walnut",
        options: [
          { value: "dark-walnut", label: "Dark Walnut" },
          { value: "natural-oak", label: "Natural Oak" },
          { value: "black-stain", label: "Black Stain" },
          { value: "white-wash", label: "White Wash" },
        ],
      },
    },
  },
  currentLayout: "layout1",
};

export const defaultTheme: Theme = {
  colors: {
    primary: "#3B82F6",
    secondary: "#64748B",
    background: "#FFFFFF",
    surface: "#F8FAFC",
    text: "#1E293B",
    border: "#E2E8F0",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

export const fontFamilyOptions = [
  "Roboto",
  "Inter",
  "Poppins",
  "Arial",
  "Times New Roman",
] as const;

export const fontWeightOptions = [400, 500, 600, 700] as const;

export const shadowOptions = [
  { value: "none", label: "None" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
] as const;

export const alignmentOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
] as const;

export const buttonWidthOptions = [
  { value: "auto", label: "Auto" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "full", label: "Full Width" },
] as const;

export const galleryAlignmentOptions = [
  { value: "grid-left", label: "Grid Left" },
  { value: "grid-center", label: "Grid Center" },
  { value: "grid-right", label: "Grid Right" },
] as const;
