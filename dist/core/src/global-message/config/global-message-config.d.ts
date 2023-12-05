import { GlobalMessageType } from '../models/global-message.model';
import * as i0 from "@angular/core";
export type GlobalMessageTypeConfig = {
    timeout?: number;
};
export declare abstract class GlobalMessageConfig {
    globalMessages?: {
        [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_ASSISTIVE]?: GlobalMessageTypeConfig;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalMessageConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalMessageConfig>;
}
declare module '../../config/config-tokens' {
    interface Config extends GlobalMessageConfig {
    }
}
