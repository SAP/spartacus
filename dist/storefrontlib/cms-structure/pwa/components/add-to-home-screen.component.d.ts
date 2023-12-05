import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToHomeScreenService } from '../services/add-to-home-screen.service';
import * as i0 from "@angular/core";
export declare abstract class AddToHomeScreenComponent implements OnInit {
    protected addToHomeScreenService: AddToHomeScreenService;
    canPrompt$: Observable<boolean>;
    constructor(addToHomeScreenService: AddToHomeScreenService);
    ngOnInit(): void;
    prompt(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddToHomeScreenComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AddToHomeScreenComponent, never, never, {}, {}, never, never, false, never>;
}
