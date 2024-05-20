/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { Facet, FacetValue, FeatureConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FocusDirective } from '../../../../../layout/a11y/keyboard-focus/focus.directive';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetComponent {
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

  @Optional() featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  // TODO: (CXSPA-6892) - Remove getter next major release.
  /** Temporary getter, not ment for public use */
  get isFacetKeyboardNavigationEnabled(): boolean {
    return !!this.featureConfigService?.isEnabled(
      'a11yFacetKeyboardNavigation'
    );
  }

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef
  ) {}

  /**
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
    // TODO: (CXSPA-6892) - Remove feature flag next major release.
    if (!this.isFacetKeyboardNavigationEnabled) {
      return;
    }
    const targetIndex = this.values.toArray().findIndex((el) => {
      return el.nativeElement === event.target;
    });
    switch (event.key) {
      case 'ArrowLeft':
        this.onArrowLeft(event);
        break;
      case 'ArrowRight':
        this.onArrowRight(event);
        break;
      case 'ArrowDown':
        this.onArrowDown(event, targetIndex);
        break;
      case 'ArrowUp':
        this.onArrowUp(event, targetIndex);
        break;
    }
  }

  onArrowRight(event: Event): void {
    if (!this.isExpanded) {
      this.toggleGroup(event as UIEvent);
    }
  }

  onArrowLeft(event: Event): void {
    if (this.isExpanded) {
      this.toggleGroup(event as UIEvent);
      this.facetHeader.nativeElement.focus();
    }
  }

  onArrowDown(event: Event, targetIndex: number): void {
    if (this.isExpanded) {
      event.preventDefault();
      if (event.target === this.facetHeader.nativeElement) {
        this.values?.first?.nativeElement.focus();
        return;
      }
      this.values.get(targetIndex + 1)?.nativeElement.focus();
    }
  }

  onArrowUp(event: Event, targetIndex: number): void {
    if (this.isExpanded) {
      event.preventDefault();
      this.values.get(targetIndex - 1)?.nativeElement.focus();
    }
  }
}
