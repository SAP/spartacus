/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
} from '@angular/core';
import { Facet, FeatureConfigService, FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FocusConfig,
  KeyboardFocusService,
} from '../../../../../layout/a11y/keyboard-focus/index';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetGroupCollapsedState, FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';
import { IconComponent } from '../../../../misc/icon/icon.component';
import { FocusDirective } from '../../../../../layout/a11y/keyboard-focus/focus.directive';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cx-facet-list',
    templateUrl: './facet-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        FocusDirective,
        IconComponent,
        NgFor,
        FacetComponent,
        FeaturesConfigModule,
        AsyncPipe,
        I18nModule,
    ],
})
export class FacetListComponent implements OnInit, OnDestroy {
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
  ) {}

  ngOnInit(): void {
    // TODO: (CXSPA-7321) - Remove feature flag next major release
    if (this.featureConfigService?.isEnabled('a11yFacetsDialogFocusHandling')) {
      this.enableFocusHandlingOnFacetListChanges();
    }
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
