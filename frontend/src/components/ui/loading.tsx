import './loading.css';

interface LoadingProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'galaxy' | 'full-page';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  className?: string;
}

export default function Loading({ 
  type = 'galaxy', 
  size = 'md', 
  message = 'Loading...', 
  className = '' 
}: LoadingProps) {
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const SpinnerLoader = () => (
    <div className={`animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 ${sizeClasses[size]}`}></div>
  );

  const DotsLoader = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full loading-dot-1"></div>
      <div className="w-3 h-3 bg-cyan-500 rounded-full loading-dot-2"></div>
    </div>
  );

  const PulseLoader = () => (
    <div className={`bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse ${sizeClasses[size]}`}></div>
  );

  const GalaxyLoader = () => (
    <div className="relative">
      {/* Outer rotating ring */}
      <div className={`animate-spin rounded-full border-4 border-transparent border-t-purple-500 border-r-blue-500 ${sizeClasses[size]}`}></div>
      
      {/* Inner rotating ring */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 galaxy-inner-ring rounded-full border-2 border-transparent border-b-cyan-400 border-l-pink-400 ${
        size === 'sm' ? 'w-4 h-4' : 
        size === 'md' ? 'w-8 h-8' : 
        size === 'lg' ? 'w-12 h-12' : 'w-16 h-16'
      }`}></div>
      
      {/* Center pulse */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse ${
        size === 'sm' ? 'w-2 h-2' : 
        size === 'md' ? 'w-3 h-3' : 
        size === 'lg' ? 'w-4 h-4' : 'w-6 h-6'
      }`}></div>
    </div>
  );

  const FullPageLoader = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center z-50">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full opacity-70 star-twinkle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Galaxy logo animation */}
        <div className="relative">
          {/* Outer orbit */}
          <div className="w-32 h-32 border-2 border-purple-500/30 rounded-full galaxy-outer-orbit">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
          </div>
          
          {/* Middle orbit */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-blue-500/30 rounded-full galaxy-middle-orbit">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>
          
          {/* Inner orbit */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-pink-500/30 rounded-full galaxy-inner-orbit">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
          </div>
          
          {/* Center galaxy core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            AI Galaxy
          </h2>
          <p className="text-white/80 text-lg animate-pulse">{message}</p>
          
          {/* Progress dots */}
          <div className="flex space-x-2 justify-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full loading-dot-1"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full loading-dot-2"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full loading-dot-3"></div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (type === 'full-page') {
    return <FullPageLoader />;
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div>
        {type === 'spinner' && <SpinnerLoader />}
        {type === 'dots' && <DotsLoader />}
        {type === 'pulse' && <PulseLoader />}
        {type === 'galaxy' && <GalaxyLoader />}
      </div>
      {message && (
        <p className="text-gray-600 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
}
