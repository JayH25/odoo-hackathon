import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // ✅ Search icon

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/v1/question/getques", {
          credentials: "include",
        });
        const response = await res.json();
        setQuestions(response.message || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3004/api/v1/user/me", {
          method: "GET",
          credentials: "include",
        });
        setIsAuthenticated(res.ok);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    fetchQuestions();
    checkAuth();
  }, []);

  const handleAskQuestion = () => {
    navigate(isAuthenticated ? "/addNewQuestion" : "/login");
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#ff2400]">StackIt</h1>

        {/* Top Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Left: Button & Filter */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAskQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Ask New Question
            </button>
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700">
              <option>Newest Unanswered</option>
              <option>Most Voted</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Right: Search Input */}
          <div className="flex gap-2 items-center w-full md:w-96">
            <input
              type="text"
              placeholder="Search questions..."
              className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="text-white text-2xl cursor-pointer hover:text-blue-400" />
          </div>
        </div>

        {/* Questions List */}
        <ul className="space-y-6">
          {currentQuestions.map((q) => (
            <li
              key={q._id}
              className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-white">{q.title}</h2>
              <p className="text-gray-300 mt-2">{q.description}</p>
              <div className="text-sm text-blue-400 mt-3">Tags: {q.tags.join(", ")}</div>
              <div className="text-xs text-gray-500 mt-1">Asked by: {q.username}</div>
              <span className="inline-block mt-2 px-2 py-1 bg-gray-700 text-sm rounded-full">
                {q.answers} answers
              </span>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                } transition duration-300`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
