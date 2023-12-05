import { EventEmitter, OnInit } from '@angular/core';
import { AnonymousConsent, ConsentTemplate } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ConsentManagementFormComponent implements OnInit {
    consentGiven: boolean;
    consentTemplate: ConsentTemplate;
    requiredConsents: string[];
    consent: AnonymousConsent | null;
    consentChanged: EventEmitter<{
        given: boolean;
        template: ConsentTemplate;
    }>;
    constructor();
    ngOnInit(): void;
    onConsentChange(): void;
    isRequired(templateId: string | undefined): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConsentManagementFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConsentManagementFormComponent, "cx-consent-management-form", never, { "consentTemplate": "consentTemplate"; "requiredConsents": "requiredConsents"; "consent": "consent"; }, { "consentChanged": "consentChanged"; }, never, never, false, never>;
}
