import React, { useState } from "react";
import styled from "styled-components";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  RotateCcw,
  Download,
  Upload,
} from "lucide-react";

const EditorContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f8fafc;
`;

const EditorSidebar = styled.div<{ $isCollapsed: boolean }>`
  width: ${(props) => (props.$isCollapsed ? "60px" : "320px")};
  background: white;
  border-right: 1px solid #e5e7eb;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
`;

const EditorHeader = styled.div<{ $isCollapsed: boolean }>`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$isCollapsed ? "center" : "space-between"};
  min-height: 64px;
`;

const EditorTitle = styled.h1<{ $isCollapsed: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: ${(props) => (props.$isCollapsed ? "none" : "flex")};
  align-items: center;
  transition: all 0.2s ease;
`;

const CollapseButton = styled.button<{ $isCollapsed: boolean }>`
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

const EditorActions = styled.div<{ $isCollapsed: boolean }>`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: ${(props) => (props.$isCollapsed ? "none" : "flex")};
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{
  $variant?: "primary" | "secondary" | "danger";
}>`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.$variant) {
      case "primary":
        return `
          background: #3b82f6;
          color: white;
          &:hover { background: #2563eb; }
        `;
      case "danger":
        return `
          background: #ef4444;
          color: white;
          &:hover { background: #dc2626; }
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
          &:hover { background: #e5e7eb; color: #374151; }
        `;
    }
  }}
`;

interface EditorLayoutProps {
  children: ({ activeTab }: { activeTab: string }) => React.ReactNode;
  preview?: React.ReactNode;
  onReset?: () => void;
  onExport?: () => void;
  onImport?: (file: File) => void;
}

const EditorTabs = styled.div<{ $isCollapsed: boolean }>`
  display: ${(props) => (props.$isCollapsed ? "none" : "flex")};
  border-bottom: 1px solid #e5e7eb;
`;

const EditorTab = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: ${(props) => (props.$isActive ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.$isActive ? "white" : "#6b7280")};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$isActive ? "#3b82f6" : "#f3f4f6")};
    color: ${(props) => (props.$isActive ? "white" : "#374151")};
  }
`;

const EditorContent = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => (props.$isCollapsed ? "0" : "20px")};
  display: ${(props) => (props.$isCollapsed ? "none" : "block")};
`;

const PreviewArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f8fafc;
`;

const PreviewHeader = styled.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const PreviewTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PreviewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PreviewContent = styled.div<{ $scale?: number }>`
  flex: 1;
  overflow: auto;
  background: #f8fafc;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  > * {
    transform: scale(${(props) => props.$scale || 1});
    transform-origin: top center;
    transition: transform 0.3s ease;
    width: 100%;
  }
`;

const EditorLayout: React.FC<EditorLayoutProps> = ({
  children,
  preview,
  onReset,
  onExport,
  onImport,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const [previewScale, setPreviewScale] = useState(1);

  const tabs = [
    { id: "design", label: "Design" },
    { id: "typography", label: "Typography" },
  ];

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onImport) {
        onImport(file);
      }
    };
    input.click();
  };

  return (
    <EditorContainer>
      <EditorSidebar $isCollapsed={isCollapsed}>
        <EditorHeader $isCollapsed={isCollapsed}>
          <EditorTitle $isCollapsed={isCollapsed}>
            <Settings
              size={16}
              style={{
                marginRight: isCollapsed ? "0" : "8px",
                display: "inline",
              }}
            />
            {!isCollapsed && "UI Editor"}
          </EditorTitle>
          <CollapseButton
            $isCollapsed={isCollapsed}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </CollapseButton>
        </EditorHeader>

        {!isCollapsed && <></>}

        <EditorActions $isCollapsed={isCollapsed}>
          <ActionButton onClick={onReset} $variant="danger">
            <RotateCcw size={12} />
            Reset
          </ActionButton>
          <ActionButton onClick={onExport} $variant="primary">
            <Download size={12} />
            Export
          </ActionButton>
          <ActionButton onClick={handleImport}>
            <Upload size={12} />
            Import
          </ActionButton>
        </EditorActions>

        <EditorTabs $isCollapsed={isCollapsed}>
          {tabs.map((tab) => (
            <EditorTab
              key={tab.id}
              $isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </EditorTab>
          ))}
        </EditorTabs>

        <EditorContent $isCollapsed={isCollapsed}>
          {typeof children === "function" ? children({ activeTab }) : children}
        </EditorContent>
      </EditorSidebar>

      <PreviewArea>
        <PreviewHeader>
          <PreviewTitle>Live Preview</PreviewTitle>
          <PreviewControls>
            <select
              value={previewScale}
              onChange={(e) => setPreviewScale(Number(e.target.value))}
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #e5e7eb",
                fontSize: "11px",
                background: "white",
              }}
            >
              <option value={0.5}>50%</option>
              <option value={0.75}>75%</option>
              <option value={1}>100%</option>
              <option value={1.25}>125%</option>
            </select>
          </PreviewControls>
        </PreviewHeader>
        <PreviewContent $scale={previewScale}>{preview}</PreviewContent>
      </PreviewArea>
    </EditorContainer>
  );
};

export default EditorLayout;
