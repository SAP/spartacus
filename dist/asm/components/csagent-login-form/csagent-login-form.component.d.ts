import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class CSAgentLoginFormComponent implements OnInit {
    protected fb: UntypedFormBuilder;
    csAgentLoginForm: UntypedFormGroup;
    csAgentTokenLoading: boolean;
    submitEvent: EventEmitter<{
        userId: string;
        password: string;
    }>;
    constructor(fb: UntypedFormBuilder);
    ngOnInit(): void;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CSAgentLoginFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CSAgentLoginFormComponent, "cx-csagent-login-form", never, { "csAgentTokenLoading": "csAgentTokenLoading"; }, { "submitEvent": "submitEvent"; }, never, never, false, never>;
}
