import { TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureConfigService } from '../services/feature-config.service';
import * as i0 from "@angular/core";
export declare class FeatureLevelDirective {
    protected templateRef: TemplateRef<any>;
    protected viewContainer: ViewContainerRef;
    protected featureConfig: FeatureConfigService;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, featureConfig: FeatureConfigService);
    private hasView;
    set cxFeatureLevel(level: string | number);
    static ɵfac: i0.ɵɵFactoryDeclaration<FeatureLevelDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FeatureLevelDirective, "[cxFeatureLevel]", never, { "cxFeatureLevel": "cxFeatureLevel"; }, {}, never, never, false, never>;
}
