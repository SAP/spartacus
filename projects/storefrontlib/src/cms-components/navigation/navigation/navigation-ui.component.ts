import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { ICON_TYPE } from '../../misc/icon/index';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationUIComponent {
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

  constructor(private router: Router) {
    this.router.events.subscribe(() => this.clear());
  }

  toggleOpen(event: UIEvent): void {
    if (this.openNodes.includes(<HTMLElement>event.currentTarget)) {
      this.openNodes = this.openNodes.filter(n => n !== event.currentTarget);
      (<HTMLElement>event.currentTarget).classList.remove('is-open');
    } else {
      this.openNodes.push(<HTMLElement>event.currentTarget);
    }

    this.updateClasses();

    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  back(): void {
    this.openNodes[this.openNodes.length - 1].classList.remove('is-open');
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
        node.classList.add('is-opened');
        node.classList.remove('is-open');
      } else {
        node.classList.remove('is-opened');
        node.classList.add('is-open');
      }
    });

    this.isOpen = this.openNodes.length > 0;
  }

  getDepth(node: NavigationNode): number {
    let _depth = 0;
    const traverse = (_node: NavigationNode, depth: number) => {
      if (_node.children && _node.children.length > 0) {
        _depth = depth;
        _node.children.forEach(n => traverse(n, depth + 1));
      }
    };
    traverse(node, _depth + 1);
    return _depth;
  }
}
