import React from "react";
import styled from "styled-components";
import TypographyControls from "./TypographyControls";
import ButtonControls from "./ButtonControls";
import GalleryControls from "./GalleryControls";
import LayoutControls from "./LayoutControls";

const ControlsContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const TabContent = styled.div`
  padding: 4px 0;
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
`;

interface EditorControlsProps {
  activeTab?: string;
}

const EditorControls: React.FC<EditorControlsProps> = ({
  activeTab = "design",
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "design":
        return (
          <TabContent>
            <LayoutControls />
            <div
              style={{ height: "1px", background: "#e5e7eb", margin: "32px 0" }}
            />
            <ButtonControls />
            <div
              style={{ height: "1px", background: "#e5e7eb", margin: "32px 0" }}
            />
            <GalleryControls />
          </TabContent>
        );
      case "typography":
        return (
          <TabContent>
            <TypographyControls />
          </TabContent>
        );
      default:
        return <EmptyState>Select a tab to start customizing</EmptyState>;
    }
  };

  return <ControlsContainer>{renderTabContent()}</ControlsContainer>;
};

export default EditorControls;
