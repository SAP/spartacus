import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
  Renderer2,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/index';
import { NavigationNode } from './navigation-node.model';

const COLUMN_SIZE = 10;

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationUIComponent implements OnChanges {
  /**
   * The navigation node to render.
   */
  @Input() node: NavigationNode;

  /**
   * the icon type that will be used for navigation nodes
   * with children.
   */
  iconType = ICON_TYPE;

  /**
   * Indicates whether the navigation should support flyout.
   * If flyout is set to true, the
   * nested child navitation nodes will only appear on hover or focus.
   */
  @Input() @HostBinding('class.flyout') flyout = true;

  @Input() @HostBinding('class.is-open') isOpen = false;

  private openNodes: HTMLElement[] = [];

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.clear());
  }

  toggleOpen(event: UIEvent): void {
    if (this.openNodes.includes(<HTMLElement>event.currentTarget)) {
      this.openNodes = this.openNodes.filter(n => n !== event.currentTarget);
      this.renderer.removeClass(<HTMLElement>event.currentTarget, 'is-open');
    } else {
      this.openNodes.push(<HTMLElement>event.currentTarget);
    }

    this.updateClasses();

    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  back(): void {
    this.renderer.removeClass(
      this.openNodes[this.openNodes.length - 1],
      'is-open'
    );
    this.openNodes.pop();
    this.updateClasses();
  }

  clear(): void {
    this.openNodes = [];
    this.updateClasses();
  }

  private updateClasses(): void {
    this.openNodes.forEach((node, i) => {
      if (i + 1 < this.openNodes.length) {
        this.renderer.addClass(node, 'is-opened');
        this.renderer.removeClass(node, 'is-open');
      } else {
        this.renderer.removeClass(node, 'is-opened');
        this.renderer.addClass(node, 'is-open');
      }
    });

    this.isOpen = this.openNodes.length > 0;
  }

  getDepth(node: NavigationNode, depth = 0): number {
    if (node.children && node.children.length > 0) {
      return Math.max(...node.children.map(n => this.getDepth(n, depth + 1)));
    } else {
      return depth;
    }
  }

  // Recursively break nodes with more than COLUMN_SIZE into sub nodes to create columns
  breakNodesIntoColumns(
    node: NavigationNode,
    columnSize: number
  ): NavigationNode {
    if (node.hasOwnProperty('children')) {
      // Check if too many children for column
      if (node.children.length > columnSize) {
        const clonedNode: NavigationNode = { ...node };
        node.children = [];
        // Break node into subnodes with children length of columnSize
        while (clonedNode.children.length > 0) {
          const newSubNode: NavigationNode = { title: null, children: [] };
          newSubNode.children.push(
            ...clonedNode.children.splice(0, columnSize)
          );
          node.children.push(newSubNode);
        }
      }

      // Recursively do the same with child nodes
      node.children.forEach(child => {
        child = this.breakNodesIntoColumns(child, columnSize);
      });
    }

    return node;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Recursively break into columns once node exists on component
    if (changes.node.currentValue) {
      this.node = this.breakNodesIntoColumns(this.node, COLUMN_SIZE);
    }
  }
}
