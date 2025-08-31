import { useState, useEffect } from "react";
import { FaRepeat } from "react-icons/fa6";
import "./appAccessDenied.css";

export default function AccessDenied() {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 auth-denied-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Warning rings animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-96 h-96 border-2 border-red-500/20 rounded-full auth-denied-warning-ring-1"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-orange-500/30 rounded-full auth-denied-warning-ring-2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-yellow-500/40 rounded-full auth-denied-warning-ring-3"></div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Lock icon with warning effect */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          {/* Warning glow effect */}
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Error code */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 font-mono text-sm backdrop-blur-sm">
            ERROR 403
          </span>
        </div>

        {/* Main heading */}
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 delay-300 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Access Denied
          </span>
        </h1>

        {/* Subtitle */}
        <h2
          className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Galaxy Security Protocol Activated
        </h2>

        {/* Description */}
        <div
          className={`space-y-4 mb-12 transition-all duration-1000 delay-700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-gray-400 text-lg leading-relaxed">
            Your request has been intercepted by our advanced security systems.
            You don't have the required permissions to access this sector of the
            galaxy.
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div className="text-left">
                <p className="text-red-400 font-medium">
                  Authentication Required
                </p>
                <p className="text-gray-400 text-sm">
                  Please contact your system administrator or try logging in
                  with proper credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mx-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center space-x-2 cursor-pointer"
        >
          <FaRepeat className="w-5 h-5" />
          <span>Retry</span>
        </button>

        {/* Additional help text */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-1200 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-gray-500 text-sm">
            Need help? Contact support at{" "}
            <a
              href="mailto:support@aigalaxy.tech"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@aigalaxy.tech
            </a>
          </p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="auth-denied-particle absolute w-2 h-2 bg-red-400/30 rounded-full "
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
