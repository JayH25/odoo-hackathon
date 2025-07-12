import React, { useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
} from "lucide-react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

  const executeCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: "bold", title: "Bold" },
    { icon: Italic, command: "italic", title: "Italic" },
    { icon: Underline, command: "underline", title: "Underline" },
    { icon: Strikethrough, command: "strikeThrough", title: "Strikethrough" },
    { divider: true },
    { icon: List, command: "insertUnorderedList", title: "Bullet List" },
    { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
    { divider: true },
    {
      icon: Quote,
      command: "formatBlock",
      value: "blockquote",
      title: "Quote",
    },
    { divider: true },
    {
      icon: Link,
      command: "createLink",
      title: "Insert Link",
      needsValue: true,
    },
    {
      icon: Image,
      command: "insertImage",
      title: "Insert Image",
      needsValue: true,
    },
    { divider: true },
    { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
    { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
    { icon: AlignRight, command: "justifyRight", title: "Align Right" },
  ];

  const handleButtonClick = (button) => {
    if (button.needsValue) {
      const input = prompt(`Enter ${button.title.toLowerCase()}:`);
      if (input) {
        executeCommand(button.command, input);
      }
    } else {
      executeCommand(button.command, button.value);
    }
  };

  // Sync value to editor only when needed (prevents cursor jump)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="border border-gray-600 rounded-xl overflow-hidden bg-gray-800 shadow-lg">
      {/* Toolbar */}
      <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex items-center gap-2 flex-wrap">
        {toolbarButtons.map((button, index) =>
          button.divider ? (
            <div key={index} className="w-px h-6 bg-gray-500 mx-2" />
          ) : (
            <button
              key={index}
              type="button"
              onClick={() => handleButtonClick(button)}
              className="p-2 rounded-lg hover:bg-gray-600 transition-all duration-200 text-gray-300 hover:text-white focus:ring-2 focus:ring-blue-500"
              title={button.title}
            >
              <button.icon size={18} />
            </button>
          )
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-5 min-h-[250px] text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all duration-200 text-left direction-ltr"
        data-placeholder={placeholder}
        style={{
          wordBreak: "break-word",
          lineHeight: "1.6",
          textAlign: "left",
          direction: "ltr",
        }}
      />

      {/* Styles */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
          text-align: left;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #6b7280;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #d1d5db;
        }
        [contenteditable] ul,
        [contenteditable] ol {
          padding-left: 2rem;
          margin: 0.5rem 0;
        }
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        [contenteditable] a {
          color: #60a5fa;
          text-decoration: underline;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
