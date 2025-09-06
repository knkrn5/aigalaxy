import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NavLink } from "react-router";
import ReactMarkdown from "react-markdown";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AiDebatePage() {
  const [aiResponse, setAIResponse] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [inputvalue, setinputvalue] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  // const [bufferedResponse, setBufferedResponse] = useState("");

  const md = `# Sample Markdown
This is a **bold** text and this is an *italic* text.`;

  const handleGetAIResponse = (inputvalue: string) => {
    if (!inputvalue.trim()) {
      setAIResponse("Please enter a valid question.");
      return;
    }

    setAIResponse("");
    setIsFetching(true);

    fetch(`${BACKEND_URL}/aichats/aichat-res-direct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: inputvalue, model: selectedModel }),
    })
      .then((response) => response.text())
      .then((data) => {
        setAIResponse(data);
        console.log(data);
      })
      .finally(() => setIsFetching(false));

    /* fetch(`${BACKEND_URL}/aichats/aichat-res-manu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: inputvalue, model: selectedModel }),
    }).then((response) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      function readStream() {
        reader?.read().then(({ value, done }) => {
          if (done) {
            setIsFetching(false);
            return;
          }
          const chunk = decoder.decode(value);

          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              // const message = line.slice(6);
              const message = line.replace(/^data: /, "");
              setAIResponse((prev) => prev + message);
            }
          }

          readStream();
        });

        setinputvalue("");
      }
      readStream();
    }); */

    /* const evtSource = new EventSource(
      `${BACKEND_URL}/aichats/aichat-res-auto?question=${inputvalue}&model=${selectedModel}`
    );

    evtSource.onmessage = (e) => {
      if (e.data === "[DONE]") {
        evtSource.close();
        setIsFetching(false);
        return;
      }
      setAIResponse((prev) => prev + e.data);

    };

    evtSource.onerror = (err) => {
      setAIResponse(
        `EventSource failed: ${
          err instanceof Error ? err.message : JSON.stringify(err)
        }`
      );
      evtSource.close();
      setIsFetching(false);
    }; */
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
            {/* model selection */}
            {[
              "qwen/qwq-32b",
              "nvidia/llama-3.1-nemotron-70b-instruct",
              "google/gemma-3-1b-it",
              "openai/gpt-oss-20b",
              "sarvamai/sarvam-m",
            ].map((model, i) => {
              return (
                <label key={i} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="model"
                    value={model}
                    className="mr-2"
                    checked={selectedModel === model}
                    onChange={() => setSelectedModel(model)}
                  />
                  {model}
                </label>
              );
            })}
            {/* input field */}
            <textarea
              placeholder="Ask a question"
              className="w-full bg-transparent mb-5 border border-white/20 shadow-2xl shadow-amber-50 px-4 py-2 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
              value={inputvalue}
              onChange={(e) => setinputvalue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isFetching && inputvalue.trim()) {
                  handleGetAIResponse(inputvalue);
                }
              }}
              disabled={isFetching}
            />

            <button
              title="get ai response"
              type="button"
              disabled={isFetching || !inputvalue.trim()}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100"
              onClick={() => handleGetAIResponse(inputvalue)}
            >
              {isFetching ? (
                <AiOutlineLoading3Quarters className="w-10 h-10 text-white animate-spin" />
              ) : (
                <IoIosSend size={32} className="w-10 h-10 text-white" />
              )}
            </button>

            {isFetching ? (
              <div className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <AiOutlineLoading3Quarters className="w-6 h-6 text-cyan-400 animate-spin" />
                  <span>AI is thinking...</span>
                </div>
                {aiResponse && (
                  <div className="max-w-none text-left prose prose-invert bg-gray-800/30 rounded-lg p-6">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  </div>
                  // <div className="text-left prose prose-invert max-w-none bg-gray-800/30 rounded-lg p-4 [&_li]:my-1 [&_p]:my-2">
                  //   <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  // </div>
                )}
              </div>
            ) : (
              <div className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                {!aiResponse ? (
                  <p className="text-center">
                    Welcome to AI Galaxy where artificial intelligence meets
                    human curiosity in the ultimate debate arena.
                  </p>
                ) : (
                  <div className="max-w-none text-left prose prose-invert bg-gray-800/30 rounded-lg p-6">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  </div>
                  // <div className="text-left prose prose-invert max-w-none bg-gray-800/30 rounded-lg p-4 [&_li]:my-1 [&_p]:my-2">
                  //   <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  // </div>
                )}
              </div>
            )}
          </div>

          {/* Call to Action Button */}
          <div className="mt-10">
            <NavLink
              to="/"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 text-lg shadow-lg"
            >
              Go Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
