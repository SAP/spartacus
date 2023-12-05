import { Injectable } from '@angular/core';
import { ASM_ENABLED_LOCAL_STORAGE_KEY } from '../asm-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
export class AsmEnablerService {
    constructor(location, winRef, launchDialogService, featureModules) {
        this.location = location;
        this.winRef = winRef;
        this.launchDialogService = launchDialogService;
        this.featureModules = featureModules;
    }
    /**
     * Loads the ASM UI if needed. The ASM UI will be added based on the
     * existence of a URL parameter or previous usage given by local storage.
     */
    load() {
        if (this.isEnabled()) {
            this.addUi();
        }
    }
    /**
     * Indicates whether the ASM module is enabled.
     */
    isEnabled() {
        if (this.isLaunched() && !this.isUsedBefore()) {
            if (this.winRef.localStorage) {
                this.winRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');
            }
        }
        return this.isLaunched() || this.isUsedBefore() || this.isEmulateInURL();
    }
    /**
     * Indicates whether ASM is launched through the URL,
     * using the asm flag in the URL.
     */
    isLaunched() {
        const params = this.location.path().split('?')[1];
        return !!params && params.split('&').includes('asm=true');
    }
    /**
     * check whether try to emulate customer from deeplink
     * */
    isEmulateInURL() {
        return this.location.path().indexOf('assisted-service/emulate?') > 0;
    }
    /**
     * Evaluates local storage where we persist the usage of ASM.
     */
    isUsedBefore() {
        if (this.winRef.localStorage) {
            return (this.winRef.localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY) ===
                'true');
        }
        else {
            return false;
        }
    }
    /**
     * Adds the ASM UI by using the `cx-storefront` outlet.
     */
    addUi() {
        this.featureModules
            .resolveFeature('asm')
            .subscribe(() => this.launchDialogService.launch("ASM" /* LAUNCH_CALLER.ASM */));
    }
}
AsmEnablerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmEnablerService, deps: [{ token: i1.Location }, { token: i2.WindowRef }, { token: i3.LaunchDialogService }, { token: i2.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmEnablerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmEnablerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmEnablerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Location }, { type: i2.WindowRef }, { type: i3.LaunchDialogService }, { type: i2.FeatureModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWVuYWJsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vcm9vdC9zZXJ2aWNlcy9hc20tZW5hYmxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBRWpFOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQ1ksUUFBa0IsRUFDbEIsTUFBaUIsRUFDakIsbUJBQXdDLEVBQ3hDLGNBQXFDO1FBSHJDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtJQUM5QyxDQUFDO0lBRUo7OztPQUdHO0lBQ0gsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ08sVUFBVTtRQUNsQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOztTQUVLO0lBQ0wsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOztPQUVHO0lBQ08sWUFBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzVCLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7Z0JBQy9ELE1BQU0sQ0FDUCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxLQUFLO1FBQ2IsSUFBSSxDQUFDLGNBQWM7YUFDaEIsY0FBYyxDQUFDLEtBQUssQ0FBQzthQUNyQixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sK0JBQW1CLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs4R0FuRVUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FGaEIsTUFBTTsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZU1vZHVsZXNTZXJ2aWNlLCBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBBU01fRU5BQkxFRF9MT0NBTF9TVE9SQUdFX0tFWSB9IGZyb20gJy4uL2FzbS1jb25zdGFudHMnO1xuXG4vKipcbiAqIFRoZSBBc21FbmFibGVyU2VydmljZSBpcyB1c2VkIHRvIGVuYWJsZSBBU00gZm9yIHRob3NlIHNjZW5hcmlvJ3NcbiAqIHdoZXJlIGl0J3MgYWN0dWFsbHkgdXNlZC4gVGhpcyBzZXJ2aWNlIGlzIGFkZGVkIHRvIGF2b2lkIGFueSBwb2x1dGlvblxuICogb2YgdGhlIFVJIGFuZCBydW50aW1lIHBlcmZvcm1hbmNlIGZvciB0aGUgb3JkaW5hcnkgcHJvZHVjdGlvbiB1c2VyLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtRW5hYmxlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZmVhdHVyZU1vZHVsZXM6IEZlYXR1cmVNb2R1bGVzU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSBBU00gVUkgaWYgbmVlZGVkLiBUaGUgQVNNIFVJIHdpbGwgYmUgYWRkZWQgYmFzZWQgb24gdGhlXG4gICAqIGV4aXN0ZW5jZSBvZiBhIFVSTCBwYXJhbWV0ZXIgb3IgcHJldmlvdXMgdXNhZ2UgZ2l2ZW4gYnkgbG9jYWwgc3RvcmFnZS5cbiAgICovXG4gIGxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgIHRoaXMuYWRkVWkoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIEFTTSBtb2R1bGUgaXMgZW5hYmxlZC5cbiAgICovXG4gIGlzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc0xhdW5jaGVkKCkgJiYgIXRoaXMuaXNVc2VkQmVmb3JlKCkpIHtcbiAgICAgIGlmICh0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlLnNldEl0ZW0oQVNNX0VOQUJMRURfTE9DQUxfU1RPUkFHRV9LRVksICd0cnVlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzTGF1bmNoZWQoKSB8fCB0aGlzLmlzVXNlZEJlZm9yZSgpIHx8IHRoaXMuaXNFbXVsYXRlSW5VUkwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBBU00gaXMgbGF1bmNoZWQgdGhyb3VnaCB0aGUgVVJMLFxuICAgKiB1c2luZyB0aGUgYXNtIGZsYWcgaW4gdGhlIFVSTC5cbiAgICovXG4gIHByb3RlY3RlZCBpc0xhdW5jaGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCc/JylbMV07XG4gICAgcmV0dXJuICEhcGFyYW1zICYmIHBhcmFtcy5zcGxpdCgnJicpLmluY2x1ZGVzKCdhc209dHJ1ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIHdoZXRoZXIgdHJ5IHRvIGVtdWxhdGUgY3VzdG9tZXIgZnJvbSBkZWVwbGlua1xuICAgKiAqL1xuICBpc0VtdWxhdGVJblVSTCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wYXRoKCkuaW5kZXhPZignYXNzaXN0ZWQtc2VydmljZS9lbXVsYXRlPycpID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmFsdWF0ZXMgbG9jYWwgc3RvcmFnZSB3aGVyZSB3ZSBwZXJzaXN0IHRoZSB1c2FnZSBvZiBBU00uXG4gICAqL1xuICBwcm90ZWN0ZWQgaXNVc2VkQmVmb3JlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZS5nZXRJdGVtKEFTTV9FTkFCTEVEX0xPQ0FMX1NUT1JBR0VfS0VZKSA9PT1cbiAgICAgICAgJ3RydWUnXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIEFTTSBVSSBieSB1c2luZyB0aGUgYGN4LXN0b3JlZnJvbnRgIG91dGxldC5cbiAgICovXG4gIHByb3RlY3RlZCBhZGRVaSgpOiB2b2lkIHtcbiAgICB0aGlzLmZlYXR1cmVNb2R1bGVzXG4gICAgICAucmVzb2x2ZUZlYXR1cmUoJ2FzbScpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMubGF1bmNoRGlhbG9nU2VydmljZS5sYXVuY2goTEFVTkNIX0NBTExFUi5BU00pKTtcbiAgfVxufVxuIl19