import { Injectable } from '@angular/core';
import {
  B2BUnitNode,
  B2BUnitTreeNode,
} from '@spartacus/organization/administration/core';
import { BehaviorSubject } from 'rxjs';
import { TREE_TOGGLE } from './unit-tree.model';

/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitTreeService {
  /**
   * Indicates the minimum number of (initial) expanded units.
   */
  protected minimalExpanded = 1;

  protected globalToggle$: BehaviorSubject<TREE_TOGGLE> = new BehaviorSubject(
    undefined
  );

  treeToggle$: BehaviorSubject<Map<string, TREE_TOGGLE>> = new BehaviorSubject(
    new Map()
  );

  /**
   * Initializes the unit tree with an active unit.
   *
   * The active unit will be collapsed.
   */
  initialize(root: B2BUnitNode, activeUnitId: string): void {
    if (activeUnitId) {
      this.expandUntilActiveNode(root, activeUnitId);
    }
  }

  /**
   * Sets the global toggle state to _collapsed_ and clears the toggle state
   * for individual units.
   */
  collapseAll() {
    this.globalToggle$.next(TREE_TOGGLE.COLLAPSED);
    this.treeToggle$.next(new Map());
  }

  /**
   * Sets the global toggle state to _expanded_ and clears the toggle state
   * for individual units.
   */
  expandAll() {
    this.globalToggle$.next(TREE_TOGGLE.EXPANDED);
    this.treeToggle$.next(new Map());
  }

  /**
   * Indicates whether the give unit is expanded.
   *
   * The returned (boolean) expand state is driven by the global toggle
   * state (expand / collapse all) and the toggle state for individual units.
   * There's also the `minimalExpanded` taken into consideration.
   */
  isExpanded(unitId: string, level: number): boolean {
    const toggleState = this.treeToggle$.value?.get(unitId);

    if (
      this.globalToggle$.value === TREE_TOGGLE.COLLAPSED &&
      toggleState !== TREE_TOGGLE.EXPANDED
    ) {
      return false;
    }

    return (
      // the current node is expanded
      toggleState === TREE_TOGGLE.EXPANDED ||
      // the node is not collapsed, but globally expanded ("expand all") or above
      // the minimum visible nodes
      ((this.globalToggle$.value === TREE_TOGGLE.EXPANDED ||
        level < this.minimalExpanded) &&
        toggleState !== TREE_TOGGLE.COLLAPSED)
    );
  }

  toggle(unit: B2BUnitTreeNode) {
    const currentState = this.treeToggle$.value;
    currentState.set(
      unit.id,
      this.isExpanded(unit.id, unit.depthLevel)
        ? TREE_TOGGLE.COLLAPSED
        : TREE_TOGGLE.EXPANDED
    );
    this.treeToggle$.next(currentState);
  }

  /**
   * Expands all tree nodes till the active unit, to ensure that the
   * full tree is collapsed till the active item.
   *
   * This is useful while navigating the tree by the router.
   */
  protected expandUntilActiveNode(node: B2BUnitNode, activeUnitId: string) {
    const hasActiveChild = (n: B2BUnitNode, id: string): boolean =>
      !!n.children?.find(
        (child) => child.id === id || hasActiveChild(child, id)
      );

    const findInvolvedTreeNodes = (
      n: B2BUnitNode,
      activeItems = []
    ): string[] => {
      if (hasActiveChild(n, activeUnitId)) {
        activeItems.push(n.id);
      }
      n.children.forEach((child) => {
        findInvolvedTreeNodes(child, activeItems);
      });
      return activeItems;
    };

    const m = this.treeToggle$.value;
    findInvolvedTreeNodes(node).forEach((activeId) => {
      if (m.get(activeId) !== TREE_TOGGLE.EXPANDED) {
        m.set(activeId, TREE_TOGGLE.EXPANDED);
      }
    });
    if (m !== this.treeToggle$.value) {
      this.treeToggle$.next(m);
    }
  }
}
