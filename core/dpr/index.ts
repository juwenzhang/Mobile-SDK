import DprManager from "./dprManager";
import { DprOptions, Callback } from "../types";

const defaultDprManager = new DprManager();

export const getDPR = (): number => defaultDprManager.getDpr();
export const setDPR = (dpr: number): void => defaultDprManager.setDpr(dpr);
export const updateDprOptions = (options: Partial<DprOptions>): void => defaultDprManager.updateOptions(options);
export const onDprChange = (listener: Callback<number>): void => defaultDprManager.onResize(listener);
export const offDprChange = (listener: Callback<number>): void => defaultDprManager.offResize(listener);

// export const updateGlobalClassType = (dpr: number): void => defaultDprManager.updateGlobalClassType(dpr);
export const updateGlobalDpr = (dpr: number): void => defaultDprManager.setDpr(dpr);

export {
    DprManager,
    defaultDprManager
}
export default defaultDprManager