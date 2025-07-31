import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AiDebatePage() {
  const [aiResponse, setAIResponse] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [inputvalue, setinputvalue] = useState<string>("");

  const handleGetAIResponse = (inputvalue: string) => {
    if (!inputvalue.trim()) {
      setAIResponse("Please enter a valid question.");
      return;
    }
    
    setAIResponse("");
    setIsFetching(true);

    //   fetch(`${BACKEND_URL}/aichats/aichat-res`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ question: inputvalue }),
    //   })
    //     .then((response) => response.text())
    //     .then((data) => {
    //       setAIResponse(data);
    //     })
    //     .finally(() => {
    //       setIsFetching(false);
    //     });

    const encodedQuestion = encodeURIComponent(inputvalue);
    const eventSource = new EventSource(
      `${BACKEND_URL}/aichats/aichat-res?question=${encodedQuestion}`
    );

    eventSource.onmessage = (event) => {
      if (event.data === "[END]") {
        eventSource.close();
        setIsFetching(false);
        return;
      }
      setAIResponse((prev) => prev + event.data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close(); // always close on error
      setIsFetching(false);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Header */}
        <div className="mb-12">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            AI Galaxy
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-8">
            Intelligent Debate Arena
          </h2>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 mb-8">
          <div className="mb-8">
            {/* input field */}
            <input
              type="text"
              placeholder="Ask a question"
              className="w-full bg-transparent mb-5 border border-white/20 shadow-2xl shadow-amber-50 px-4 py-2 rounded-full"
              value={inputvalue}
              onChange={(e) => setinputvalue(e.target.value)}
            />

            <button
              title="get ai response"
              type="button"
              disabled={isFetching}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
                onClick={() => handleGetAIResponse(inputvalue)}
            >
              <IoIosSend size={32} className="w-10 h-10 text-white" />
            </button>

            {isFetching ? (
              <AiOutlineLoading3Quarters className="w-10 h-10 mx-auto text-white animate-spin" />
            ) : (
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                {!aiResponse
                  ? `Welcome to AI Galaxy where artificial intelligence meets human
              curiosity in the ultimate debate arena. `
                  : aiResponse}
              </p>
            )}
          </div>

          {/* Call to Action Button */}
          <div className="mt-10">
            <button
              type="button"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 text-lg shadow-lg"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Real-time AI responses powered by cutting-edge language models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
