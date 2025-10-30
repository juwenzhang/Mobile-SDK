import { detectDeviceInfo } from '../detector';
import { OS_TYPE, DEVICE_TYPE, BROWSER_TYPE } from '../../types/device';

// 模拟 navigator.userAgent
describe('device detector', () => {
    const originalUA = navigator.userAgent;

    afterEach(() => {
        Object.defineProperty(navigator, 'userAgent', {
            value: originalUA,
            configurable: true
        });
    });

    test('应检测 iOS 设备', () => {
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
            configurable: true
        });
        const info = detectDeviceInfo();
        expect(info.os).toBe(OS_TYPE.IOS);
        expect(info.osVersion).toBe('16');
        expect(info.deviceType).toBe(DEVICE_TYPE.MOBILE);
        expect(info.isTouch).toBe(true);
    });

    test('应检测安卓设备', () => {
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
            configurable: true
        });
        const info = detectDeviceInfo();
        expect(info.os).toBe(OS_TYPE.ANDROID);
        expect(info.osVersion).toBe('13');
        expect(info.browser).toBe(BROWSER_TYPE.CHROME);
    });

    test('应检测微信浏览器', () => {
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) MicroMessenger/8.0.30 NetType/WIFI Language/zh_CN',
            configurable: true
        });
        const info = detectDeviceInfo();
        expect(info.browser).toBe(BROWSER_TYPE.WECHAT);
        expect(info.browserVersion).toBe('8');
    });
});