import { OnInit, AfterViewInit } from '@angular/core';
import { CmsPageTitleComponent, PageMetaService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import * as i0 from "@angular/core";
export declare class PageTitleComponent implements OnInit, AfterViewInit {
    component: CmsComponentData<CmsPageTitleComponent>;
    protected pageMetaService: PageMetaService;
    title$: Observable<string>;
    lastestTitle$: Observable<string>;
    constructor(component: CmsComponentData<CmsPageTitleComponent>, pageMetaService: PageMetaService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private setTitle;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PageTitleComponent, "cx-page-title", never, {}, {}, never, never, false, never>;
}
