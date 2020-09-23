import { Injectable } from '@angular/core';
import { B2BUnitNode, B2bUnitTreeNode } from '@spartacus/core';
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
  protected minimalExpanded = 1;

  treeToggle$: BehaviorSubject<Map<string, TREE_TOGGLE>> = new BehaviorSubject(
    new Map()
  );

  initialize(root: B2BUnitNode, key: string): void {
    if (key) {
      this.expandUntilActiveNode(root, key);
    }
  }

  collapseAll(unitId: string) {
    this.minimalExpanded = 0;
    this.treeToggle$.next(new Map().set(unitId, TREE_TOGGLE.COLLAPSE_ALL));
  }

  expandAll(unitId: string) {
    this.treeToggle$.next(new Map().set(unitId, TREE_TOGGLE.EXPAND_ALL));
  }

  isExpanded(unitId: string, level: number, parent: TREE_TOGGLE): boolean {
    const toggle = this.treeToggle$.value?.get(unitId);
    return (
      toggle === TREE_TOGGLE.EXPANDED ||
      toggle === TREE_TOGGLE.EXPAND_ALL ||
      parent === TREE_TOGGLE.EXPAND_ALL ||
      (toggle !== TREE_TOGGLE.COLLAPSED && level < this.minimalExpanded) ||
      (toggle === TREE_TOGGLE.COLLAPSE_ALL && level < this.minimalExpanded)
    );
  }

  toggle(unit: B2bUnitTreeNode) {
    const treeState = this.treeToggle$.value;
    const currentState =
      treeState.get(unit.uid) === TREE_TOGGLE.EXPANDED
        ? TREE_TOGGLE.COLLAPSED
        : TREE_TOGGLE.EXPANDED;
    treeState.set(unit.uid, currentState);
    this.treeToggle$.next(treeState);
  }

  getToggleState(unitId): TREE_TOGGLE {
    return this.treeToggle$.value?.get(unitId);
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
