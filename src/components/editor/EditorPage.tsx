import React, { useState, useEffect } from "react";
import EditorLayout from "./EditorLayout";
import EditorControls from "./EditorControls";
import ProductViewer from "../design/ProductViewer";
import LiveUpdateIndicator from "./LiveUpdateIndicator";
import { useConfigurationManager } from "../../hooks";
import { downloadFile } from "../../utils";

const EditorPage: React.FC = () => {
  const [lastUpdate, setLastUpdate] = useState(0);
  const {
    configuration,
    reset,
    export: exportConfig,
    import: importConfig,
  } = useConfigurationManager();

  // Track configuration changes for live update indicator
  useEffect(() => {
    setLastUpdate(Date.now());
  }, [configuration]);

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all configurations to default?"
      )
    ) {
      reset();
    }
  };

  const handleExport = () => {
    try {
      const configJson = exportConfig();
      const timestamp = new Date().toISOString().split("T")[0];
      downloadFile(
        configJson,
        `ui-config-${timestamp}.json`,
        "application/json"
      );
    } catch (error) {
      console.error("Failed to export configuration:", error);
      alert("Failed to export configuration. Please try again.");
    }
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importConfig(content);
        if (success) {
          alert("Configuration imported successfully!");
        } else {
          alert(
            "Failed to import configuration. Please check the file format."
          );
        }
      } catch (error) {
        console.error("Failed to import configuration:", error);
        alert("Failed to import configuration. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <LiveUpdateIndicator lastUpdate={lastUpdate} />
      <EditorLayout
        onReset={handleReset}
        onExport={handleExport}
        onImport={handleImport}
        preview={
          <div className="sticky top-4">
            <ProductViewer />
          </div>
        }
      >
        {({ activeTab }: { activeTab: string }) => (
          <EditorControls activeTab={activeTab} />
        )}
      </EditorLayout>
    </>
  );
};

export default EditorPage;
