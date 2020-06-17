import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { NavigationNode } from '../../../navigation/navigation/navigation-node.model';
import { ICON_TYPE } from '../../../misc/icon';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';

@Component({
  selector: 'cx-unit-tree-navigation-ui',
  templateUrl: './unit-tree-navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTreeNavigationUIComponent implements OnDestroy {
  iconType = ICON_TYPE;
  isExpandedNodeMap = {};
  selectedNode: NavigationNode;
  isMobile: boolean;
  private subscriptions = new Subscription();

  @Input()
  node: NavigationNode;

  @Input()
  defaultExpandLevel: number;

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private breakpointService: BreakpointService
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
