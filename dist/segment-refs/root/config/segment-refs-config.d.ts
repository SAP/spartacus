import * as i0 from "@angular/core";
export declare abstract class SegmentRefsConfig {
    segmentRefs?: {
        httpHeaderName: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<SegmentRefsConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SegmentRefsConfig>;
}
declare module '@spartacus/core' {
    interface Config extends SegmentRefsConfig {
    }
}
