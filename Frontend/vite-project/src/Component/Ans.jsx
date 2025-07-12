import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Ans = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");

  // 🟦 Replace with actual logged-in user later
  const currentUser = "Proud Coyote";

  // Fetch single question details
  const fetchQuestion = async () => {
    try {
      const res = await fetch(
        `http://localhost:3004/api/v1/question/single/${id}`
      );
      const data = await res.json();
      setQuestion(data.question);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // Submit a new answer
  const handleSubmit = async () => {
    try {
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
            username: currentUser,
          }),
        }
      );

      const data = await res.json();
      setQuestion(data.data);
      setNewAnswer("");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // Handle upvote
  const handleUpvote = async (answerIndex) => {
    try {
      const res = await fetch(
        `http://localhost:3004/api/v1/question/upvote/${id}/${answerIndex}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username: currentUser }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setQuestion(data.data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  if (!question)
    return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <p className="text-sm text-blue-400 mb-1">
        Question &gt; {question.title.slice(0, 20)}...
      </p>
      <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
      <div className="flex gap-2 mb-2 flex-wrap">
        {question.tags.map((tag, i) => (
          <span key={i} className="bg-gray-700 px-2 py-1 text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-300 mb-4">{question.description}</p>

      <hr className="border-gray-600 my-4" />
      <h3 className="text-lg font-semibold mb-3">Answers</h3>

      {question.answers.length === 0 ? (
        <p className="text-gray-400">No answers yet. Be the first to answer!</p>
      ) : (
        question.answers.map((a, i) => {
          const hasVoted = a.voters?.includes(currentUser);
          return (
            <div key={i} className="mb-3 bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                <div className="flex items-center gap-2">
                  <span>⬆ {a.votes}</span>
                  <span>By: {a.username}</span>
                </div>
                <button
                  onClick={() => handleUpvote(i)}
                  disabled={hasVoted}
                  className={`${
                    hasVoted
                      ? "text-green-500 cursor-not-allowed"
                      : "text-blue-500 hover:underline"
                  }`}
                >
                  {hasVoted ? "Upvoted" : "Upvote"}
                </button>
              </div>
              <p>{a.anstext}</p>
            </div>
          );
        })
      )}

      <h3 className="mt-6 mb-2 font-semibold">Submit Your Answer</h3>
      <textarea
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
        rows="4"
        placeholder="Write your answer here..."
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default Ans;
