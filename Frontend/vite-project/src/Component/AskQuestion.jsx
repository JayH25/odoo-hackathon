import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [username, setUsername] = useState(""); // You can get this from user data or token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3004/api/v1/question/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated string to array
          username,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Question posted successfully!");
        navigate("/");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Post question error:", err);
      alert("Failed to post question");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 rounded-xl text-white space-y-4"
    >
      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
      />
      <input
        type="text"
        placeholder="Question Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
      >
        Post Question
      </button>
    </form>
  );
};

export default AddNewQuestion;
