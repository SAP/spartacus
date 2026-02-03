/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  FeatureConfigService,
  TranslatePipe,
  useFeatureStyles,
  WindowRef,
} from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
} from 'rxjs/operators';
import { BREAKPOINT, BreakpointService } from '../../../layout';
import { GenericLinkComponent } from '../../../shared/components/generic-link/generic-link.component';
import { IconComponent } from '../../misc/icon/icon.component';
import { ICON_TYPE } from '../../misc/icon/index';
import { HamburgerMenuService } from './../../../layout/header/hamburger-menu/hamburger-menu.service';
import { NavigationNode } from './navigation-node.model';

const ARIA_EXPANDED_ATTR = 'aria-expanded';
@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    IconComponent,
    NgFor,
    NgTemplateOutlet,
    GenericLinkComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class NavigationUIComponent implements OnInit, OnDestroy {
  /**
   * The navigation node to render.
   */
  @Input() node: NavigationNode | null;

  /**
   * The number of child nodes that must be wrapped.
   */
  @Input() wrapAfter: number;

  /**
   * Flag indicates whether to reset the state of menu navigation (ie. Collapse all submenus) when the menu is closed.
   */
  @Input() resetMenuOnClose: boolean | undefined;

  /**
   * Include non intractable node titles within the tabbing order.
   */
  @Input() focusableNodeTitles: boolean = false;

  @Input() navAriaLabel: string | null | undefined;
  /**
   * the icon type that will be used for navigation nodes
   * with children.
   */
  iconType = ICON_TYPE;

  /**
   * Indicates whether the navigation should support flyout.
   * If flyout is set to true, the
   * nested child navigation nodes will only appear on hover or focus.
   */
  @Input() @HostBinding('class.flyout') flyout = true;

  @Input() @HostBinding('class.is-open') isOpen = false;

  private openNodes: HTMLElement[] = [];
  private subscriptions = new Subscription();
  private resize = new EventEmitter();
  protected arrowControls: Subject<KeyboardEvent> = new Subject();

  @HostListener('window:resize')
  onResize() {
    this.resize.next(undefined);
  }

  @HostListener('document:keydown.ArrowUp', ['$event'])
  @HostListener('document:keydown.ArrowDown', ['$event'])
  onArrow(e: KeyboardEvent) {
    this.arrowControls.next(e);
  }

  protected breakpointService = inject(BreakpointService);
  isDesktop$ = this.breakpointService.isUp(BREAKPOINT.lg);

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elemRef: ElementRef,
    protected hamburgerMenuService: HamburgerMenuService,
    protected winRef: WindowRef,
    @Optional() protected featureConfigService?: FeatureConfigService
  ) {
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => this.clear())
    );
    this.subscriptions.add(
      this.resize.pipe(debounceTime(50)).subscribe(() => {
        this.alignWrappersToRightIfStickOut();
      })
    );
    useFeatureStyles('a11yOptimizedMenuSpacing');
  }

  /**
   * During initialization of this component, we will check the resetMenuOnClose flag and attach a menu reset listener if needed.
   */
  ngOnInit() {
    if (this.resetMenuOnClose) {
      this.resetOnMenuCollapse();
    }
  }

  /**
   * This method performs the action of resetting the menu (close all sub menus and return to main options)
   * when the menu is closed.
   */
  resetOnMenuCollapse(): void {
    this.subscriptions.add(
      this.hamburgerMenuService?.isExpanded
        .pipe(distinctUntilChanged(), filter(Boolean))
        .subscribe(() => {
          this.reinitializeMenu();
        })
    );
  }

  closeIfClickedTheSameLink(navNode: NavigationNode): void {
    if (
      typeof navNode.url === 'string' &&
      this.winRef.nativeWindow?.location.href.includes(navNode.url)
    ) {
      this.reinitializeMenu();
      if (
        this.featureConfigService?.isEnabled(
          'navigationMenuCloseOnSameLinkClick'
        )
      ) {
        this.hamburgerMenuService.toggle(true);
      } else {
        this.hamburgerMenuService.toggle();
      }
    }
  }

  /**
   * This method performs the actions required to reset the state of the menu and reset any visual components.
   */
  reinitializeMenu(): void {
    const listItems = this.elemRef.nativeElement.querySelectorAll(
      'li.is-open:not(.back), li.is-opened'
    );

    listItems.forEach((el: HTMLElement) => {
      Array.from(el.children)
        .filter((childNode) => childNode?.tagName === 'BUTTON')
        .forEach((childNode) => {
          this.renderer.setAttribute(childNode, ARIA_EXPANDED_ATTR, 'false');
        });
    });
    listItems.forEach((el: HTMLElement) => {
      this.renderer.removeClass(el, 'is-open');
      this.renderer.removeClass(el, 'is-opened');
    });
    this.clear();
    this.renderer.removeClass(this.elemRef.nativeElement, 'is-open');
    this.updateClasses();
  }

  protected ariaCollapseNodes(): void {
    this.openNodes.forEach((parentNode) => {
      Array.from(parentNode.children)
        .filter((childNode) => childNode?.tagName === 'BUTTON')
        .forEach((childNode) => {
          this.renderer.setAttribute(childNode, ARIA_EXPANDED_ATTR, 'false');
        });
    });
  }

  toggleOpen(event: UIEvent): void {
    if (event.type === 'keydown') {
      event.preventDefault();
    }
    this.ariaCollapseNodes();
    const node = <HTMLElement>event.currentTarget;
    const parentNode = <HTMLElement>node.parentNode;
    if (this.openNodes.includes(parentNode)) {
      if (event.type === 'keydown') {
        this.back();
      } else {
        this.openNodes = this.openNodes.filter((n) => n !== parentNode);
        this.renderer.removeClass(parentNode, 'is-open');
      }
    } else {
      this.openNodes.push(parentNode);
      this.renderer.setAttribute(node, ARIA_EXPANDED_ATTR, 'true');
    }

    this.updateClasses();

    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  /**
   * Opens dropdown and starts keyboard navigation
   */
  onSpace(event: UIEvent): void {
    this.hamburgerMenuService.isExpanded
      .pipe(take(1))
      .subscribe((isExpanded) => {
        if (isExpanded) {
          this.toggleOpen(event);
          return;
        }
        if (!this.openNodes.length) {
          this.toggleOpen(event);
          return;
        }
        event.preventDefault();
      });
    this.focusOnNode(event);
    this.setupArrowControls();
  }

  /**
   * Subscribes to arrow keys and enables navigation between dropdown items
   */
  setupArrowControls(): void {
    this.subscriptions.add(
      this.arrowControls.subscribe((e) => {
        e.preventDefault();
        const parentElement = (<HTMLElement>e.target).parentElement
          ?.parentElement;
        const nextLink = parentElement?.nextElementSibling?.querySelector('a');
        const previousLink =
          parentElement?.previousElementSibling?.querySelector('a');
        e.code === 'ArrowDown' ? nextLink?.focus() : previousLink?.focus();
      })
    );
  }

  /**
   * Focuses on the first focusable element in the dropdown
   */
  focusOnNode(event: UIEvent): void {
    const firstFocusableNode = (<HTMLElement>(
      event.target
    ))?.nextElementSibling?.querySelector('button, h4, a') as HTMLElement;
    firstFocusableNode?.focus();
  }

  back(): void {
    if (this.openNodes[this.openNodes.length - 1]) {
      this.renderer.removeClass(
        this.openNodes[this.openNodes.length - 1],
        'is-open'
      );
      const removedNode = this.openNodes.pop();
      setTimeout(() => {
        (
          removedNode?.querySelector('[aria-haspopup="true"]') as HTMLElement
        ).focus();
      }, 0);
      this.updateClasses();
    }
  }

  clear(): void {
    this.openNodes = [];
    this.updateClasses();
  }

  onMouseEnter(event: MouseEvent) {
    this.alignWrapperToRightIfStickOut(<HTMLElement>event.currentTarget);
    this.focusAfterPreviousClicked(event);
  }

  getTotalDepth(node: NavigationNode, depth = 0): number {
    if (node.children && node.children.length > 0) {
      return Math.max(
        ...node.children.map((n) => this.getTotalDepth(n, depth + 1))
      );
    } else {
      return depth;
    }
  }

  getColumnCount(length: number): number {
    if (!this.wrapAfter || length <= 0) {
      return 1;
    }

    let subSectionColumns = Math.floor(length / this.wrapAfter);

    if (subSectionColumns >= 1 && length % this.wrapAfter > 0) {
      subSectionColumns += 1;
    }

    return subSectionColumns;
  }

  focusAfterPreviousClicked(event: MouseEvent) {
    const target: HTMLElement = <HTMLElement>(
      (event.target || event.relatedTarget)
    );
    if (
      target.ownerDocument.activeElement?.matches('nav[tabindex]') &&
      target.parentElement?.matches('.flyout')
    ) {
      target.focus();
    }
    return target.ownerDocument;
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private alignWrapperToRightIfStickOut(node: HTMLElement) {
    const wrapper = <HTMLElement>node.querySelector('.wrapper');
    const body = <HTMLElement>node.closest('body');
    if (wrapper) {
      this.renderer.removeStyle(wrapper, 'margin-left');
      if (
        wrapper.offsetLeft + wrapper.offsetWidth >
        body.offsetLeft + body.offsetWidth
      ) {
        this.renderer.setStyle(
          wrapper,
          'margin-left',
          `${node.offsetWidth - wrapper.offsetWidth}px`
        );
      }
    }
  }

  private alignWrappersToRightIfStickOut() {
    const navs = <HTMLCollection>this.elemRef.nativeElement.childNodes;
    Array.from(navs)
      .filter((node) => node.tagName === 'LI')
      .forEach((nav) => this.alignWrapperToRightIfStickOut(<HTMLElement>nav));
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

  /**
   * Restores default tabbing order for non flyout navigation.
   */
  getTabIndex(node: NavigationNode, depth: number): 0 | -1 {
    if (!this.flyout) {
      return 0;
    }
    return depth > 0 && !node?.children ? -1 : 0;
  }

  transformIntoValidID(string: string): string | null {
    return string?.replace(/[^a-zA-Z0-9-_]/g, '-') || null;
  }
}
