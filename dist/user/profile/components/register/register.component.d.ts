import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AnonymousConsent, AnonymousConsentsConfig, AnonymousConsentsService, AuthConfigService, ConsentTemplate, GlobalMessageService, RoutingService } from '@spartacus/core';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterComponentService } from './register-component.service';
import * as i0 from "@angular/core";
export declare class RegisterComponent implements OnInit, OnDestroy {
    protected globalMessageService: GlobalMessageService;
    protected fb: UntypedFormBuilder;
    protected router: RoutingService;
    protected anonymousConsentsService: AnonymousConsentsService;
    protected anonymousConsentsConfig: AnonymousConsentsConfig;
    protected authConfigService: AuthConfigService;
    protected registerComponentService: RegisterComponentService;
    titles$: Observable<Title[]>;
    isLoading$: BehaviorSubject<boolean>;
    private subscription;
    anonymousConsent$: Observable<{
        consent: AnonymousConsent | undefined;
        template: string;
    }>;
    registerForm: UntypedFormGroup;
    additionalRegistrationConsents: {
        template: ConsentTemplate;
        required: boolean;
    }[];
    get additionalConsents(): UntypedFormArray;
    updateAdditionalConsents(event: MouseEvent, index: number): void;
    constructor(globalMessageService: GlobalMessageService, fb: UntypedFormBuilder, router: RoutingService, anonymousConsentsService: AnonymousConsentsService, anonymousConsentsConfig: AnonymousConsentsConfig, authConfigService: AuthConfigService, registerComponentService: RegisterComponentService);
    ngOnInit(): void;
    submitForm(): void;
    registerUser(): void;
    titleSelected(title: Title): void;
    collectDataFromRegisterForm(formData: any): UserSignUp;
    isConsentGiven(consent: AnonymousConsent | undefined): boolean;
    private isConsentRequired;
    protected onRegisterUserSuccess(): void;
    toggleAnonymousConsent(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RegisterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RegisterComponent, "cx-register", never, {}, {}, never, never, false, never>;
}
