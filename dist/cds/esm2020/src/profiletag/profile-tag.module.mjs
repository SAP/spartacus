/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CdsBackendNotificationAdapter } from './adapters/cds-backend-notification-adapter';
import { OccBackendNotification } from './adapters/occ-backend-notification-adapter';
import { ProfileTagCmsModule } from './cms-components/profile-tag-cms.module';
import { ConsentReferenceInterceptor } from './http-interceptors/consent-reference-interceptor';
import { DebugInterceptor } from './http-interceptors/debug-interceptor';
import * as i0 from "@angular/core";
export class ProfileTagModule {
}
ProfileTagModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProfileTagModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, imports: [ProfileTagCmsModule] });
ProfileTagModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: ConsentReferenceInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useExisting: DebugInterceptor, multi: true },
        {
            provide: CdsBackendNotificationAdapter,
            useClass: OccBackendNotification,
        },
    ], imports: [ProfileTagCmsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProfileTagCmsModule],
                    providers: [
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: ConsentReferenceInterceptor,
                            multi: true,
                        },
                        { provide: HTTP_INTERCEPTORS, useExisting: DebugInterceptor, multi: true },
                        {
                            provide: CdsBackendNotificationAdapter,
                            useClass: OccBackendNotification,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS10YWcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZHMvc3JjL3Byb2ZpbGV0YWcvcHJvZmlsZS10YWcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQWlCekUsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLFlBZGpCLG1CQUFtQjs4R0FjbEIsZ0JBQWdCLGFBYmhCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQzFFO1lBQ0UsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxRQUFRLEVBQUUsc0JBQXNCO1NBQ2pDO0tBQ0YsWUFaUyxtQkFBbUI7MkZBY2xCLGdCQUFnQjtrQkFmNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDOUIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSwyQkFBMkI7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNELEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO3dCQUMxRTs0QkFDRSxPQUFPLEVBQUUsNkJBQTZCOzRCQUN0QyxRQUFRLEVBQUUsc0JBQXNCO3lCQUNqQztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENkc0JhY2tlbmROb3RpZmljYXRpb25BZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9jZHMtYmFja2VuZC1ub3RpZmljYXRpb24tYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NCYWNrZW5kTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtYmFja2VuZC1ub3RpZmljYXRpb24tYWRhcHRlcic7XG5pbXBvcnQgeyBQcm9maWxlVGFnQ21zTW9kdWxlIH0gZnJvbSAnLi9jbXMtY29tcG9uZW50cy9wcm9maWxlLXRhZy1jbXMubW9kdWxlJztcbmltcG9ydCB7IENvbnNlbnRSZWZlcmVuY2VJbnRlcmNlcHRvciB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvcnMvY29uc2VudC1yZWZlcmVuY2UtaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgRGVidWdJbnRlcmNlcHRvciB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvcnMvZGVidWctaW50ZXJjZXB0b3InO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbUHJvZmlsZVRhZ0Ntc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IENvbnNlbnRSZWZlcmVuY2VJbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlRXhpc3Rpbmc6IERlYnVnSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2RzQmFja2VuZE5vdGlmaWNhdGlvbkFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogT2NjQmFja2VuZE5vdGlmaWNhdGlvbixcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9maWxlVGFnTW9kdWxlIHt9XG4iXX0=