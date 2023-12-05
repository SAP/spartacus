import { OnInit } from '@angular/core';
import { CmsBreadcrumbsComponent, PageMetaService, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { PageTitleComponent } from '../page-header/page-title.component';
import * as i0 from "@angular/core";
export declare class BreadcrumbComponent extends PageTitleComponent implements OnInit {
    component: CmsComponentData<CmsBreadcrumbsComponent>;
    protected pageMetaService: PageMetaService;
    private translation;
    crumbs$: Observable<any[]>;
    constructor(component: CmsComponentData<CmsBreadcrumbsComponent>, pageMetaService: PageMetaService, translation: TranslationService);
    ngOnInit(): void;
    private setCrumbs;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbComponent, "cx-breadcrumb", never, {}, {}, never, never, false, never>;
}
