import { EventEmitter } from '@angular/core';
import { SortModel } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class SortingComponent {
    sortOptions: SortModel[] | undefined;
    ariaControls: string;
    ariaLabel: string | undefined;
    selectedOption: string | undefined;
    placeholder: string;
    sortLabels: {
        [code: string]: string;
    } | null;
    sortListEvent: EventEmitter<string>;
    constructor();
    sortList(sortCode: string): void;
    get selectedLabel(): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<SortingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SortingComponent, "cx-sorting", never, { "sortOptions": "sortOptions"; "ariaControls": "ariaControls"; "ariaLabel": "ariaLabel"; "selectedOption": "selectedOption"; "placeholder": "placeholder"; "sortLabels": "sortLabels"; }, { "sortListEvent": "sortListEvent"; }, never, never, false, never>;
}
