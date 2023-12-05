import { BehaviorSubject, Observable } from 'rxjs';
import { PageLayoutService } from './page-layout.service';
import * as i0 from "@angular/core";
export declare class PageLayoutComponent {
    protected pageLayoutService: PageLayoutService;
    set section(value: string);
    readonly section$: BehaviorSubject<string | undefined>;
    readonly templateName$: Observable<string>;
    readonly layoutName$: Observable<string>;
    readonly slots$: Observable<string[]>;
    readonly pageFoldSlot$: Observable<string | undefined>;
    constructor(pageLayoutService: PageLayoutService);
    static ɵfac: i0.ɵɵFactoryDeclaration<PageLayoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PageLayoutComponent, "cx-page-layout", never, { "section": "section"; }, {}, never, ["*"], false, never>;
}
