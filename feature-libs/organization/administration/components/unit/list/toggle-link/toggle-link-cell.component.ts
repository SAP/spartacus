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
} from '@angular/core';
import { B2BUnit } from '@spartacus/core';
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

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected unitTreeService: UnitTreeService,
    @Optional() private elementRef: ElementRef
  ) {
    super(outlet);
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

  onFocus(event: FocusEvent) {
    if (this.expanded || !this.isSwitchable) {
      return;
    }

    const focusedElementId = document.activeElement?.id || '';
    this.toggleItem(event);
    this.unitTreeService.treeToggle$.pipe(take(1)).subscribe(() => {
      setTimeout(() => {
        document.getElementById(focusedElementId)?.focus();
      }, 0);
    });
  }

  onKeydown(event: KeyboardEvent) {
    const tableElement = this.elementRef.nativeElement.closest('table');
    const focusedDepth = this.model.depthLevel;
    const siblingElements = tableElement.querySelectorAll(
      `[data-depth="${focusedDepth}"]`
    );
    const currentSelectedIndex = Array.from(siblingElements).findIndex(
      (element) => {
        return element === event.target;
      }
    );

    this.handleTab(event, focusedDepth, tableElement);
    this.handleArrowDown(event, currentSelectedIndex, siblingElements);
    this.handleArrowUp(event, currentSelectedIndex, siblingElements);
  }

  handleTab(
    event: KeyboardEvent,
    focusedDepth: number,
    tableElement: HTMLElement
  ): void {
    if (!(event.key === 'Tab' && this.isSwitchable && !event.shiftKey)) {
      return;
    }
    const firstChild = Array.from(
      tableElement.querySelectorAll(`[data-depth="${focusedDepth + 1}"]`)
    ).find((element) => {
      return this.model.children
        .map((child: TableDataOutletContext) => child.id)
        .includes((element as HTMLElement).id);
    }) as HTMLElement;

    event.preventDefault();
    firstChild.focus();
  }

  handleArrowDown(
    event: KeyboardEvent,
    currentSelectedIndex: number,
    siblingElements: Element[]
  ): void {
    if (
      event.key === 'ArrowDown' &&
      currentSelectedIndex < siblingElements.length - 1
    ) {
      if (this.expanded) {
        this.toggleItem(event);
      }
      event.preventDefault();
      (siblingElements[currentSelectedIndex + 1] as HTMLElement)?.focus();
    }
  }

  handleArrowUp(
    event: KeyboardEvent,
    currentSelectedIndex: number,
    siblingElements: Element[]
  ): void {
    if (event.key === 'ArrowUp' && currentSelectedIndex > 0) {
      if (this.expanded) {
        this.toggleItem(event);
      }
      event.preventDefault();
      (siblingElements[currentSelectedIndex + -1] as HTMLElement)?.focus();
    }
  }
}
