import { OS_TYPE, DEVICE_TYPE, BROWSER_TYPE } from "../types";

type _OS_TYPE = (typeof OS_TYPE)[keyof typeof OS_TYPE];
type _BROWSER_TYPE = (typeof BROWSER_TYPE)[keyof typeof BROWSER_TYPE];
type _DEVICE_TYPE = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

/// 类名与设备类型映射关系，此时添加 os- 前缀吧
export const OS_CLASS_MAPPING: Record<_OS_TYPE, string> = {
    [OS_TYPE.IOS]: 'os-ios',
    [OS_TYPE.ANDROID]: 'os-android',
    [OS_TYPE.WINDOWS]: 'os-windows',
    [OS_TYPE.MACOS]: 'os-macos',
    [OS_TYPE.LINUX]: 'os-linux',
    [OS_TYPE.UNKNOWN]: 'os-unknown'
};

/// 类名与设备类型映射关系，此时添加 device- 前缀吧
export const DEVICE_TYPE_CLASS_MAPPING: Record<_DEVICE_TYPE, string> = {
    [DEVICE_TYPE.MOBILE]: 'device-mobile',
    [DEVICE_TYPE.TABLET]: 'device-tablet',
    [DEVICE_TYPE.PC]: 'device-pc',
    [DEVICE_TYPE.TV]: 'device-tv',
    [DEVICE_TYPE.UNKNOWN]: 'device-unknown'
};

/// 类名与浏览器类型映射关系，此时添加 browser- 前缀吧
export const BROWSER_CLASS_MAPPING: Record<_BROWSER_TYPE, string> = {
    [BROWSER_TYPE.CHROME]: 'browser-chrome',
    [BROWSER_TYPE.SAFARI]: 'browser-safari',
    [BROWSER_TYPE.FIREFOX]: 'browser-firefox',
    [BROWSER_TYPE.EDGE]: 'browser-edge',
    [BROWSER_TYPE.WECHAT]: 'browser-wechat',
    [BROWSER_TYPE.OPERA]: 'browser-opera',
    [BROWSER_TYPE.UNKNOWN]: 'browser-unknown'
};

/// 特殊的标识处理
export const SPECIAL_CLASS_MAPPING = {
    touch: 'support-touch',
    noTouch: 'no-support-touch'
};

