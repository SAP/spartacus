import { AfterViewInit, OnInit, QueryList } from '@angular/core';
import { CmsService, CMSTabParagraphContainer, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import * as i0 from "@angular/core";
export declare class TabParagraphContainerComponent implements AfterViewInit, OnInit {
    componentData: CmsComponentData<CMSTabParagraphContainer>;
    protected cmsService: CmsService;
    protected winRef: WindowRef;
    activeTabNum: number;
    ariaLabel: string;
    children: QueryList<ComponentWrapperDirective>;
    tabTitleParams: (Observable<any> | null)[];
    constructor(componentData: CmsComponentData<CMSTabParagraphContainer>, cmsService: CmsService, winRef: WindowRef);
    components$: Observable<any[]>;
    select(tabNum: number, event?: MouseEvent): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    tabCompLoaded(componentRef: any): void;
    protected getTitleParams(children: QueryList<ComponentWrapperDirective>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabParagraphContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabParagraphContainerComponent, "cx-tab-paragraph-container", never, {}, {}, never, never, false, never>;
}
