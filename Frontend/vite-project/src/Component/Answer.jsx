import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Ans = () => {
  const { id } = useParams(); // question ID from URL
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [upvotedAnswers, setUpvotedAnswers] = useState([]);

  useEffect(() => {
    fetchQuestion();
    checkAuth();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await fetch(`http://localhost:3004/api/v1/question/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setQuestion(data.message);
    } catch (err) {
      console.error("Error fetching question:", err);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3004/api/v1/user/me", {
        method: "GET",
        credentials: "include",
      });
      setIsAuthenticated(res.ok);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleUpvote = async (answerIndex) => {
    if (!isAuthenticated) {
      return navigate("/login");
    }

    if (upvotedAnswers.includes(answerIndex)) return;

    try {
      const res = await fetch(`http://localhost:3004/api/v1/question/${id}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ answerIndex }),
      });

      const data = await res.json();
      if (data.success) {
        const updated = [...question.answers];
        updated[answerIndex].votes += 1;
        setQuestion({ ...question, answers: updated });
        setUpvotedAnswers([...upvotedAnswers, answerIndex]);
      }
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) return navigate("/login");

    try {
      const res = await fetch(`http://localhost:3004/api/v1/question/${id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: answerText }),
      });
      const data = await res.json();
      if (data.success) {
        setQuestion({ ...question, answers: [...question.answers, data.newAnswer] });
        setAnswerText("");
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  if (!question) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-blue-400 underline cursor-pointer mb-4" onClick={() => navigate("/")}>
          Question &gt; {question.title.substring(0, 20)}...
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
        <div className="flex gap-2 mb-3">
          {question.tags.map((tag, i) => (
            <span key={i} className="bg-gray-700 text-sm px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-300 mb-6">{question.description}</p>

        {/* Answers */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold mb-4">Answers</h3>

          {question.answers.map((ans, idx) => (
            <div key={idx} className="flex items-start gap-4 mb-6">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleUpvote(idx)}
                  className={`text-white hover:text-green-400 text-xl ${upvotedAnswers.includes(idx) ? "opacity-50" : ""}`}
                >
                  ▲
                </button>
                <span className="text-lg font-semibold">{ans.votes}</span>
                <span className="text-sm text-gray-400">▼</span>
              </div>
              <div>
                <p>{ans.text}</p>
                <p className="text-xs text-gray-500 mt-1">— {ans.username}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Answer */}
        <div className="border-t border-gray-700 pt-6 mt-10">
          <h3 className="text-lg font-semibold mb-2">Submit Your Answer</h3>

          {/* Editor Box */}
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            rows={6}
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none"
            placeholder="Type your answer here..."
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ans;
