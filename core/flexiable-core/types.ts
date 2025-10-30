import { AdaptMode } from "../types";

export interface FlexibleConfig {
    adaptMode: (typeof AdaptMode)[keyof typeof AdaptMode];
    remBaseRatio?: number;
    vwDesignWidth?: number;
    minFontSize?: number;
    maxFontSize?: number;
    resizeDebounceTime?: number;
    classType?: string;
    dpr?: number;
    onResize?: () => void;
}

export interface FlexibleInstance {
    config: FlexibleConfig;
    init: () => void;
    setConfig: (config: Partial<FlexibleConfig>) => void;
    getRootFontSize: () => number;
    destroy: () => void;
}
