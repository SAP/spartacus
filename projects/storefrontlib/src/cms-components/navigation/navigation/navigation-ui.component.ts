import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
   * The number of child nodes that must be wrapped.
   */
  @Input() wrapAfter: number;

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.validateWrappersAndAlignToRightIfStickOut();
  }

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elemRef: ElementRef
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.clear());
  }

  toggleOpen(event: UIEvent): void {
    const node = <HTMLElement>event.currentTarget;
    if (this.openNodes.includes(node)) {
      this.openNodes = this.openNodes.filter(n => n !== node);
      this.renderer.removeClass(node, 'is-open');
    } else {
      this.openNodes.push(node);
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

  private alignWrapperToRightIfStickOut(navBar, nav) {
    const wrapper = <HTMLElement>nav.getElementsByClassName('wrapper')[0];
    if (wrapper) {
      this.renderer.removeStyle(wrapper, 'margin-left');
      if (
        wrapper.offsetLeft + wrapper.offsetWidth >
        navBar.offsetLeft + navBar.offsetWidth
      ) {
        this.renderer.setStyle(
          wrapper,
          'margin-left',
          `${nav.offsetWidth - wrapper.offsetWidth}px`
        );
      }
    }
  }

  private validateWrappersAndAlignToRightIfStickOut() {
    const navBar = <HTMLElement>this.elemRef.nativeElement;
    const navs = navBar.getElementsByTagName('NAV');
    Array.from(navs).forEach(nav =>
      this.alignWrapperToRightIfStickOut(navBar, nav)
    );
  }

  onMouseEnter(event: UIEvent) {
    const nav = <HTMLElement>event.currentTarget;
    const navBar = <HTMLElement>this.renderer.parentNode(nav);
    this.alignWrapperToRightIfStickOut(navBar, nav);
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
}
