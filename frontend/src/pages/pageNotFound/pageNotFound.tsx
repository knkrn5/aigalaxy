import { NavLink } from "react-router";
import { useState, useEffect } from "react";

export default function PageNotFound() {
  const [animateIn, setAnimateIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Floating galaxy effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div
            className="w-96 h-96 border border-blue-500/10 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-500/10 rounded-full animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/10 rounded-full animate-spin"
            style={{ animationDuration: "10s" }}
          ></div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* 404 Number with cosmic effect */}
        <div className="relative mb-8">
          <div
            className={`text-9xl md:text-[12rem] font-black mb-4 transition-all duration-1000 delay-300 ${
              animateIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              404
            </span>
          </div>
          {/* Glow effect behind 404 */}
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black blur-3xl opacity-30">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </div>

        {/* Lost in space icon */}
        <div
          className={`mb-8 transition-all duration-1000 delay-500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main heading */}
        <h1
          className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Lost in the Galaxy
          </span>
        </h1>

        {/* Subtitle */}
        <h2
          className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-900 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          The page you're looking for has drifted into deep space
        </h2>

        {/* Description */}
        <div
          className={`space-y-4 mb-12 transition-all duration-1000 delay-1100 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            It seems like you've ventured into uncharted territory. The page
            you're seeking might have been moved, deleted, or perhaps it never
            existed in this dimension of our galaxy.
          </p>

          {/* Helpful suggestions */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-blue-400 font-semibold mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Navigation Suggestions
            </h3>
            <ul className="text-gray-300 text-sm space-y-2 text-left">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                Check the URL for any typos or errors
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Use the navigation menu to find what you're looking for
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Return to the home base and start your journey again
              </li>
            </ul>
          </div>
        </div>

        {/* Search box */}
        <div
          className={`mb-12 transition-all duration-1000 delay-1300 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-md mx-auto">
            <label className="block text-gray-400 text-sm mb-2">
              Search the Galaxy
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all duration-300"
              />
              <button
                title="Search"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <NavLink
            to="/"
            className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Return to Home Base</span>
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="group bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Go Back</span>
          </button>

          <NavLink
            to="/ai-debate"
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Explore AI Debate</span>
          </NavLink>
        </div>

        {/* Fun fact */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-1700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm inline-block">
            <p className="text-purple-400 text-sm">
              🌌 <strong>Fun Fact:</strong> There are an estimated 2 trillion
              galaxies in the observable universe, but sadly, this page isn't in
              any of them.
            </p>
          </div>
        </div>
      </div>

      {/* Floating cosmic debris */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
