import DprManager from '../dprManager';
import { OS_TYPE, DEVICE_TYPE, BROWSER_TYPE } from '../../types/device';

describe('DprManager', () => {
    beforeEach(() => {
        (window as any).devicePixelRatio = 2;
    });

    test('默认 DPR 应为浏览器默认值（2）', () => {
        const manager = new DprManager();
        expect(manager.getDpr()).toBe(2);
    });

    test('forceDpr 应覆盖默认计算', () => {
        const manager = new DprManager({ forceDpr: 3 });
        expect(manager.getDpr()).toBe(3);
    });

    test('maxDpr 应限制 DPR 上限', () => {
        (window as any).devicePixelRatio = 4;
        const manager = new DprManager({ maxDpr: 3 });
        expect(manager.getDpr()).toBe(3);
    });

    test('安卓设备应修正高 DPR', () => {
        (window as any).devicePixelRatio = 3;
        const manager = new DprManager({
        deviceInfo: {
            os: OS_TYPE.ANDROID,
            deviceType: DEVICE_TYPE.MOBILE,
            // 其他必填字段
            osVersion: '',
            browser: BROWSER_TYPE.UNKNOWN,
            browserVersion: '',
            isTouch: true
        }
        });
        // 安卓设备被修正为 2
        expect(manager.getDpr()).toBe(2);
    });
});