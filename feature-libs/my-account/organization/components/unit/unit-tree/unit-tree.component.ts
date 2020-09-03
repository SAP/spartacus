import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
  BreakpointService,
  BREAKPOINT,
  NavigationNode,
} from '@spartacus/storefront';
import { ICON_TYPE } from '@spartacus/storefront';
import { RouterState, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-unit-tree',
  templateUrl: './unit-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTreeComponent implements OnDestroy {
  iconType = ICON_TYPE;
  isExpandedNodeMap = {};
  selectedNode: NavigationNode;
  selectedUnitName: string;
  isMobile: boolean;
  private subscriptions = new Subscription();

  @Input()
  node: NavigationNode;

  @Input()
  defaultExpandLevel: number;

  lastPath$ = this.routingService
    .getRouterState()
    .pipe(
      map((state: RouterState) =>
        state.state?.url.split('/').reverse()[0].split('?').shift()
      )
    );

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private breakpointService: BreakpointService,
    protected routingService: RoutingService
  ) {
    this.subscriptions.add(
      this.breakpointService
        .isDown(BREAKPOINT.md)
        .pipe(debounceTime(50), distinctUntilChanged())
        .subscribe((val: boolean) => {
          this.isMobile = val;
          if (this.isMobile) {
            this.isExpandedNodeMap = {};
          } else {
            this.selectedNode = null;
          }
          this.refreshUIWithMappedElements(this.isMobile);
        })
    );
    this.subscriptions.add(
      this.lastPath$.subscribe((path) => {
        this.selectedUnitName = decodeURIComponent(path);
        this.cd.markForCheck();
      })
    );
  }

  mapUlElementToExpand(node: HTMLElement, defaultExpandLevel): void {
    if (node && node.children?.length) {
      const array = Array.from(node.children);

      if (node.dataset?.code) {
        this.isExpandedNodeMap[node.dataset.code] = !!(
          node.dataset?.depth &&
          Number(node.dataset?.depth) <= defaultExpandLevel
        );
      }

      array.forEach((n: HTMLElement) =>
        this.mapUlElementToExpand(n, defaultExpandLevel)
      );
    } else {
      return;
    }
  }

  refreshUIWithMappedElements(isMobile = false, defaultExpandLevel = 0): void {
    const level =
      !isMobile && this.defaultExpandLevel
        ? this.defaultExpandLevel
        : defaultExpandLevel;
    this.mapUlElementToExpand(this.elementRef.nativeElement, level);
    this.cd.detectChanges();
  }

  toggleAriaExpandedForNode(code: string): void {
    this.isExpandedNodeMap[code] = !this.isExpandedNodeMap[code];

    if (!this.isExpandedNodeMap[code]) {
      this.hideElementChildren(code);
    }
  }

  setTreeBranchesState(isExpanded: boolean): void {
    Object.keys(this.isExpandedNodeMap).forEach((k) => {
      this.isExpandedNodeMap[k] = isExpanded;
    });
  }

  hideElementChildren(code: string): void {
    Object.keys(this.isExpandedNodeMap)
      .filter((s) => s.indexOf(code) !== -1)
      .forEach((p) => {
        this.isExpandedNodeMap[p] = false;
      });
  }

  goToUnitNode(unitNode: any): void {
    this.selectedNode = unitNode;
  }

  back(): void {
    const parent = this.findParentNode(this.node, this.selectedNode);
    if (parent && parent.title !== this.node.title) {
      this.selectedNode = parent;
    } else {
      this.selectedNode = null;
    }
  }

  findParentNode(parentWithNodes, selectedNode): NavigationNode {
    let found;
    parentWithNodes.children.some((n) => {
      if (n.title === selectedNode.title) {
        return (found = parentWithNodes);
      }
      if (n.children) {
        return (found = this.findParentNode(n, selectedNode));
      }
    });
    return found || null;
  }

  getNodes(): NavigationNode {
    return this.selectedNode ? this.selectedNode : this.node;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
