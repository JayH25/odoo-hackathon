import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

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
        // Assuming response.message is an array of questions
        setQuestions(response.message || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  const handleAskQuestion = () => {
    navigate("/addNewQuestion");
  };

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered questions based on search term
  const filteredQuestions = questions.filter((q) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      q.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#ff2400]">
          StackIt
        </h1>

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
              value={searchTerm} // Controlled component
              onChange={handleSearchChange} // Handle input changes
            />
            {/* The search icon is purely decorative here, as typing in the input already filters */}
            <FiSearch className="text-white text-2xl cursor-pointer hover:text-blue-400" />
          </div>
        </div>

        {/* Questions List */}
        <ul className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <li
                key={q._id}
                className="bg-gray-800 p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-white">{q.title}</h2>
                <p className="text-gray-300 mt-2">{q.description}</p>
                <div className="text-sm text-blue-400 mt-3">
                  Tags: {q.tags.join(", ")}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Asked by: {q.username}
                </div>
                <button
                  onClick={() => navigate(`/answer/${q._id}`)}
                  className="mt-2" // Added some margin for the button
                >
                  <span className="inline-block px-2 py-1 bg-gray-700 text-sm rounded-full">
                    {q.answers.length} answers
                  </span>
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg mt-10">
              No questions found matching your search.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;