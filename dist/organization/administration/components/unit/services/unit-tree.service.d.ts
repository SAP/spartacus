import { B2BUnitNode, B2BUnitTreeNode } from '@spartacus/organization/administration/core';
import { BehaviorSubject } from 'rxjs';
import { TREE_TOGGLE } from './unit-tree.model';
import * as i0 from "@angular/core";
/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
export declare class UnitTreeService {
    /**
     * Indicates the minimum number of (initial) expanded units.
     */
    protected minimalExpanded: number;
    protected globalToggle$: BehaviorSubject<TREE_TOGGLE | undefined>;
    treeToggle$: BehaviorSubject<Map<string, TREE_TOGGLE>>;
    /**
     * Initializes the unit tree with an active unit.
     *
     * The active unit will be collapsed.
     */
    initialize(root: B2BUnitNode, activeUnitId: string): void;
    /**
     * Sets the global toggle state to _collapsed_ and clears the toggle state
     * for individual units.
     */
    collapseAll(): void;
    /**
     * Sets the global toggle state to _expanded_ and clears the toggle state
     * for individual units.
     */
    expandAll(): void;
    /**
     * Indicates whether the give unit is expanded.
     *
     * The returned (boolean) expand state is driven by the global toggle
     * state (expand / collapse all) and the toggle state for individual units.
     * There's also the `minimalExpanded` taken into consideration.
     */
    isExpanded(unitId: string, level: number): boolean;
    toggle(unit: B2BUnitTreeNode): void;
    /**
     * Expands all tree nodes till the active unit, to ensure that the
     * full tree is collapsed till the active item.
     *
     * This is useful while navigating the tree by the router.
     */
    protected expandUntilActiveNode(node: B2BUnitNode, activeUnitId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitTreeService>;
}
