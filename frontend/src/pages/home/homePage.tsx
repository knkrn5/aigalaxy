import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../../components/ui/loading";

interface UserAgentPropTypes {
  brand: string;
  model: string;
  mobile: boolean;
  platform: string;
  platformVersion: string;
  fullVersionList: Array<{ brand: string; version: string }>;
  architecture?: string;
  bitness?: string;
}

interface UserAgentData {
  getHighEntropyValues(hints: string[]): Promise<UserAgentPropTypes>;
}

interface NetworkPropTypes {
  downlink: number;
  effectiveType: string;
  rtt: number;
  saveData: boolean;
}

interface BatteryPropTypes {
  charging: boolean;
  level: number; // 0 to 1
  chargingTime: number;
  dischargingTime: number;
}

interface DeviceInfo {
  screen: {
    width: number;
    height: number;
    colorDepth: number;
    pixelDepth: number;
    devicePixelRatio: number;
  };
  locale: {
    language: string;
    languages: readonly string[];
    timezone: string;
  };
  device: {
    model: string;
    mobile: boolean;
    brand: string;
    platform: string;
    platformVersion: string;
    fullVersionList: Array<{ brand: string; version: string }>;
  };
  memory: {
    approximateGB: number | string;
  };
  cpu: {
    logicalCores: number | string;
    architecture: string;
    bitness: string;
  };
  gpu: {
    vendor: string;
    renderer: string;
  };
  networkInfo: {
    downlink?: number;
    effectiveType?: string;
    rtt?: number;
    saveData?: boolean;
  };
  batteryInfo: {
    charging?: boolean;
    level?: number;
    chargingTime?: number;
    dischargingTime?: number;
  };
}

function getGPUInfo(): { vendor: string; renderer: string } {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) return { vendor: "Unknown", renderer: "Unknown" };

  const debugInfo = (gl as WebGLRenderingContext).getExtension(
    "WEBGL_debug_renderer_info"
  );
  if (debugInfo) {
    const renderer = (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    );
    const vendor = (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_VENDOR_WEBGL
    );
    return { vendor, renderer };
  }

  return {
    vendor: "Unknown (WebGL vendor info restricted)",
    renderer: "Unknown",
  };
}

// hardware data
async function getHardwareInfo(): Promise<DeviceInfo> {
  const concurrency = navigator.hardwareConcurrency || "Unknown";
  const memory =
    "deviceMemory" in navigator
      ? (navigator.deviceMemory as number)
      : "Unknown (or not supported)";

  const gpu = getGPUInfo();

  // Combine with UA Client Hints if needed
  let userAgentInfo: UserAgentPropTypes = {
    brand: "Unknown",
    model: "Unknown",
    mobile: false,
    platform: "Unknown",
    platformVersion: "Unknown",
    fullVersionList: [],
  };

  if ("userAgentData" in navigator && navigator.userAgentData) {
    try {
      const ua = await (
        navigator.userAgentData as UserAgentData
      ).getHighEntropyValues([
        "model",
        "brand",
        "mobile",
        "platform",
        "platformVersion",
        "fullVersionList",
        "architecture",
        "bitness",
      ]);
      userAgentInfo = ua;
    } catch (e) {
      console.warn("Could not get UA high-entropy values:", e);
    }
  }

  let networkInfo = {};
  if ("connection" in navigator) {
    const conn = navigator.connection as NetworkPropTypes;
    networkInfo = {
      downlink: conn.downlink, // Mbps
      effectiveType: conn.effectiveType, // '4g', '3g', etc.
      rtt: conn.rtt, // Round-trip time
      saveData: conn.saveData, // Data-saver mode
    };
  }

  let batteryInfo = {};
  if ("getBattery" in navigator) {
    const battery = await (
      navigator.getBattery as () => Promise<BatteryPropTypes>
    )();
    batteryInfo = {
      charging: battery.charging,
      level: battery.level, // 0 to 1
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
    };
  }

  return {
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      devicePixelRatio: window.devicePixelRatio,
    },
    locale: {
      language: navigator.language,
      languages: navigator.languages,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    device: {
      model: userAgentInfo.model || "Unknown",
      mobile: userAgentInfo.mobile || false,
      brand: userAgentInfo.brand || "Unknown",
      platform: userAgentInfo.platform || "Unknown",
      platformVersion: userAgentInfo.platformVersion || "Unknown",
      fullVersionList: userAgentInfo.fullVersionList || [],
    },
    memory: {
      approximateGB: memory,
    },
    cpu: {
      logicalCores: concurrency,
      architecture: userAgentInfo.architecture || "Unknown",
      bitness: userAgentInfo.bitness || "Unknown",
    },
    gpu,
    networkInfo,
    batteryInfo,
  };
}

function Home() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  // Usage - fetch device info on component mount
  useEffect(() => {
    getHardwareInfo().then((info) => {
      setDeviceInfo(info);
      setLoading(false);
    });
  }, []);

  //   console.log(navigator);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-8 mb-8">
        <img
          src={viteLogo}
          className="h-16 w-16 drop-shadow-2xl group-hover:drop-shadow-[0_0_2em_#646cffaa] transition-all duration-300"
          alt="Vite logo"
        />
        <img
          src={reactLogo}
          className="h-16 w-16 drop-shadow-2xl group-hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow transition-all duration-300"
          alt="React logo"
        />
      </div>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-8 text-center">
        Device Information Dashboard
      </h1>

      {loading ? (
        <Loading 
          type="full-page" 
          message="Scanning your device information..." 
        />
      ) : (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  {deviceInfo?.screen?.width} × {deviceInfo?.screen?.height}
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
                      {Math.round((deviceInfo?.batteryInfo?.level || 0) * 100)}%
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
                <span className="text-gray-300 mb-1">Supported Languages:</span>
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
                  {deviceInfo?.locale?.languages && deviceInfo.locale.languages.length > 3 && (
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
              {deviceInfo?.device?.fullVersionList && deviceInfo.device.fullVersionList.length > 0 ? (
                deviceInfo?.device?.fullVersionList?.map(
                  (
                    browser: { brand: string; version: string },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex justify-between py-1 border-b border-white/10 last:border-b-0"
                    >
                      <span className="text-gray-300">{browser.brand}:</span>
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
      )}

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
        <NavLink
          to="/ai-debate"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 text-lg inline-block"
        >
          Go to AI Debate
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
