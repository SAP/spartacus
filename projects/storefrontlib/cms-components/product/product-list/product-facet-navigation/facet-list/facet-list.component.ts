/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewChild,
  inject,
  AfterViewInit,
  ViewChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Facet, FeatureConfigService, useFeatureStyles } from '@spartacus/core';
import { Tab, TabConfig, TAB_MODE } from '../../../../content/tab/tab.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import {
  FocusConfig,
  KeyboardFocusService,
} from '../../../../../layout/a11y/keyboard-focus/index';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetGroupCollapsedState, FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet-list',
  templateUrl: './facet-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetListComponent implements OnInit, OnDestroy, AfterViewInit {
  protected subscriptions = new Subscription();
  private _isDialog: boolean;

  @ViewChild('backToResultsBtn')
  backToResultsBtn: ElementRef<HTMLButtonElement>;

  /**
   * Indicates that the facet navigation is rendered in dialog.
   */
  @Input()
  set isDialog(value: boolean) {
    this._isDialog = value;
    if (value) {
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  get isDialog(): boolean {
    return this._isDialog;
  }

  /** Emits when the list must close */
  @Output() closeList = new EventEmitter();

  /** The list of all facet and values related to the products in the list */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  iconTypes = ICON_TYPE;

  dialogFocusConfig: FocusConfig = {
    trap: true,
    block: true,
    focusOnEscape: true,
    autofocus: 'cx-facet > button',
  };

  tabConfig: TabConfig = {
    label: 'productFacetNavigation.productFacets',
    mode: TAB_MODE.ACCORDIAN,
    openTabs: [0],
    restrictDirectionKeys: true,
  };

  tabs$: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);

  @ViewChildren('facetsRef') facetsRef: QueryList<TemplateRef<any>>;

  @HostListener('click') handleClick() {
    this.close();
  }
  @Optional() focusService = inject(KeyboardFocusService, { optional: true });
  @Optional() featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
    useFeatureStyles('a11yTabComponent');
  }

  ngOnInit(): void {
    // TODO: (CXSPA-7321) - Remove feature flag next major release
    if (this.featureConfigService?.isEnabled('a11yFacetsDialogFocusHandling')) {
      this.enableFocusHandlingOnFacetListChanges();
    }

    // Required to load facets when initial load in side panel.
    this.updateTabs();
  }

  ngAfterViewInit(): void {
    // Required to render facets when opening filters dialog.
    this.updateTabs();

    // Required to render facet changes (ie. select facet, etc)
    this.subscriptions.add(
      this.facetsRef.changes
        .pipe(filter((changes) => !!changes))
        .subscribe(() => {
          this.updateTabs();
        })
    );
  }

  updateTabs(): void {
    this.facetList$.pipe(take(1)).subscribe((list) => {
      const facets = list.facets;
      const tabs = facets.map((facet, i) => ({
        header: facet.name,
        content: this.facetsRef?.get(i),
        disableBorderFocus: true,
      }));

      this.tabs$.next(tabs);
    });
  }

  /**
   * Toggles the facet group in case it is not expanded.
   */
  expandFacetGroup(facet: Facet, ref: FacetComponent) {
    if (!ref.isExpanded) {
      this.facetService.toggle(facet, ref.isExpanded);
    }
  }

  /**
   * Indicates that the facet group has been expanded.
   */
  isExpanded(facet: Facet): Observable<boolean> {
    return this.facetService
      .getState(facet)
      .pipe(
        map((value) => value.toggled === FacetGroupCollapsedState.EXPANDED)
      );
  }

  /**
   * Indicates that the facet group has been collapsed.
   */
  isCollapsed(facet: Facet): Observable<boolean> {
    return this.facetService
      .getState(facet)
      .pipe(
        map((value) => value.toggled === FacetGroupCollapsedState.COLLAPSED)
      );
  }

  close(event?: boolean): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.closeList.emit(event);
  }

  block(event?: MouseEvent) {
    event?.stopPropagation();
  }

  protected enableFocusHandlingOnFacetListChanges(): void {
    this.subscriptions.add(
      this.facetService.facetList$.subscribe((facetList) =>
        this.handleDialogFocus(facetList.facets)
      )
    );
  }

  protected handleDialogFocus(facets: Facet[]): void {
    // Only apply new focus for the dialog view
    if (!this.isDialog) {
      return;
    }

    const focusKey = this.focusService?.get();
    if (!focusKey) {
      return;
    }

    const focusedFacet = facets.find((facet) =>
      facet.values?.some((value) => {
        return value.name === focusKey;
      })
    );
    if (focusedFacet) {
      return;
    }

    if (!facets?.length) {
      // If there are no facets to display then focus on the "Back To Results" button
      this.backToResultsBtn?.nativeElement.focus();
      this.focusService?.clear();
      return;
    }

    const firstAvailableFacet = facets[0];
    this.focusService?.set(firstAvailableFacet.name);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
