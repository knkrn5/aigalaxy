import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../../public/vite.svg";

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

function Home() {
  //   const [count, setCount] = useState(0);

  function getGPUInfo() {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) return "WebGL not supported";

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
  async function getHardwareInfo() {
    const concurrency = navigator.hardwareConcurrency || "Unknown";
    const memory =
      "deviceMemory" in navigator
        ? navigator.deviceMemory
        : "Unknown (or not supported)";

    const gpu = getGPUInfo();

    // Combine with UA Client Hints if needed
    let userAgentInfo: UserAgentPropTypes = {};
    if ("userAgentData" in navigator) {
      try {
        const ua = await navigator.userAgentData.getHighEntropyValues([
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
      const conn = navigator.connection;
      networkInfo = {
        downlink: conn.downlink, // Mbps
        effectiveType: conn.effectiveType, // '4g', '3g', etc.
        rtt: conn.rtt, // Round-trip time
        saveData: conn.saveData, // Data-saver mode
      };
    }

    let batteryInfo = {};
    if ("getBattery" in navigator) {
      const battery = await navigator.getBattery();
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

  // Usage
  getHardwareInfo().then(console.log);

  //   console.log(navigator);

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
          onClick={() => (window.location.href = "/ai-debate")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 mb-6 text-lg"
        >
          Go to AI Debate
        </button>
        <p className="text-gray-300 text-center">
          Edit{" "}
          <code className="bg-gray-800/50 text-cyan-400 px-2 py-1 rounded font-mono text-sm">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>

      <p className="text-gray-400 text-center max-w-md leading-relaxed">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Home;
