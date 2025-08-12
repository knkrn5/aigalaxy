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

export interface DeviceInfo {
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
export async function getHardwareInfo(): Promise<DeviceInfo> {
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