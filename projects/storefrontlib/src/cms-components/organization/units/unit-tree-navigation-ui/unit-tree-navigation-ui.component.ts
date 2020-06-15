import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
} from '@angular/core';
import { NavigationNode } from '../../../navigation/index';
import { ICON_TYPE } from '../../../misc/icon/index';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cx-unit-tree-navigation-ui',
  templateUrl: './unit-tree-navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTreeNavigationUIComponent implements AfterViewInit {
  iconType = ICON_TYPE;
  isExpandedNodeMap = {};
  selectedNode: NavigationNode;
  private subscriptions = new Subscription();
  private resize = new EventEmitter();

  @Input()
  node: NavigationNode;

  @Input()
  defaultExpandLevel: number;

  @HostListener('window:resize')
  onResize() {
    this.resize.next();
  }

  constructor(private elementRef: ElementRef, protected cd: ChangeDetectorRef) {
    this.subscriptions.add(
      this.resize.pipe(debounceTime(50)).subscribe(() => {
        this.selectedNode = null;
        this.refreshUIWithMappedElements();
      })
    );
  }

  ngAfterViewInit(): void {
    this.refreshUIWithMappedElements();
  }

  mapUlElementToExpand(node: HTMLElement): void {
    if (node && node.children?.length) {
      const array = Array.from(node.children);

      array.forEach((n: HTMLElement) => this.mapUlElementToExpand(n));

      if (node.dataset?.code) {
        this.isExpandedNodeMap[node.dataset.code] = !!(
          node.dataset?.depth &&
          Number(node.dataset?.depth) <= this.defaultExpandLevel
        );
      }
    } else {
      return;
    }
  }

  refreshUIWithMappedElements(): void {
    this.mapUlElementToExpand(this.elementRef.nativeElement);
    this.cd.detectChanges();
  }

  toggleAriaExpandedForNode(code: string): void {
    this.isExpandedNodeMap[code] = !this.isExpandedNodeMap[code];

    if (!this.isExpandedNodeMap[code]) {
      this.hideChildrenListElementLists(code);
    }
  }

  setTreeBranchesState(isExpanded: boolean): void {
    Object.keys(this.isExpandedNodeMap).forEach((k) => {
      this.isExpandedNodeMap[k] = isExpanded;
    });
  }

  hideChildrenListElementLists(code: string): void {
    Object.keys(this.isExpandedNodeMap)
      .filter((s) => s.indexOf(code) !== -1)
      .forEach((p) => {
        this.isExpandedNodeMap[p] = false;
      });
  }

  selectUnitNode(unitNode: any, code: string): void {
    this.isExpandedNodeMap[code] = false;
    this.selectedNode = unitNode;
  }

  back(): void {
    const parent = this.findParentNode(this.node, this.selectedNode);
    if (parent) {
      this.selectedNode = parent;
    } else {
      this.selectedNode = null;
      this.refreshUIWithMappedElements();
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
    return this.selectedNode
      ? this.selectedNode
      : {
          title: '',
          children: [this.node],
        };
  }
}
