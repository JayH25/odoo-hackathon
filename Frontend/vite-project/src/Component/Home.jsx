import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const navigate = useNavigate();

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
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-500 tracking-tight">
          StackIt
        </h1>

        {/* Top Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          {/* Left: Button & Filter */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAskQuestion}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ask New Question
            </button>
            <select className="bg-gray-800/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
              <option>Newest Unanswered</option>
              <option>Most Voted</option>
              <option>Oldest</option>
            </select>
          </div>

          {/* Right: Search Input */}
          <div className="relative flex items-center w-full md:w-96">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 pl-10"
            />
            <FiSearch className="absolute left-3 text-gray-400 text-xl hover:text-blue-400 transition-colors duration-200" />
          </div>
        </div>

        {/* Questions List */}
        <ul className="space-y-6">
          {currentQuestions.map((q) => (
            <li
              key={q._id}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-white mb-3">
                {q.title}
              </h2>
              <p
                className="text-gray-300 mt-2 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: q.description }}
              ></p>
              <div className="flex flex-wrap gap-2 mt-4">
                {q.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-blue-600/30 text-blue-400 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-3">
                Asked by: <span className="text-blue-400">{q.username}</span>
              </div>
              <span className="inline-block mt-3 px-3 py-1 bg-gray-700/50 text-sm text-gray-300 rounded-full">
                {q.answers} answers
              </span>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
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

