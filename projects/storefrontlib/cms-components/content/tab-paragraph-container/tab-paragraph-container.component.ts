/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { BREAKPOINT } from '../../../layout/config/layout-config';
import { Tab, TabConfig } from '../tab/tab.model';

const defaultTabConfig = {
  openTabs: [0],
  breakpoint: BREAKPOINT.md,
};

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent implements AfterViewInit, OnInit {
  /**
   * @deprecated This method will be removed.
   */
  activeTabNum = 0;
  /**
   * @deprecated This method will be removed.
   */
  ariaLabel: string;

  /**
   * @deprecated This method will be removed.
   */
  @ViewChildren(ComponentWrapperDirective)
  children!: QueryList<ComponentWrapperDirective>;

  @ViewChildren('tabRef')
  tabRefs: QueryList<TemplateRef<any>>;

  /**
   * @deprecated This method will be removed.
   */
  tabTitleParams: (Observable<any> | null)[] = [];

  tabConfig$: BehaviorSubject<TabConfig> = new BehaviorSubject<TabConfig>(
    defaultTabConfig
  );

  /**
   * Map with key as the component uid and value as the observable of the title parameters.
   */
  protected tabTitleParams$ = new BehaviorSubject<
    Map<string, Observable<any> | null>
  >(new Map());

  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    protected cmsService: CmsService,
    protected winRef: WindowRef
  ) {}

  components$: Observable<any[]> = this.componentData.data$.pipe(
    distinctUntilChanged((x, y) => x?.components === y?.components),
    tap((data: CMSTabParagraphContainer) => {
      this.ariaLabel = `${data?.uid}.tabPanelContainerRegion`;
    }),
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

  /**
   * @deprecated This method will be removed.
   */
  select(tabNum: number, event?: MouseEvent): void {
    this.activeTabNum = this.activeTabNum === tabNum ? -1 : tabNum;
    if (event && event?.target) {
      const target = event.target as HTMLElement;
      const parentNode = target.parentNode as HTMLElement;
      this.winRef?.nativeWindow?.scrollTo({
        left: 0,
        top: parentNode.offsetTop,
        behavior: 'smooth',
      });
    }
  }

  /**
   * @deprecated This method will be removed.
   */
  ngOnInit(): void {
    this.activeTabNum =
      this.winRef?.nativeWindow?.history?.state?.activeTab ?? this.activeTabNum;
  }

  ngAfterViewInit(): void {
    // If the sub cms components data exist, the components created before ngAfterViewInit are called.
    // In this case, the title parameters are directly pulled from them.
    if (this.children.length > 0) {
      this.getTitleParams(this.children);
    }

    // Render the tabs after the templates have completed loading in the view.
    this.tabs$ = combineLatest([
      this.components$,
      this.tabRefs.changes.pipe(startWith(this.tabRefs)),
      this.tabTitleParams$,
    ]).pipe(
      switchMap(([components, refs, params]) => {
        const paramObservables = components.map(
          (component) => params.get(component.uid) || of(null)
        );

        return combineLatest(paramObservables).pipe(
          map((resolvedParams) =>
            components.map((component, index) => ({
              headerKey: component.title,
              content: refs.get(index),
              id: index,
              headerParams: { param: resolvedParams[index] },
            }))
          )
        );
      })
    );
  }

  tabCompLoaded(componentRef: any, componentId?: string): void {
    this.tabTitleParams.push(componentRef.instance.tabTitleParam$);
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

  protected getTitleParams(children: QueryList<ComponentWrapperDirective>) {
    children.forEach((comp) => {
      this.tabTitleParams.push(comp['cmpRef']?.instance.tabTitleParam$ ?? null);
    });
  }
}
