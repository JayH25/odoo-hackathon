import React, { useState, useRef, useEffect } from "react";
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
  Code,
  Strikethrough,
} from "lucide-react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
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
    { icon: Quote, command: "formatBlock", value: "blockquote", title: "Quote" },
    { divider: true },
    { icon: Link, command: "createLink", title: "Insert Link", needsValue: true },
    { icon: Image, command: "insertImage", title: "Insert Image", needsValue: true },
    { divider: true },
    { icon: AlignLeft, command: "justifyLeft", title: "Align Left" },
    { icon: AlignCenter, command: "justifyCenter", title: "Align Center" },
    { icon: AlignRight, command: "justifyRight", title: "Align Right" },
  ];

  const handleButtonClick = (button) => {
    if (button.needsValue) {
      const value = prompt(`Enter ${button.title.toLowerCase()}:`);
      if (value) {
        executeCommand(button.command, value);
      }
    } else {
      executeCommand(button.command, button.value);
    }
  };

  return (
    <div className="border border-gray-600 rounded-xl overflow-hidden bg-gray-800 shadow-lg">
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

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-5 min-h-[250px] text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all duration-200 text-left direction-ltr"
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
          text-align: left;
          direction: ltr;
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

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [username] = useState("JayH25");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setTimeout(() => {
        setMessage("✅ Question submitted successfully!");
        setTitle("");
        setDescription("");
        setTags("");
        setLoading(false);
      }, 2000);
    } catch (err) {
      setMessage("❌ Something went wrong.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Ask a Question</h2>
            <div className="flex items-center gap-2 text-teal-400">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.includes("✅")
                  ? "bg-green-900/50 border border-green-500"
                  : "bg-red-900/50 border border-red-500"
              }`}
            >
              <p className="text-sm text-center text-white">{message}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-white/90 font-medium mb-3">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter a descriptive title for your question"
              />
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-3">Description</label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Describe your question in detail. Use the toolbar to format your text, add links, images, and more..."
              />
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-3">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g. React, JavaScript, Node.js, MongoDB"
              />
              <p className="text-gray-400 text-sm mt-2">Separate tags with commas</p>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading || !title.trim() || !description.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 min-w-[120px]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
