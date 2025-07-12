import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        formRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (formRef.current) {
        formRef.current.style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      }
    };

    const form = formRef.current;
    if (form) {
      form.addEventListener("mousemove", handleMouseMove);
      form.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (form) {
        form.removeEventListener("mousemove", handleMouseMove);
        form.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username.trim() || !title.trim() || !description.trim()) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3004/api/v1/question/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        // Clear form
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
    // Remove any existing notifications
    document.querySelectorAll(".notification").forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <div class="notification-progress"></div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "notificationSlide 0.5s reverse";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setCharCount(value.length);
  };

  const formatTag = (e) => {
    // Auto-format tags as user types
    const value = e.target.value;
    const formatted = value.toLowerCase().replace(/[^a-z0-9,]/g, "");
    setTags(formatted);
  };

  return (
    <div className="full-page-container">
      {/* Animated background elements */}
      <div className="grid-overlay"></div>

      {/* Floating orbs */}
      <div className="floating-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {/* Main form */}
      <form ref={formRef} onSubmit={handleSubmit} className="question-form">
        <h1 className="form-title" data-text="Ask Your Question">
          Ask Your Question
        </h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
            autoComplete="name"
            maxLength={50}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="What's your question?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
            maxLength={200}
          />
          <span className="char-limit">{title.length}/200</span>
        </div>

        <div className="input-group">
          <textarea
            placeholder="Provide more details about your question..."
            value={description}
            onChange={handleDescriptionChange}
            className="form-textarea"
            required
            maxLength={2000}
          />
          <span className="char-limit">{charCount}/2000</span>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Tags (e.g., javascript, react, css)"
            value={tags}
            onChange={formatTag}
            className="form-input"
            title="Tags should be comma-separated"
          />
          <span className="input-hint">Separate tags with commas</span>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
              Posting
            </>
          ) : (
            <>
              <span className="button-text">Post Question</span>
              <span className="button-icon">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddNewQuestion;
