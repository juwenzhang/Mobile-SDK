import type { DprOptions, DeviceInfo, Callback } from "../types";
import { DPR_CONFIG } from "./constant";
import { INITDATA } from "../flexiable-core";

class DprManager {
    private currentDpr: number;
    private options: Required<DprOptions>
    private resizeListener: Set<Callback<number>> = new Set();

    constructor(options: DprOptions = {}) {
        this.options = {
            forceDpr: options.forceDpr ?? DPR_CONFIG.forceDpr,
            maxDpr: options.maxDpr ?? DPR_CONFIG.maxDpr,
            minDpr: options.minDpr ?? DPR_CONFIG.minDpr,
            deviceInfo: options.deviceInfo ?? {
                os: 'unknown',
                osVersion: '0',
                deviceType: 'unknown',
                browser: 'unknown',
                browserVersion: '0',
                isTouch: false
            } as DeviceInfo,
        }

        this.currentDpr = this.calculateDpr();
        this.setupResizeListener();
    }

    private calculateDpr(): number {
        if (this.options.forceDpr) {
            return this.clampDpr(this.options.forceDpr);
        }

        const browserDpr = typeof window === 'undefined' ? (window as any).devicePixelRatio : 1;
        return this.adjustSpecialDeviceDpr(browserDpr);
    }

    /// 确保forceDpr 在指定的范围内做事
    clampDpr(dpr: number): number {
        return Math.min(this.options.maxDpr, Math.max(this.options.minDpr, dpr));
    }

    private adjustSpecialDeviceDpr(originalDpr: number): number {
        const { os, deviceType } = this.options.deviceInfo;

        if (os === 'android' && deviceType === 'mobile' && originalDpr > 2) {
            return this.clampDpr(2);
        }

        if (os === 'ios' && originalDpr > 3) {
            return this.clampDpr(3);
        }

        return this.clampDpr(originalDpr);
    }

    private setupResizeListener(): void {
        if (typeof window === 'undefined') {
            return;
        }

        const handleResize = () => {
            const newDpr = this.calculateDpr();
            if (newDpr !== this.currentDpr) {
                this.currentDpr = newDpr;
                this.resizeListener.forEach(callback => callback(newDpr));
            } 
        }

        let resizeTimer: NodeJS.Timeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(
                handleResize, INITDATA.debounceTime || 100
            );
        });
    }

    getDpr(): number {
        return this.currentDpr;
    }

    setDpr(dpr: number): void {
        const clampDpr = this.clampDpr(dpr);
        if (clampDpr !== this.currentDpr) {
            this.currentDpr = clampDpr;
            this.resizeListener.forEach(callback => callback(clampDpr));
        }
    }

    updateOptions(options: Partial<DprOptions>): void {
        this.options = {
            ...this.options,
            ...options
        }
        const newDpr = this.calculateDpr();
        if (newDpr !== this.currentDpr) {
            this.currentDpr = newDpr;
            this.resizeListener.forEach(callback => callback(newDpr));
        }
    }

    onResize(listener: Callback<number>): void {
        this.resizeListener.add(listener);
    }

    offResize(listener: Callback<number>): void {
        this.resizeListener.delete(listener);
    }
}

export default DprManager;
