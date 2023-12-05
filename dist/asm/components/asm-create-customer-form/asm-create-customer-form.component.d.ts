import { FormBuilder } from '@angular/forms';
import { AsmCreateCustomerFacade, CustomerRegistrationForm } from '@spartacus/asm/root';
import { GlobalMessageType, HttpErrorModel, TranslationService, User } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { CreatedCustomer } from './asm-create-customer-form.model';
import * as i0 from "@angular/core";
export declare class AsmCreateCustomerFormComponent {
    protected launchDialogService: LaunchDialogService;
    protected fb: FormBuilder;
    protected asmCreateCustomerFacade: AsmCreateCustomerFacade;
    protected translationService: TranslationService;
    createdCustomer: CreatedCustomer;
    iconTypes: typeof ICON_TYPE;
    isLoading$: BehaviorSubject<boolean>;
    showDialogInfoAlert: boolean;
    globalMessageType: typeof GlobalMessageType;
    showDialogBackendErrorAlerts: boolean[];
    backendErrorMessages: string[];
    focusConfig: FocusConfig;
    registerForm: import("@angular/forms").FormGroup<{
        firstName: import("@angular/forms").FormControl<string | null>;
        lastName: import("@angular/forms").FormControl<string | null>;
        email: import("@angular/forms").FormControl<string | null>;
    }>;
    constructor(launchDialogService: LaunchDialogService, fb: FormBuilder, asmCreateCustomerFacade: AsmCreateCustomerFacade, translationService: TranslationService);
    submitForm(): void;
    registerUser(): void;
    collectDataFromRegisterForm(): CustomerRegistrationForm;
    closeModal(reason?: unknown): void;
    closeDialogInfoAlert(): void;
    closeDialogBackendErroAlert(index: number): void;
    protected onRegisterUserSuccess(user: User): void;
    protected onRegisterUserFail(error: HttpErrorModel): void;
    protected addErrorMessage(key: string, options?: unknown): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCreateCustomerFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCreateCustomerFormComponent, "cx-asm-create-customer-form", never, {}, {}, never, never, false, never>;
}
