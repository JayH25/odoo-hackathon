import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import RichTextEditor from "../Component/RichTextEditor"; // Adjust path as needed

const Ans = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");

  const handleUpvote = async (answerIndex) => {
    const res = await fetch(
      `http://localhost:3004/api/v1/question/upvote/${id}/${answerIndex}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: "Proud Coyote", // Replace with dynamic username from auth
        }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setQuestion(data.data); // Update state with new votes
    } else {
      alert(data.message);
    }
  };

  const fetchQuestion = async () => {
    const res = await fetch(
      `http://localhost:3004/api/v1/question/single/${id}`
    );
    const data = await res.json();
    setQuestion(data.question);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch(
      `http://localhost:3004/api/v1/question/answer/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          anstext: newAnswer,
          username: "Proud Coyote", // Replace with dynamic username if needed
        }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setQuestion(data.data);
      setNewAnswer("");

      // Send email with HTML content
      emailjs
        .send(
          "service_mz1yjtv", // Your service ID
          "template_v3k74ho", // Your template ID
          {
            question_title: data.data.title,
            answer_text: newAnswer, // HTML content will be sent as is
          },
          "yFUGdMmz8V0skykGE" // Your public key (user ID)
        )
        .then(() => {
          console.log("✅ Email sent successfully");
        })
        .catch((err) => {
          console.error("❌ Failed to send email", err);
        });
    }
  };

  if (!question)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-lg animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-xs sm:text-sm text-blue-400 mb-4 flex items-center gap-2">
          <span className="hover:text-blue-300 cursor-pointer transition-colors">
            Question
          </span>
          <span className="text-gray-600">›</span>
          <span className="text-gray-400 truncate max-w-[150px] sm:max-w-none">
            {question.title.slice(0, 20)}...
          </span>
        </p>

        {/* Question Section */}
        <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 sm:p-6 mb-6 border border-gray-700/50 shadow-xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {question.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full text-blue-300 border border-blue-500/30 hover:border-blue-400/50 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            {question.description}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span>
              Asked by{" "}
              <span className="text-blue-400 font-medium">
                {question.username}
              </span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{new Date(question.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Answers Section */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <span className="text-xl sm:text-2xl">💬</span>
            Answers ({question.answers.length})
          </h3>

          {question.answers.length === 0 ? (
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 sm:p-8 text-center">
              <p className="text-gray-500 text-sm sm:text-base">
                No answers yet. Be the first to answer!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {question.answers.map((a, i) => (
                <div
                  key={i}
                  className="bg-gray-800/30 p-3 sm:p-4 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                        {a.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-300 font-medium text-sm sm:text-base">
                        {a.username}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        •{" "}
                        {a.createdAt
                          ? new Date(a.createdAt).toLocaleDateString()
                          : "Just now"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg px-2 py-1 self-start sm:self-auto">
                      <button
                        className="text-gray-400 hover:text-green-400 transition-colors p-1"
                        onClick={() => handleUpvote(i)}
                      >
                        ⬆
                      </button>

                      <span className="text-white font-medium px-1 sm:px-2 text-sm sm:text-base">
                        {a.votes}
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-gray-300 leading-relaxed pl-0 sm:pl-11 text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: a.anstext }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Answer Section */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 backdrop-blur rounded-xl p-4 sm:p-6 border border-gray-700/50 shadow-xl">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <span className="text-xl sm:text-2xl">✍️</span>
            Submit Your Answer
          </h3>

          <RichTextEditor
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here..."
          />

          <button
            onClick={handleSubmit}
            disabled={!newAnswer.trim()}
            className="mt-3 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ans;
