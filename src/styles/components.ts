import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
    color: #1e293b;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

export const getShadow = (type: string) => {
  switch (type) {
    case "small":
      return "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    case "medium":
      return "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
    case "large":
      return "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
    case "none":
    default:
      return "none";
  }
};

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Card = styled.div<{ $radius?: number; $padding?: number }>`
  background: white;
  border-radius: ${(props) => props.$radius || 12}px;
  padding: ${(props) => props.$padding || 24}px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
`;

export const Button = styled.button<{
  $variant?: "primary" | "secondary" | "outline";
  $size?: "sm" | "md" | "lg";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;

  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return `
          background-color: #f1f5f9;
          color: #475569;
          &:hover { background-color: #e2e8f0; }
        `;
      case "outline":
        return `
          background-color: transparent;
          color: #3b82f6;
          border: 1px solid #3b82f6;
          &:hover { background-color: #eff6ff; }
        `;
      default:
        return `
          background-color: #3b82f6;
          color: white;
          &:hover { background-color: #2563eb; }
        `;
    }
  }}

  ${(props) => {
    switch (props.$size) {
      case "sm":
        return `padding: 6px 12px; font-size: 14px;`;
      case "lg":
        return `padding: 12px 24px; font-size: 16px;`;
      default:
        return `padding: 8px 16px; font-size: 14px;`;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FlexRow = styled.div<{
  $gap?: number;
  $align?: string;
  $justify?: string;
}>`
  display: flex;
  gap: ${(props) => props.$gap || 16}px;
  align-items: ${(props) => props.$align || "center"};
  justify-content: ${(props) => props.$justify || "flex-start"};
`;

export const FlexCol = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || 16}px;
`;

export const Grid = styled.div<{ $cols?: number; $gap?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$cols || 2}, 1fr);
  gap: ${(props) => props.$gap || 16}px;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e2e8f0;
  margin: 16px 0;
`;
