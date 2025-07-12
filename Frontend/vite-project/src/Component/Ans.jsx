import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Ans = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");

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
          username: "Proud Coyote", // Replace with dynamic username
        }),
      }
    );

    const data = await res.json();
    setQuestion(data.data);
    setNewAnswer("");
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <p className="text-sm text-blue-400 mb-1">
        Question &gt; {question.title.slice(0, 20)}...
      </p>
      <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
      <div className="flex gap-2 mb-2">
        {question.tags.map((tag, i) => (
          <span key={i} className="bg-gray-700 px-2 py-1 text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-300 mb-4">{question.description}</p>

      <hr className="border-gray-600 my-4" />
      <h3 className="text-lg font-semibold mb-3">Answers</h3>

      {question.answers.map((a, i) => (
        <div key={i} className="mb-3 bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <span>⬆ {a.votes}</span>
            <span>By: {a.username}</span>
          </div>
          <p>{a.anstext}</p>
        </div>
      ))}

      <h3 className="mt-6 mb-2 font-semibold">Submit Your Answer</h3>
      <textarea
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg"
        rows="4"
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
