import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  EscapeFocusConfig,
  EscapeFocusService,
} from '../a11y/keyboard-focus/index';
import { SkipLinkComponent } from '../a11y/skip-link/index';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';

@Component({
  selector: 'cx-storefront',
  templateUrl: './storefront.component.html',
})
export class StorefrontComponent implements OnInit, OnDestroy {
  navigateSubscription: Subscription;
  isExpanded$: Observable<boolean> = this.hamburgerMenuService.isExpanded;

  @HostBinding('class.start-navigating') startNavigating;
  @HostBinding('class.stop-navigating') stopNavigating;

  // required by esc focus
  @HostBinding('tabindex') tabindex = '0';

  @ViewChild(SkipLinkComponent) child: SkipLinkComponent;

  private config: EscapeFocusConfig = {
    focusOnEscape: true,
    focusOnDoubleEscape: true,
  };

  /** controls a polyfill for the lacking focus-visible feature */
  @HostBinding('class.focus-visible') focusVisible = true;
  @HostListener('mousedown') handleMousedown() {
    this.focusVisible = false;
  }
  @HostListener('keydown') handleKeydown() {
    this.focusVisible = true;
  }

  @HostListener('keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    this.service.handleEscape(
      this.elementRef.nativeElement,
      this.config,
      event
    );
  }

  constructor(
    private hamburgerMenuService: HamburgerMenuService,
    private routingService: RoutingService,
    protected elementRef: ElementRef<HTMLElement>,
    protected service: EscapeFocusService
  ) {}

  ngOnInit(): void {
    this.navigateSubscription = this.routingService
      .isNavigating()
      .subscribe(val => {
        this.startNavigating = val === true;
        this.stopNavigating = val === false;
      });
  }

  collapseMenuIfClickOutside(event: MouseEvent) {
    if ((<HTMLElement>event.target).className.includes('is-expanded')) {
      this.collapseMenu();
    }
  }

  collapseMenu(): void {
    this.hamburgerMenuService.toggle(true);
  }

  ngOnDestroy(): void {
    if (this.navigateSubscription) {
      this.navigateSubscription.unsubscribe();
    }
  }
}
