import { useState, useEffect } from "react";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "http://localhost:3004/api/v1/question/getques",
          {
            credentials: "include",
          }
        );
        const response = await res.json();
        setQuestions(response.message || []); // Assuming your backend sends data in `message`
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">All Questions</h1>
      <ul className="w-full max-w-3xl space-y-4">
        {questions.map((q) => (
          <li key={q._id} className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-semibold">{q.title}</h2>
            <p className="text-gray-700">{q.description}</p>
            <div className="text-sm text-blue-500 mt-2">
              Tags: {q.tags.join(", ")}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Asked by: {q.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
