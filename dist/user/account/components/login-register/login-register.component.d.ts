import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
export declare class LoginRegisterComponent implements OnInit {
    protected activatedRoute: ActivatedRoute;
    loginAsGuest: boolean;
    constructor(activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginRegisterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoginRegisterComponent, "cx-login-register", never, {}, {}, never, never, false, never>;
}
