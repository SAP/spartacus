/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Facet,
  FacetValue,
  FeatureDirective,
  TranslatePipe,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import {
  FocusDirective,
  disableTabbingForTick,
} from '../../../../../layout/a11y';
import { FocusDirective as FocusDirective_1 } from '../../../../../layout/a11y/keyboard-focus/focus.directive';
import { AtMessageDirective } from '../../../../../shared/components/assistive-technology-message/assistive-technology-message.directive';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FocusDirective_1,
    FeatureDirective,
    AtMessageDirective,
    AsyncPipe,
    SlicePipe,
    TranslatePipe,
  ],
})
export class FacetComponent implements AfterViewInit {
  protected _facet: Facet;

  state$: Observable<FacetCollapseState>;
  /** configurable icon that is used to collapse the facet group  */
  @Input() expandIcon: ICON_TYPE = ICON_TYPE.EXPAND;
  @Input() collapseIcon: ICON_TYPE = ICON_TYPE.COLLAPSE;

  @HostBinding('class.multi-select') isMultiSelect: boolean;

  @ViewChildren('facetValue') values: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(FocusDirective) keyboardFocus: FocusDirective;

  @ViewChild('facetHeader') facetHeader: ElementRef<HTMLElement>;

  @Input()
  set facet(value: Facet) {
    this._facet = value;
    this.isMultiSelect = !!value.multiSelect;
    this.state$ = this.facetService.getState(value);
  }

  get facet(): Facet {
    return this._facet;
  }

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    // Update the value of `this.isExpanded` after `this.values` was initialized
    this.cd.detectChanges();
  }

  /**
   * @deprecated: Header will no longer be used in favour of TabComponent headers.
   *
   * Handles clicking the heading of the facet group, which means toggling
   * the visibility of the group (collapse / expand) and optionally focusing
   * the group.
   */
  toggleGroup(event: UIEvent) {
    const host: HTMLElement = this.elementRef.nativeElement;
    const isLocked = this.keyboardFocus?.isLocked;

    this.facetService.toggle(this.facet, this.isExpanded);

    if (!isLocked || this.isExpanded) {
      host.focus();
      // we stop propagating the event as otherwise the focus on the host will trigger
      // an unlock event from the LockFocus directive.
      event.stopPropagation();
    }
  }

  get isExpanded(): boolean {
    return this.values?.first?.nativeElement.offsetParent !== null;
  }

  openLink(event: KeyboardEvent) {
    (event.target as HTMLElement).click();
    event.preventDefault();
  }

  /**
   * Increases the number of visible values for the facet. This is delegated
   * to `facetService.increaseVisibleValues`.
   */
  increaseVisibleValues(): void {
    this.facetService.increaseVisibleValues(this.facet);
  }

  /**
   * Decreases the number of visible values for the facet. This is delegated
   * to `facetService.decreaseVisibleValues`.
   */
  decreaseVisibleValues(): void {
    this.facetService.decreaseVisibleValues(this.facet);
  }

  getLinkParams(value: FacetValue) {
    return this.facetService.getLinkParams(value.query?.query?.value ?? '');
  }

  onKeydown(event: KeyboardEvent): void {
    const targetIndex = this.values.toArray().findIndex((el) => {
      return el.nativeElement === event.target;
    });
    switch (event.key) {
      case 'ArrowDown':
        this.onArrowDown(event, targetIndex);
        break;
      case 'ArrowUp':
        this.onArrowUp(event, targetIndex);
        break;
      case 'Tab':
        this.onTabNavigation();
        break;
    }
  }

  /**
   * We temporarily disable tabbing for the facet values.
   * This is to use proper keyboard navigation keys(ArrowUp/ArrowDown) for navigating through the facet values.
   */
  protected onTabNavigation(): void {
    disableTabbingForTick(this.values.map((el) => el.nativeElement));
  }

  onArrowDown(event: Event, targetIndex: number): void {
    event.preventDefault();
    this.values.get(targetIndex + 1)?.nativeElement.focus();
  }

  onArrowUp(event: Event, targetIndex: number): void {
    event.preventDefault();
    this.values.get(targetIndex - 1)?.nativeElement.focus();
  }
}
