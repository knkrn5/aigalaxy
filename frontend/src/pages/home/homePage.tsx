import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../../components/ui/loading";
import "./homePage.css";
import { getHardwareInfo } from "../../utils/getHardwareInfo";
import type { DeviceInfo } from "../../utils/getHardwareInfo";

function Home() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeviceInfo, setShowDeviceInfo] = useState<boolean>(false);

  // Usage - fetch device info on component mount
  useEffect(() => {
    getHardwareInfo().then((info) => {
      setDeviceInfo(info);
      setLoading(false);
    });
  }, []);

  //   console.log(navigator);

  return (
    <div className="min-h-screen nebula-bg relative overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Floating cosmic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute cosmic-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Main galaxy center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Galaxy core */}
        <div className="galaxy-core relative">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-xl opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full opacity-90"></div>
        </div>

        {/* Galaxy rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="galaxy-ring-1 w-64 h-64 border border-purple-400/30 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="galaxy-ring-2 w-80 h-80 border border-blue-400/20 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="galaxy-ring-3 w-96 h-96 border border-cyan-400/10 rounded-full"></div>
        </div>

        {/* Orbiting planets */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="planet-orbit-1">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="planet-orbit-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg"></div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="planet-orbit-3">
            <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">

        {/* Main title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black mb-6 shimmer-text">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              AI GALAXY
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore the infinite possibilities of artificial intelligence in our
            cosmic digital universe
          </p>
        </div>

        {/* Navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl w-full">
          {/* AI Debate Card */}
          <div className="galaxy-card bg-gradient-to-br from-purple-500/20 to-blue-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">AI Debate</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Engage in intelligent conversations and debates with advanced AI
              systems. Experience the future of dialogue.
            </p>
            <NavLink
              to="/ai-debate"
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Launch Debate
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </NavLink>
          </div>

          {/* Device Scanner Card */}
          <div className="galaxy-card bg-gradient-to-br from-cyan-500/20 to-green-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Device Scanner</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover comprehensive information about your device, browser, and
              system capabilities.
            </p>
            <button
              onClick={() => setShowDeviceInfo(!showDeviceInfo)}
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-green-600 hover:from-cyan-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {showDeviceInfo ? "Hide" : "Scan"} Device
              <svg
                className="w-5 h-5 ml-2"
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

          {/* Galaxy Explorer Card */}
          <div className="galaxy-card bg-gradient-to-br from-pink-500/20 to-red-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Explore Universe
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Journey through our digital galaxy and discover new frontiers of
              artificial intelligence.
            </p>
            <button className="inline-flex items-center bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl opacity-60 cursor-not-allowed">
              Coming Soon
              <svg
                className="w-5 h-5 ml-2"
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
            </button>
          </div>
        </div>

        {/* Device Information Dashboard */}
        {loading ? (
          <Loading
            type="galaxy"
            size="xl"
            message="Scanning cosmic frequencies..."
          />
        ) : (
          showDeviceInfo && (
            <div className="w-full max-w-7xl">
              <h2 className="text-3xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Cosmic Device Analysis
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* All your existing device info cards */}
                {/* Screen Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Screen & Display
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Resolution:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.screen?.width} ×{" "}
                        {deviceInfo?.screen?.height}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Color Depth:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.screen?.colorDepth} bit
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Pixel Ratio:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.screen?.devicePixelRatio}x
                      </span>
                    </div>
                  </div>
                </div>

                {/* Device Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Device Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Platform:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.device?.platform}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Mobile:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.device?.mobile ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Brand:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.device?.brand}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Model:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.device?.model}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CPU Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    CPU & Memory
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Logical Cores:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.cpu?.logicalCores}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Architecture:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.cpu?.architecture}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Memory:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.memory?.approximateGB} GB
                      </span>
                    </div>
                  </div>
                </div>

                {/* GPU Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Graphics (GPU)
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Vendor:</span>
                      <span className="text-white font-mono text-xs">
                        {deviceInfo?.gpu?.vendor || "Unknown"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-300 mb-1">Renderer:</span>
                      <span className="text-white font-mono text-xs break-all">
                        {deviceInfo?.gpu?.renderer || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Network
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Type:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.networkInfo?.effectiveType || "Unknown"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Downlink:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.networkInfo?.downlink || "Unknown"} Mbps
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">RTT:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.networkInfo?.rtt || "Unknown"} ms
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Data Saver:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.networkInfo?.saveData ? "On" : "Off"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Battery Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Battery Status
                  </h3>
                  <div className="space-y-3 text-sm">
                    {deviceInfo?.batteryInfo?.level !== undefined ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Level:</span>
                          <span className="text-white font-mono">
                            {Math.round(
                              (deviceInfo?.batteryInfo?.level || 0) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Charging:</span>
                          <span className="text-white font-mono">
                            {deviceInfo?.batteryInfo?.charging ? "Yes" : "No"}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (deviceInfo?.batteryInfo?.level || 0) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 text-center">
                        Battery API not supported
                      </div>
                    )}
                  </div>
                </div>

                {/* Locale Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 md:col-span-2 lg:col-span-1">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Locale & Language
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Language:</span>
                      <span className="text-white font-mono">
                        {deviceInfo?.locale?.language}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Timezone:</span>
                      <span className="text-white font-mono text-xs">
                        {deviceInfo?.locale?.timezone}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-300 mb-1">
                        Supported Languages:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {deviceInfo?.locale?.languages
                          ?.slice(0, 3)
                          .map((lang: string, index: number) => (
                            <span
                              key={index}
                              className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs"
                            >
                              {lang}
                            </span>
                          ))}
                        {deviceInfo?.locale?.languages &&
                          deviceInfo.locale.languages.length > 3 && (
                            <span className="text-gray-400 text-xs">
                              +{deviceInfo.locale.languages.length - 3} more
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Browser Information */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 md:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    Browser Versions
                  </h3>
                  <div className="space-y-2 text-sm max-h-32 overflow-y-auto">
                    {deviceInfo?.device?.fullVersionList &&
                    deviceInfo.device.fullVersionList.length > 0 ? (
                      deviceInfo?.device?.fullVersionList?.map(
                        (
                          browser: { brand: string; version: string },
                          index: number
                        ) => (
                          <div
                            key={index}
                            className="flex justify-between py-1 border-b border-white/10 last:border-b-0"
                          >
                            <span className="text-gray-300">
                              {browser.brand}:
                            </span>
                            <span className="text-white font-mono text-xs">
                              {browser.version}
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <div className="text-gray-400 text-center">
                        Browser version info not available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
