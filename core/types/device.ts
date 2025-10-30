export const  OS_TYPE = {
    IOS: 'ios',
    ANDROID: 'android',
    WINDOWS: 'windows',
    MACOS: 'macos',
    LINUX: 'liunx',
    UNKNOWN: 'unknown',
} as const;

export const DEVICE_TYPE = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    PC: 'pc',
    TV: 'tv',
    UNKNOWN: 'unknown',
} as const;

/// 这里就不考虑 IE 了，他还是滚一边去吧
export const BROWSER_TYPE = {
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    SAFARI: 'safari',
    EDGE: 'edge',
    OPERA: 'opera',
    WECHAT: 'micromessenger',  // 待确认
    UNKNOWN: 'unknown'
} as const;

export interface DeviceInfo {
    os: (typeof OS_TYPE)[keyof typeof OS_TYPE];
    osVersion: string,
    deviceType: (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE],
    browser: (typeof BROWSER_TYPE)[keyof typeof BROWSER_TYPE],
    browserVersion: string,
    isTouch: boolean,
    [key: string]: any
}

export interface DprOptions {
    forceDpr?: number;
    maxDpr?: number;
    minDpr?: number;
    deviceInfo?: DeviceInfo
}
