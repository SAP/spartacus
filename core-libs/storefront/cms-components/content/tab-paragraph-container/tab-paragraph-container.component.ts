/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import {
  CmsService,
  CMSTabParagraphContainer,
  WindowRef,
} from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { OutletDirective } from '../../../cms-structure/outlet/outlet.directive';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { BREAKPOINT } from '../../../layout/config/layout-config';
import { TabComponent } from '../tab/tab.component';
import { Tab, TabConfig } from '../tab/tab.model';

const defaultTabConfig = {
  openTabs: [0],
  breakpoint: BREAKPOINT.md,
};

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TabComponent,
    OutletDirective,
    ComponentWrapperDirective,
    AsyncPipe,
  ],
})
export class TabParagraphContainerComponent implements AfterViewInit {
  componentData =
    inject<CmsComponentData<CMSTabParagraphContainer>>(CmsComponentData);
  protected cmsService = inject(CmsService);
  protected winRef = inject(WindowRef);

  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChildren('tabRef')
  tabRefs: QueryList<TemplateRef<any>>;

  tabConfig$: BehaviorSubject<TabConfig> = new BehaviorSubject<TabConfig>(
    defaultTabConfig
  );

  /**
   * Map with key as the component uid and value as the observable of the title parameters.
   */
  protected tabTitleParams$ = new BehaviorSubject<
    Map<string, Observable<any> | null>
  >(new Map());

  components$: Observable<any[]> = this.componentData.data$.pipe(
    distinctUntilChanged((x, y) => x?.components === y?.components),
    switchMap((data) =>
      combineLatest(
        (data?.components ?? '').split(' ').map((component) =>
          this.cmsService.getComponentData<any>(component).pipe(
            distinctUntilChanged(),
            map((tab) => {
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
                title: `${data.uid}.tabs.${tab.uid}`,
              };
            })
          )
        )
      ).pipe(
        // Remove tabs whose component data is null or undefined
        map((tabs) => tabs.filter((tab) => tab != null)),
        // Update tablist label with name from CMS
        tap(() => {
          this.tabConfig$.next({
            label: `${data?.uid}.tabPanelContainerRegionGroup`,
            ...defaultTabConfig,
          });
        })
      )
    )
  );

  tabs$: Observable<Tab[]>;

  ngAfterViewInit(): void {
    // Render the tabs after the templates have completed loading in the view.
    this.tabs$ = combineLatest([
      this.components$,
      this.tabRefs.changes.pipe(startWith(this.tabRefs)),
      this.tabTitleParams$,
    ]).pipe(
      switchMap(([components, refs, params]) => {
        const paramObservables = components.map(
          (component) => params.get(component?.uid) || of(null)
        );

        return combineLatest(paramObservables).pipe(
          map((resolvedParams) =>
            components.map((component, index) => ({
              headerKey: component?.title,
              content: refs.get(index),
              id: index,
              headerParams: { param: resolvedParams[index] },
            }))
          )
        );
      })
    );
    this.cdr.detectChanges();
  }

  tabCompLoaded(componentRef: any, componentId?: string): void {
    if (componentId) {
      const currentParams = this.tabTitleParams$.getValue();
      // We need to check if the componentId is already in the map
      // to avoid infinite loop(tabs$ emit -> component load -> tabTitleParams$ emit -> tabs$ emit)
      if (!currentParams.has(componentId)) {
        currentParams.set(componentId, componentRef.instance.tabTitleParam$);
        this.tabTitleParams$.next(currentParams);
      }
    }
  }
}
