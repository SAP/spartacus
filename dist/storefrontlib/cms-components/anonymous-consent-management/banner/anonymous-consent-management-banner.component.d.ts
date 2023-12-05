import { OnDestroy, ViewContainerRef } from '@angular/core';
import { AnonymousConsentsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { LaunchDialogService } from '../../../layout/launch-dialog/services/launch-dialog.service';
import * as i0 from "@angular/core";
export declare class AnonymousConsentManagementBannerComponent implements OnDestroy {
    protected anonymousConsentsService: AnonymousConsentsService;
    protected vcr: ViewContainerRef;
    protected launchDialogService: LaunchDialogService;
    private subscriptions;
    bannerVisible$: Observable<boolean>;
    constructor(anonymousConsentsService: AnonymousConsentsService, vcr: ViewContainerRef, launchDialogService: LaunchDialogService);
    viewDetails(): void;
    allowAll(): void;
    hideBanner(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentManagementBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AnonymousConsentManagementBannerComponent, "cx-anonymous-consent-management-banner", never, {}, {}, never, never, false, never>;
}
