import { useState, useRef } from "react"; // Removed useEffect since it's no longer needed
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";
import "./AddNewQuestion.css";

const AddNewQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !title.trim() || !description.trim()) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3004/api/v1/question/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          username: username.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        showNotification("Question posted successfully! 🎉", "success");
        setTitle("");
        setDescription("");
        setTags("");
        setUsername("");
        setTimeout(() => navigate("/"), 1500);
      } else {
        showNotification(data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error("Post question error:", err);
      showNotification("Failed to post question. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    document.querySelectorAll(".notification").forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span>${message}</span><div className="notification-progress"></div>`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "notificationSlide 0.5s reverse";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  const handleDescriptionChange = (html) => {
    setDescription(html);
    setCharCount(html.length); // Note: This counts HTML tags; adjust if needed
  };

  const formatTag = (e) => {
    const value = e.target.value;
    const formatted = value.toLowerCase().replace(/[^a-z0-9,]/g, "");
    setTags(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 relative overflow-hidden">
      <div className="grid-overlay"></div>
      <div className="floating-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700 p-10 shadow-2xl"
      >
        <h1
          className="text-4xl font-extrabold text-center mb-10 text-orange-500 tracking-tight drop-shadow-lg"
          data-text="Ask Your Question"
        >
          Ask Your Question
        </h1>

        <div className="space-y-6">
          <div className="input-group">
            <label className="block text-white/90 font-medium mb-3">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
              autoComplete="name"
              maxLength={50}
            />
          </div>

          <div className="input-group">
            <label className="block text-white/90 font-medium mb-3">
              Question Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="What's your question?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
                maxLength={200}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                {title.length}/200
              </span>
            </div>
          </div>

          <div className="input-group">
            <label className="block text-white/90 font-medium mb-3">
              Description
            </label>
            <RichTextEditor
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Provide more details about your question..."
            />
            <span className="text-xs text-gray-400 mt-2 block">
              {charCount}/2000
            </span>
          </div>

          <div className="input-group">
            <label className="block text-white/90 font-medium mb-3">Tags</label>
            <input
              type="text"
              placeholder="Tags (e.g., javascript, react, css)"
              value={tags}
              onChange={formatTag}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              title="Tags should be comma-separated"
            />
            <span className="text-xs text-gray-400 mt-2">
              Separate tags with commas
            </span>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse">•</span>
                  <span
                    className="animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  >
                    •
                  </span>
                  <span
                    className="animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  >
                    •
                  </span>
                  Posting
                </span>
              </>
            ) : (
              <>
                <span className="button-text">Post Question</span>
                <span className="button-icon ml-2">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewQuestion;
