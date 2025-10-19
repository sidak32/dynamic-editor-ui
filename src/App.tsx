import React from "react";
import { UIConfigurationProvider } from "./context/UIConfigurationContext";
import { GlobalStyle } from "./styles/components";
import EditorPage from "./components/editor/EditorPage";

function App() {
  return (
    <UIConfigurationProvider>
      <GlobalStyle />
      <EditorPage />
    </UIConfigurationProvider>
  );
}

export default App;
