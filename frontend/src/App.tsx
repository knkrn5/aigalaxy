import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-8 mb-12">
        <a 
          href="https://vite.dev" 
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform hover:scale-110 duration-300"
        >
          <img 
            src={viteLogo} 
            className="h-24 w-24 drop-shadow-2xl group-hover:drop-shadow-[0_0_2em_#646cffaa] transition-all duration-300" 
            alt="Vite logo" 
          />
        </a>
        <a 
          href="https://react.dev" 
          target="_blank"
          rel="noopener noreferrer"
          className="group transition-transform hover:scale-110 duration-300"
        >
          <img 
            src={reactLogo} 
            className="h-24 w-24 drop-shadow-2xl group-hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow transition-all duration-300" 
            alt="React logo" 
          />
        </a>
      </div>
      
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-12 text-center">
        Vite + React
      </h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 mb-6 text-lg"
        >
          Count is {count}
        </button>
        <p className="text-gray-300 text-center">
          Edit <code className="bg-gray-800/50 text-cyan-400 px-2 py-1 rounded font-mono text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="text-gray-400 text-center max-w-md leading-relaxed">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
