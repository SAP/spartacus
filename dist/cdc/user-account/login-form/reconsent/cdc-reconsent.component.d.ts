import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AnonymousConsentsService, ConsentTemplate } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { CdcReconsentComponentService } from './cdc-reconsent-component.service';
import * as i0 from "@angular/core";
export declare class CdcReconsentComponent implements OnInit, OnDestroy {
    protected launchDialogService: LaunchDialogService;
    protected anonymousConsentsService: AnonymousConsentsService;
    protected cdcReconsentService: CdcReconsentComponentService;
    protected subscription: Subscription;
    form: UntypedFormGroup;
    iconTypes: typeof ICON_TYPE;
    loaded$: Observable<boolean>;
    templateList$: Observable<ConsentTemplate[]>;
    reconsentEvent: any;
    selectedConsents: string[];
    disableSubmitButton: boolean;
    totalConsents: number;
    focusConfig: FocusConfig;
    constructor(launchDialogService: LaunchDialogService, anonymousConsentsService: AnonymousConsentsService, cdcReconsentService: CdcReconsentComponentService);
    ngOnInit(): void;
    loadConsents(reconsentIds: string[]): void;
    onConsentChange(event: {
        given: boolean;
        template: ConsentTemplate;
    }): void;
    dismissDialog(reason?: any, message?: string): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcReconsentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CdcReconsentComponent, "cx-anonymous-consent-dialog", never, {}, {}, never, never, false, never>;
}
