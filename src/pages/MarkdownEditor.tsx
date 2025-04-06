// src/components/MarkdownEditor.jsx
import { useEffect, useRef, useState } from "react";
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/nord.css";
import { Save } from "lucide-react";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const crepeInstance = {
  editor: null as Crepe | null,
  initialized: false,
};
const MarkdownEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(
    localStorage.getItem("markdownContent") || `# Hello`
  );

  useEffect(() => {
    if (editorRef.current && !crepeInstance.initialized) {
      const crepe = new Crepe({
        root: editorRef.current,
        defaultValue: content,
        features: {
          math: true,
          katex: true,
          prism: true,
        },
        markdownUpdated: (markdown) => {
          setContent(markdown);
          localStorage.setItem("markdownContent", markdown);
        },
      });

      crepe.create().then(() => {
        crepeInstance.editor = crepe;
        crepeInstance.initialized = true;
        console.log("Editor initialized");
      });
    }
  }, []);



  const handleSave = () => {
    localStorage.setItem("markdownContent", content);
    alert("Saved to localStorage!");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden font-roboto">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-700">Study Editor</h1>
        <button
          onClick={handleSave}
          className="bg-lime-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-lime-600 transition"
        >
          <Save className="w-5 h-5 mr-2" />
          Save
        </button>
      </div>

      {/* Editor container */}
      <div
        ref={editorRef}
        className="flex-1 p-4 bg-white m-4 rounded-lg shadow-md overflow-auto border border-gray-200 font-roboto"
      />
    </div>
  );
};

export default MarkdownEditor;
