import { TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureConfigService } from '../services/feature-config.service';
import * as i0 from "@angular/core";
export declare class FeatureDirective {
    protected templateRef: TemplateRef<any>;
    protected viewContainer: ViewContainerRef;
    protected featureConfig: FeatureConfigService;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, featureConfig: FeatureConfigService);
    private hasView;
    set cxFeature(feature: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FeatureDirective, "[cxFeature]", never, { "cxFeature": "cxFeature"; }, {}, never, never, false, never>;
}
