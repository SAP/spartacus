/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation, } from '@angular/core';
import { CdcConfig, CdcJsService } from '@spartacus/cdc/root';
import { BaseSiteService, LanguageService, WindowRef } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cdc/root";
import * as i4 from "@angular/common";
export class GigyaRaasComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lneWEtcmFhcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9jb21wb25lbnRzL2dpZ3lhLXJhYXMvZ2lneWEtcmFhcy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2NkYy9jb21wb25lbnRzL2dpZ3lhLXJhYXMvZ2lneWEtcmFhcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsTUFBTSxFQUVOLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXpELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVNqRSxNQUFNLE9BQU8sa0JBQWtCO0lBTTdCLFlBQ1MsU0FBbUQsRUFDbEQsZUFBZ0MsRUFDaEMsZUFBZ0MsRUFDaEMsU0FBb0IsRUFDcEIsTUFBaUIsRUFDakIsWUFBMEIsRUFDMUIsSUFBWTtRQU5iLGNBQVMsR0FBVCxTQUFTLENBQTBDO1FBQ2xELG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQVE7UUFaWixvQkFBZSxHQUFH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QUM7YUFDYixTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0IsQ0FBQyxJQUE0QjtRQUM3QyxNQUFNLFVBQVUsR0FBWSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakUsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7K0dBM0dVLGtCQUFrQjttR0FBbEIsa0JBQWtCLHFEQzNCL0Isa3pCQXlCQTsyRkRFYSxrQkFBa0I7a0JBUDlCLFNBQVM7K0JBQ0UsZUFBZSxpQkFHVixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdpZ3lhUmFhc0NvbXBvbmVudERhdGEgfSBmcm9tICdAc3BhcnRhY3VzL2NkYy9jb3JlJztcbmltcG9ydCB7IENkY0NvbmZpZywgQ2RjSnNTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jZGMvcm9vdCc7XG5pbXBvcnQgeyBCYXNlU2l0ZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSwgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENtc0NvbXBvbmVudERhdGEgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZ2lneWEtcmFhcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9naWd5YS1yYWFzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ2lneWEtcmFhcy5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgR2lneWFSYWFzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJvdGVjdGVkIHJlbmRlclNjcmVlblNldCA9IHRydWU7XG4gIGxhbmd1YWdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBqc0Vycm9yJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAganNMb2FkZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDbXNDb21wb25lbnREYXRhPEdpZ3lhUmFhc0NvbXBvbmVudERhdGE+LFxuICAgIHByaXZhdGUgYmFzZVNpdGVTZXJ2aWNlOiBCYXNlU2l0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcbiAgICBwcml2YXRlIGNkY0NvbmZpZzogQ2RjQ29uZmlnLFxuICAgIHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWYsXG4gICAgcHJpdmF0ZSBjZGNKU1NlcnZpY2U6IENkY0pzU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5qc0xvYWRlZCQgPSB0aGlzLmNkY0pTU2VydmljZS5kaWRMb2FkKCk7XG4gICAgdGhpcy5qc0Vycm9yJCA9IHRoaXMuY2RjSlNTZXJ2aWNlLmRpZFNjcmlwdEZhaWxUb0xvYWQoKTtcbiAgICB0aGlzLmxhbmd1YWdlJCA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldEFjdGl2ZSgpLnBpcGUoXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgLy8gT24gbGFuZ3VhZ2UgY2hhbmdlIHdlIHdhbnQgdG8gcmVyZW5kZXIgQ0RDIHNjcmVlbiB3aXRoIHByb3BlciB0cmFuc2xhdGlvbnNcbiAgICAgIHRhcCgoKSA9PiAodGhpcy5yZW5kZXJTY3JlZW5TZXQgPSB0cnVlKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BsYXkgc2NyZWVuIHNldCBpbiBlbWJlZCBtb2RlXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIC0gR2lneWFSYWFzQ29tcG9uZW50RGF0YVxuICAgKiBAcGFyYW0gbGFuZyAtIGxhbmd1YWdlXG4gICAqL1xuICBkaXNwbGF5U2NyZWVuU2V0KGRhdGE6IEdpZ3lhUmFhc0NvbXBvbmVudERhdGEsIGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlbmRlclNjcmVlblNldCkge1xuICAgICAgdGhpcy5zaG93U2NyZWVuU2V0KGRhdGEsIGxhbmcpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlclNjcmVlblNldCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgc2NyZWVuIHNldFxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIEdpZ3lhUmFhc0NvbXBvbmVudERhdGFcbiAgICogQHBhcmFtIGxhbmcgLSBsYW5ndWFnZVxuICAgKi9cbiAgc2hvd1NjcmVlblNldChkYXRhOiBHaWd5YVJhYXNDb21wb25lbnREYXRhLCBsYW5nOiBzdHJpbmcpIHtcbiAgICAodGhpcy53aW5SZWYubmF0aXZlV2luZG93IGFzIHsgW2tleTogc3RyaW5nXTogYW55IH0pPy5bXG4gICAgICAnZ2lneWEnXG4gICAgXT8uYWNjb3VudHM/LnNob3dTY3JlZW5TZXQoe1xuICAgICAgc2NyZWVuU2V0OiBkYXRhLnNjcmVlblNldCxcbiAgICAgIHN0YXJ0U2NyZWVuOiBkYXRhLnN0YXJ0U2NyZWVuLFxuICAgICAgbGFuZyxcbiAgICAgIC4uLih0aGlzLmRpc3BsYXlJbkVtYmVkTW9kZShkYXRhKVxuICAgICAgICA/IHsgY29udGFpbmVySUQ6IGRhdGEuY29udGFpbmVySUQgfVxuICAgICAgICA6IHt9KSxcbiAgICAgIC4uLih0aGlzLmlzTG9naW5TY3JlZW5TZXQoZGF0YSlcbiAgICAgICAgPyB7IHNlc3Npb25FeHBpcmF0aW9uOiB0aGlzLmdldFNlc3Npb25FeHBpcmF0aW9uVmFsdWUoKSB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgb25BZnRlclN1Ym1pdDogKC4uLnBhcmFtczogYW55W10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuY2RjSlNTZXJ2aWNlLm9uUHJvZmlsZVVwZGF0ZUV2ZW50SGFuZGxlciguLi5wYXJhbXMpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzTG9naW5TY3JlZW5TZXQoZGF0YTogR2lneWFSYWFzQ29tcG9uZW50RGF0YSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByb2ZpbGVFZGl0U2NyZWVuOiBib29sZWFuID1cbiAgICAgIGRhdGEucHJvZmlsZUVkaXQgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcblxuICAgIHJldHVybiAhcHJvZmlsZUVkaXRTY3JlZW47XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2Vzc2lvbkV4cGlyYXRpb25WYWx1ZSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmNkY0NvbmZpZz8uY2RjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGZpbHRlcmVkQ29uZmlnczogYW55ID0gdGhpcy5jZGNDb25maWcuY2RjLmZpbHRlcihcbiAgICAgICAgKGNvbmYpID0+IGNvbmYuYmFzZVNpdGUgPT09IHRoaXMuZ2V0Q3VycmVudEJhc2VTaXRlKClcbiAgICAgICk7XG4gICAgICBpZiAoZmlsdGVyZWRDb25maWdzICYmIGZpbHRlcmVkQ29uZmlncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZENvbmZpZ3NbMF0uc2Vzc2lvbkV4cGlyYXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiBhIGRlZmF1bHQgdmFsdWVcbiAgICByZXR1cm4gMzYwMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VycmVudEJhc2VTaXRlKCk6IHN0cmluZyB7XG4gICAgbGV0IGJhc2VTaXRlOiBzdHJpbmcgPSAnJztcbiAgICB0aGlzLmJhc2VTaXRlU2VydmljZVxuICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4gKGJhc2VTaXRlID0gZGF0YSkpO1xuICAgIHJldHVybiBiYXNlU2l0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gZW1iZWQgbW9kZVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSAtIEdpZ3lhUmFhc0NvbXBvbmVudERhdGFcbiAgICovXG4gIGRpc3BsYXlJbkVtYmVkTW9kZShkYXRhOiBHaWd5YVJhYXNDb21wb25lbnREYXRhKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZW1iZWRWYWx1ZTogYm9vbGVhbiA9IGRhdGEuZW1iZWQgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICBpZiAoZW1iZWRWYWx1ZSAmJiBkYXRhLmNvbnRhaW5lcklEICYmIGRhdGEuY29udGFpbmVySUQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImNvbXBvbmVudC5kYXRhJCB8IGFzeW5jIGFzIGRhdGFcIj5cbiAgPGRpdiAqbmdJZj1cImpzTG9hZGVkJCB8IGFzeW5jXCI+XG4gICAgPGRpdiAqbmdJZj1cImxhbmd1YWdlJCB8IGFzeW5jIGFzIGxhbmdcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgKm5nSWY9XCJkaXNwbGF5SW5FbWJlZE1vZGUoZGF0YSk7IGVsc2UgcG9wdXBMaW5rXCJcbiAgICAgICAgW2F0dHIuaWRdPVwiZGF0YS5jb250YWluZXJJRFwiXG4gICAgICA+XG4gICAgICAgIHt7IGRpc3BsYXlTY3JlZW5TZXQoZGF0YSwgbGFuZykgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLXRlbXBsYXRlICNwb3B1cExpbms+XG4gICAgICAgIDxhXG4gICAgICAgICAgY2xhc3M9XCJwb3B1cC1saW5rXCJcbiAgICAgICAgICBbYXR0ci5kYXRhLWNkYy1pZF09XCJkYXRhLnVpZFwiXG4gICAgICAgICAgW2F0dHIuZGF0YS1wcm9maWxlLWVkaXRdPVwiZGF0YS5wcm9maWxlRWRpdFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNob3dTY3JlZW5TZXQoZGF0YSwgbGFuZylcIlxuICAgICAgICAgID57eyBkYXRhLmxpbmtUZXh0IH19PC9hXG4gICAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ0lmPVwianNFcnJvciQgfCBhc3luY1wiIGNsYXNzPVwianMtZXJyb3JcIj5cbiAgICB7eyAnZXJyb3JIYW5kbGVycy5zY3JpcHRGYWlsZWRUb0xvYWQnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICB7eyAnZXJyb3JIYW5kbGVycy5yZWZyZXNoVGhlUGFnZScgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2Rpdj5cbjwvZGl2PlxuIl19