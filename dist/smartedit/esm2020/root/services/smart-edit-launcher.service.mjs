import { inject, Injectable } from '@angular/core';
import { FeatureModulesService } from '@spartacus/core';
import { SMART_EDIT_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
import * as i1 from "../config/smart-edit-config";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
export class SmartEditLauncherService {
    get cmsTicketId() {
        return this._cmsTicketId;
    }
    constructor(config, location, scriptLoader) {
        this.config = config;
        this.location = location;
        this.scriptLoader = scriptLoader;
        this.featureModulesService = inject(FeatureModulesService);
    }
    /**
     * load webApplicationInjector.js first when Spartacus launched inside SmartEdit
     */
    load() {
        if (this.isLaunchedInSmartEdit()) {
            this.featureModulesService.resolveFeature(SMART_EDIT_FEATURE).subscribe();
            this.scriptLoader?.embedScript({
                src: 'assets/webApplicationInjector.js',
                params: undefined,
                attributes: {
                    id: 'text/smartedit-injector',
                    'data-smartedit-allow-origin': this.config.smartEdit?.allowOrigin,
                },
            });
        }
    }
    /**
     * Indicates whether Spartacus is launched in SmartEdit
     */
    isLaunchedInSmartEdit() {
        const path = this.location.path().split('?')[0];
        const params = this.location.path().split('?')[1];
        const cmsToken = params
            ?.split('&')
            .find((param) => param.startsWith('cmsTicketId='));
        this._cmsTicketId = cmsToken?.split('=')[1];
        return (path.split('/').pop() === this.config.smartEdit?.storefrontPreviewRoute &&
            !!this._cmsTicketId);
    }
}
SmartEditLauncherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditLauncherService, deps: [{ token: i1.SmartEditConfig }, { token: i2.Location }, { token: i3.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditLauncherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditLauncherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SmartEditLauncherService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SmartEditConfig }, { type: i2.Location }, { type: i3.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1sYXVuY2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3NtYXJ0ZWRpdC9yb290L3NlcnZpY2VzL3NtYXJ0LWVkaXQtbGF1bmNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0saUJBQWlCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBRXJEOzs7R0FHRztBQUlILE1BQU0sT0FBTyx3QkFBd0I7SUFJbkMsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUNZLE1BQXVCLEVBQ3ZCLFFBQWtCLEVBQ2xCLFlBQTBCO1FBRjFCLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFWbkIsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFXdEUsQ0FBQztJQUVKOztPQUVHO0lBQ0gsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRTFFLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2dCQUM3QixHQUFHLEVBQUUsa0NBQWtDO2dCQUN2QyxNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFO29CQUNWLEVBQUUsRUFBRSx5QkFBeUI7b0JBQzdCLDZCQUE2QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVc7aUJBQ2xFO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQkFBcUI7UUFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTTtZQUNyQixFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsc0JBQXNCO1lBQ3ZFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUNwQixDQUFDO0lBQ0osQ0FBQzs7cUhBL0NVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZU1vZHVsZXNTZXJ2aWNlLCBTY3JpcHRMb2FkZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU21hcnRFZGl0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NtYXJ0LWVkaXQtY29uZmlnJztcbmltcG9ydCB7IFNNQVJUX0VESVRfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5cbi8qKlxuICogVGhlIFNtYXJ0RWRpdExhdW5jaGVyU2VydmljZSBpcyB1c2VkIHRvIGNoZWNrIHdoZXRoZXIgU3BhcnRhY3VzIGlzIGxhdW5jaGVkIGluc2lkZSBTbWFydCBFZGl0O1xuICogaXQgYWxzbyBnZXRzIGNtc1RpY2tldElkIHNlbnQgZnJvbSBTbWFydCBFZGl0LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU21hcnRFZGl0TGF1bmNoZXJTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGZlYXR1cmVNb2R1bGVzU2VydmljZSA9IGluamVjdChGZWF0dXJlTW9kdWxlc1NlcnZpY2UpO1xuICBwcml2YXRlIF9jbXNUaWNrZXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGdldCBjbXNUaWNrZXRJZCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9jbXNUaWNrZXRJZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IFNtYXJ0RWRpdENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByb3RlY3RlZCBzY3JpcHRMb2FkZXI6IFNjcmlwdExvYWRlclxuICApIHt9XG5cbiAgLyoqXG4gICAqIGxvYWQgd2ViQXBwbGljYXRpb25JbmplY3Rvci5qcyBmaXJzdCB3aGVuIFNwYXJ0YWN1cyBsYXVuY2hlZCBpbnNpZGUgU21hcnRFZGl0XG4gICAqL1xuICBsb2FkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTGF1bmNoZWRJblNtYXJ0RWRpdCgpKSB7XG4gICAgICB0aGlzLmZlYXR1cmVNb2R1bGVzU2VydmljZS5yZXNvbHZlRmVhdHVyZShTTUFSVF9FRElUX0ZFQVRVUkUpLnN1YnNjcmliZSgpO1xuXG4gICAgICB0aGlzLnNjcmlwdExvYWRlcj8uZW1iZWRTY3JpcHQoe1xuICAgICAgICBzcmM6ICdhc3NldHMvd2ViQXBwbGljYXRpb25JbmplY3Rvci5qcycsXG4gICAgICAgIHBhcmFtczogdW5kZWZpbmVkLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaWQ6ICd0ZXh0L3NtYXJ0ZWRpdC1pbmplY3RvcicsXG4gICAgICAgICAgJ2RhdGEtc21hcnRlZGl0LWFsbG93LW9yaWdpbic6IHRoaXMuY29uZmlnLnNtYXJ0RWRpdD8uYWxsb3dPcmlnaW4sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgU3BhcnRhY3VzIGlzIGxhdW5jaGVkIGluIFNtYXJ0RWRpdFxuICAgKi9cbiAgaXNMYXVuY2hlZEluU21hcnRFZGl0KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnPycpWzBdO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCc/JylbMV07XG4gICAgY29uc3QgY21zVG9rZW4gPSBwYXJhbXNcbiAgICAgID8uc3BsaXQoJyYnKVxuICAgICAgLmZpbmQoKHBhcmFtKSA9PiBwYXJhbS5zdGFydHNXaXRoKCdjbXNUaWNrZXRJZD0nKSk7XG4gICAgdGhpcy5fY21zVGlja2V0SWQgPSBjbXNUb2tlbj8uc3BsaXQoJz0nKVsxXTtcblxuICAgIHJldHVybiAoXG4gICAgICBwYXRoLnNwbGl0KCcvJykucG9wKCkgPT09IHRoaXMuY29uZmlnLnNtYXJ0RWRpdD8uc3RvcmVmcm9udFByZXZpZXdSb3V0ZSAmJlxuICAgICAgISF0aGlzLl9jbXNUaWNrZXRJZFxuICAgICk7XG4gIH1cbn1cbiJdfQ==