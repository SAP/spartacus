/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Optional,
  inject,
} from '@angular/core';
import {
  B2BUnit,
  FeatureConfigService,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import { B2BUnitTreeNode } from '@spartacus/organization/administration/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { take } from 'rxjs';
import { CellComponent } from '../../../shared/table/cell.component';
import { UnitTreeService } from '../../services/unit-tree.service';

@Component({
  selector: 'cx-org-toggle-link-cell',
  templateUrl: './toggle-link-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLinkCellComponent extends CellComponent {
  @HostBinding('style.--cx-depth-level')
  get depthLevel() {
    return this.model.depthLevel;
  }

  @Optional() protected elementRef = inject(ElementRef, { optional: true });
  @Optional() protected routingService = inject(RoutingService, {
    optional: true,
  });
  @Optional() protected featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected unitTreeService: UnitTreeService
  ) {
    super(outlet);
    useFeatureStyles('a11yUnitsListKeyboardControls');
  }

  get combinedName() {
    return this.property ? `${this.property} (${this.count})` : '';
  }

  get expanded() {
    return this.model.expanded;
  }

  /**
   * Counts the number of descendants
   */
  get count() {
    return this.model.count;
  }

  toggleItem(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.unitTreeService.toggle(this.model as unknown as B2BUnitTreeNode);
  }

  /**
   * Indicates whether the tree item should have a toggle navigation.
   *
   * The toggle navigation is used in case the tree item has descendants,
   * and if the tree item level is not configured to be shown anyway.
   */
  get isSwitchable(): boolean {
    return this.count > 0;
  }

  // TODO: leverage these methods when available from future PR.
  get hasItem(): boolean {
    return !!this.item && Object.keys(this.item).length > 0;
  }

  protected get item(): B2BUnit | null {
    if (!this.outlet.context) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
    return all as B2BUnit;
  }

  onKeydown(event: KeyboardEvent) {
    // TODO: (CXSPA-6804) - Remove feature flag next major release
    if (
      !this.featureConfigService?.isEnabled('a11yUnitsListKeyboardControls')
    ) {
      return;
    }
    const tableElement = this.elementRef?.nativeElement.closest('table');
    const siblingElements = tableElement.querySelectorAll(
      `cx-org-toggle-link-cell a`
    );
    const currentSelectedIndex = Array.from(siblingElements).findIndex(
      (element) => {
        return element === event.target;
      }
    );

    switch (event.key) {
      case 'ArrowDown':
        this.onArrowDown(event, currentSelectedIndex, siblingElements);
        break;
      case 'ArrowUp':
        this.onArrowUp(event, currentSelectedIndex, siblingElements);
        break;
      case 'ArrowRight':
        this.onArrowRight(event);
        break;
      case 'ArrowLeft':
        this.onArrowLeft(event);
        break;
      case ' ':
      case 'Enter':
        this.onSpace(event, siblingElements);
        break;
    }
  }

  onSpace(event: KeyboardEvent, siblingElements: HTMLElement[]): void {
    event.preventDefault();
    siblingElements.forEach((element) => {
      element.tabIndex = -1;
    });
    (event.target as HTMLElement).tabIndex = 0;
    this.routingService
      ?.go({ cxRoute: this.route, params: this.routeModel })
      .then(() => {
        this.restoreFocus();
      });
  }

  onArrowDown(
    event: KeyboardEvent,
    currentSelectedIndex: number,
    siblingElements: HTMLElement[]
  ): void {
    event.preventDefault();
    siblingElements[currentSelectedIndex + 1]?.focus();
  }

  onArrowUp(
    event: KeyboardEvent,
    currentSelectedIndex: number,
    siblingElements: HTMLElement[]
  ): void {
    event.preventDefault();
    siblingElements[currentSelectedIndex + -1]?.focus();
  }

  onArrowRight(event: KeyboardEvent): void {
    if (!this.expanded && this.isSwitchable) {
      this.toggleItem(event);
      this.restoreFocus();
    }
  }

  onArrowLeft(event: KeyboardEvent): void {
    if (this.expanded && this.isSwitchable) {
      this.toggleItem(event);
      this.restoreFocus();
    }
  }

  restoreFocus(): void {
    const focusedElementId = document.activeElement?.id || '';
    this.unitTreeService.treeToggle$.pipe(take(1)).subscribe(() => {
      setTimeout(() => {
        document.getElementById(focusedElementId)?.focus();
      }, 0);
    });
  }
}
