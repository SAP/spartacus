import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { I18nModule, ConfigModule } from '@spartacus/core';
import * as i3 from '@spartacus/cdc/root';
import * as i1 from '@spartacus/storefront';
import { distinctUntilChanged, tap, take } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class GigyaRaasComponent {
    constructor(component, baseSiteService, languageService, cdcConfig, winRef, cdcJSService, zone) {
        this.component = component;
        this.baseSiteService = baseSiteService;
        this.languageService = languageService;
        this.cdcConfig = cdcConfig;
        this.winRef = winRef;
        this.cdcJSService = cdcJSService;
        this.zone = zone;
        this.renderScreenSet = true;
    }
    ngOnInit() {
        this.jsLoaded$ = this.cdcJSService.didLoad();
        this.jsError$ = this.cdcJSService.didScriptFailToLoad();
        this.language$ = this.languageService.getActive().pipe(distinctUntilChanged(), 
        // On language change we want to rerender CDC screen with proper translations
        tap(() => (this.renderScreenSet = true)));
    }
    /**
     * Display screen set in embed mode
     *
     * @param data - GigyaRaasComponentData
     * @param lang - language
     */
    displayScreenSet(data, lang) {
        if (this.renderScreenSet) {
            this.showScreenSet(data, lang);
        }
        this.renderScreenSet = false;
    }
    /**
     * Show screen set
     *
     * @param data - GigyaRaasComponentData
     * @param lang - language
     */
    showScreenSet(data, lang) {
        this.winRef.nativeWindow?.['gigya']?.accounts?.showScreenSet({
            screenSet: data.screenSet,
            startScreen: data.startScreen,
            lang,
            ...(this.displayInEmbedMode(data)
                ? { containerID: data.containerID }
                : {}),
            ...(this.isLoginScreenSet(data)
                ? { sessionExpiration: this.getSessionExpirationValue() }
                : {
                    onAfterSubmit: (...params) => {
                        this.zone.run(() => this.cdcJSService.onProfileUpdateEventHandler(...params));
                    },
                }),
        });
    }
    isLoginScreenSet(data) {
        const profileEditScreen = data.profileEdit === 'true' ? true : false;
        return !profileEditScreen;
    }
    getSessionExpirationValue() {
        if (this.cdcConfig?.cdc !== undefined) {
            const filteredConfigs = this.cdcConfig.cdc.filter((conf) => conf.baseSite === this.getCurrentBaseSite());
            if (filteredConfigs && filteredConfigs.length > 0) {
                return filteredConfigs[0].sessionExpiration;
            }
        }
        // Return a default value
        return 3600;
    }
    getCurrentBaseSite() {
        let baseSite = '';
        this.baseSiteService
            .getActive()
            .pipe(take(1))
            .subscribe((data) => (baseSite = data));
        return baseSite;
    }
    /**
     * Check if the component should be displayed in embed mode
     *
     * @param data - GigyaRaasComponentData
     */
    displayInEmbedMode(data) {
        const embedValue = data.embed === 'true' ? true : false;
        if (embedValue && data.containerID && data.containerID.length > 0) {
            return true;
        }
        return false;
    }
}
GigyaRaasComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.BaseSiteService }, { token: i2.LanguageService }, { token: i3.CdcConfig }, { token: i2.WindowRef }, { token: i3.CdcJsService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
GigyaRaasComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: GigyaRaasComponent, selector: "cx-gigya-raas", ngImport: i0, template: "<div *ngIf=\"component.data$ | async as data\">\n  <div *ngIf=\"jsLoaded$ | async\">\n    <div *ngIf=\"language$ | async as lang\">\n      <div\n        *ngIf=\"displayInEmbedMode(data); else popupLink\"\n        [attr.id]=\"data.containerID\"\n      >\n        {{ displayScreenSet(data, lang) }}\n      </div>\n      <ng-template #popupLink>\n        <a\n          class=\"popup-link\"\n          [attr.data-cdc-id]=\"data.uid\"\n          [attr.data-profile-edit]=\"data.profileEdit\"\n          (click)=\"showScreenSet(data, lang)\"\n          >{{ data.linkText }}</a\n        >\n      </ng-template>\n    </div>\n  </div>\n  <div *ngIf=\"jsError$ | async\" class=\"js-error\">\n    {{ 'errorHandlers.scriptFailedToLoad' | cxTranslate }}\n    {{ 'errorHandlers.refreshThePage' | cxTranslate }}\n  </div>\n</div>\n", styles: ["cx-gigya-raas .popup-link{cursor:pointer;color:var(--cx-color-primary)}cx-gigya-raas .js-error{text-align:center;padding:4rem}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-gigya-raas', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"component.data$ | async as data\">\n  <div *ngIf=\"jsLoaded$ | async\">\n    <div *ngIf=\"language$ | async as lang\">\n      <div\n        *ngIf=\"displayInEmbedMode(data); else popupLink\"\n        [attr.id]=\"data.containerID\"\n      >\n        {{ displayScreenSet(data, lang) }}\n      </div>\n      <ng-template #popupLink>\n        <a\n          class=\"popup-link\"\n          [attr.data-cdc-id]=\"data.uid\"\n          [attr.data-profile-edit]=\"data.profileEdit\"\n          (click)=\"showScreenSet(data, lang)\"\n          >{{ data.linkText }}</a\n        >\n      </ng-template>\n    </div>\n  </div>\n  <div *ngIf=\"jsError$ | async\" class=\"js-error\">\n    {{ 'errorHandlers.scriptFailedToLoad' | cxTranslate }}\n    {{ 'errorHandlers.refreshThePage' | cxTranslate }}\n  </div>\n</div>\n", styles: ["cx-gigya-raas .popup-link{cursor:pointer;color:var(--cx-color-primary)}cx-gigya-raas .js-error{text-align:center;padding:4rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.BaseSiteService }, { type: i2.LanguageService }, { type: i3.CdcConfig }, { type: i2.WindowRef }, { type: i3.CdcJsService }, { type: i0.NgZone }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class GigyaRaasModule {
}
GigyaRaasModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GigyaRaasModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, declarations: [GigyaRaasComponent], imports: [CommonModule,
        I18nModule, i2.ConfigModule], exports: [GigyaRaasComponent] });
GigyaRaasModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, imports: [CommonModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                GigyaRaasComponent: { component: GigyaRaasComponent },
            },
            layoutSlots: {
                GigyaLoginPageTemplate: {
                    slots: ['BodyContent', 'BottomContent'],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: GigyaRaasModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                GigyaRaasComponent: { component: GigyaRaasComponent },
                            },
                            layoutSlots: {
                                GigyaLoginPageTemplate: {
                                    slots: ['BodyContent', 'BottomContent'],
                                },
                            },
                        }),
                    ],
                    declarations: [GigyaRaasComponent],
                    exports: [GigyaRaasComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdcComponentsModule {
}
CdcComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcComponentsModule, imports: [CommonModule, GigyaRaasModule] });
CdcComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcComponentsModule, imports: [CommonModule, GigyaRaasModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [CommonModule, GigyaRaasModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CdcComponentsModule, GigyaRaasComponent, GigyaRaasModule };
//# sourceMappingURL=spartacus-cdc-components.mjs.map
