/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Facet } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusConfig } from '../../../../../layout/a11y/keyboard-focus/index';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetGroupCollapsedState, FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';
import { filter, take } from 'rxjs/operators';
import { Tab, TabConfig, TAB_MODE } from '../../../../content/tab/Tab';

@Component({
  selector: 'cx-facet-list',
  templateUrl: './facet-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetListComponent implements AfterViewInit {
  private _isDialog: boolean;
  /**
   * Indicates that the facet navigation is rendered in dialog.
   */
  @Input()
  set isDialog(value: boolean) {
    this._isDialog = value;
    if (value) {
      this.renderer.addClass(document.body, 'modal-open');
      this.renderFacets();
    }
  }

  get isDialog(): boolean {
    return this._isDialog;
  }

  @ViewChildren('facetsRef') facetsRef: QueryList<TemplateRef<any>>;

  /** Emits when the list must close */
  @Output() closeList = new EventEmitter();

  /** The list of all facet and values related to the products in the list */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  iconTypes = ICON_TYPE;

  dialogFocusConfig: FocusConfig = {
    trap: true,
    block: true,
    focusOnEscape: true,
    autofocus: 'cx-facet',
  };

  @HostListener('click') handleClick() {
    this.close();
  }

  tabConfig: TabConfig = {
    label: 'Product Facets',
    mode: TAB_MODE.ACCORDIAN,
    openTabs: [0],
  };

  tabs$: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * Toggles the facet group in case it is not expanded.
   */
  expandFacetGroup(facet: Facet, ref: FacetComponent) {
    if (!ref.isExpanded) {
      this.facetService.toggle(facet, ref.isExpanded);
    }
  }

  ngAfterViewInit(): void {
    this.renderFacets();

    // Renders facets on first PLP load on desktop
    this.facetsRef.changes
      .pipe(
        take(1),
        filter((changes) => !!changes)
      )
      .subscribe(() => this.renderFacets());
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

  renderFacets(): void {
    this.facetList$.pipe(take(1)).subscribe((list) => {
      const facets = list.facets;
      const tabs = [];

      for (let i = 0; i < facets?.length; i++) {
        tabs.push({
          header: facets[i].name ?? 'unnamed',
          content: this.facetsRef?.get(i),
        });
      }

      this.tabs$.next(tabs);
      this.changeDetectorRef.detectChanges();
    });
  }

  close(event?: boolean): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.closeList.emit(event);
  }

  block(event?: MouseEvent) {
    event?.stopPropagation();
  }
}
