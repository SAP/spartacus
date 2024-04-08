/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import {
    CmsService
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { ComponentWrapperDirective } from '@spartacus/storefront';

@Component({
    selector: 'cx-product-tabs',
    templateUrl: './product-tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTabsComponent implements AfterViewInit, OnInit {
    activeTabNum = 0;
    ariaLabel: string;

    @ViewChildren(ComponentWrapperDirective)
    children!: QueryList<ComponentWrapperDirective>;

    tabTitleParams: (Observable<any> | null)[] = [];

    constructor(
        protected cmsService: CmsService
    ) { }

    components$: Observable<any>[];

    select(tabNum: number): void {
        this.activeTabNum = this.activeTabNum === tabNum ? -1 : tabNum;
    }

    ngOnInit(): void {
        this.cmsService.getComponentData('TabPanelContainer').pipe(take(1)).subscribe((data: any) => {
            this.components$ = (data?.components ?? '').split(' ').map((component: any) =>
                this.cmsService.getComponentData(component).pipe(
                    distinctUntilChanged(),
                    map((tab: any) => {
                        if (!tab) {
                            return undefined;
                        }

                        if (!tab.flexType) {
                            tab = {
                                ...tab,
                                flexType: tab.typeCode,
                            };
                        }

                        return {
                            ...tab,
                            title: `${data?.uid}.tabs.${tab.uid}`,
                        };
                    })
                )
            )
        }
        )
    }

    ngAfterViewInit(): void {
        // If the sub cms components data exist, the components created before ngAfterViewInit are called.
        // In this case, the title parameters are directly pulled from them.
        if (this.children.length > 0) {
            this.getTitleParams(this.children);
        }
    }

    tabCompLoaded(componentRef: any): void {
        this.tabTitleParams.push(componentRef.instance.tabTitleParam$);
    }

    protected getTitleParams(children: QueryList<ComponentWrapperDirective>) {
        children.forEach((comp) => {
            this.tabTitleParams.push(comp['cmpRef']?.instance.tabTitleParam$ ?? null);
        });
    }
}
