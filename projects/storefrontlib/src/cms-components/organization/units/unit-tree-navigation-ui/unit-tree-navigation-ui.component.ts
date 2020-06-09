import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { NavigationNode } from '../../../navigation/index';
import { ICON_TYPE } from '../../../misc/icon/index';

@Component({
  selector: 'cx-unit-tree-navigation-ui',
  templateUrl: './unit-tree-navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTreeNavigationUIComponent implements AfterViewInit {
  @Input()
  node: NavigationNode;

  iconType = ICON_TYPE;
  isExpandedNodeMap = {};
  rootCodeName = 'unit_tree';

  constructor(
    private elementRef: ElementRef,
    protected cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.mapUlElementToExpand(this.elementRef.nativeElement);
    this.cd.detectChanges();
  }

  mapUlElementToExpand(node: HTMLElement): void {
    if (node && node.children?.length) {
      const array = Array.from(node.children);

      array.forEach((n: HTMLElement) => this.mapUlElementToExpand(n));

      if (node.dataset?.code) {
        this.isExpandedNodeMap[node.dataset.code] = false;
      }
    } else {
      return;
    }
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
}
