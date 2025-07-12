import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("Filter");
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

    fetchQuestions();
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleAskQuestion = () => {
    navigate("/addNewQuestion");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuestions = questions
    .filter((q) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        q.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        q.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        q.username.toLowerCase().includes(lowerCaseSearchTerm) ||
        q.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchTerm))
      );
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0; // No sorting for "Filter"
    });

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-6 sm:mb-8 md:mb-10 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient px-4">
          StackIt
        </h1>

        {/* Top Actions */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 sm:mb-8 md:mb-10 gap-4">
          {/* Left: Button & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
            <button
              onClick={handleAskQuestion}
              className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/25 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/30 w-full sm:w-auto text-center"
            >
              <span className="relative z-10">Ask New Question</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 w-full sm:w-auto"
            >
              <option value="Filter">Filter</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full md:w-96 group">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full bg-[#1a1a1a] text-white px-5 py-3 pl-12 rounded-xl border border-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-purple-400 transition-colors duration-200" />
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, index) => (
              <div
                key={q._id}
                className="group bg-gradient-to-br from-[#1a1a1a] to-[#151515] p-4 sm:p-6 rounded-2xl border border-gray-800/50 shadow-xl transform transition-all duration-200 hover:border-gray-700/50"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight break-words">
                  {q.title}
                </h2>

                <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2 text-sm sm:text-base">
                  {q.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {q.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-900/20 to-blue-900/20 text-purple-300 text-xs sm:text-sm rounded-full border border-purple-800/30 backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="text-xs sm:text-sm text-gray-500">
                    <span className="text-gray-400">Asked by</span>{" "}
                    <span className="text-purple-400 font-medium">
                      {q.username}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/answer/${q._id}`)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg text-xs sm:text-sm font-medium text-gray-300 transform transition-all duration-200 hover:scale-[1.02] hover:from-gray-700 hover:to-gray-600 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <span className="text-lg sm:text-2xl leading-none">💬</span>
                    <span>{q.answers.length} answers</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 sm:py-20 px-4">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg sm:text-xl">
                No questions found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
