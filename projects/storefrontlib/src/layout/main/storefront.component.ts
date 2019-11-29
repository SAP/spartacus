import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CartAddEvent,
  EventEmitter,
  EventService,
  RoutingService,
  UiEvent,
} from '@spartacus/core';
import { PageLoadEvent } from 'projects/core/src/cms/events/cms-event.model';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(
    private hamburgerMenuService: HamburgerMenuService,
    private routingService: RoutingService,
    protected element: ElementRef,
    eventEmitter: EventEmitter,
    eventService: EventService
  ) {
    eventEmitter.attach(
      UiEvent,
      fromEvent(this.element.nativeElement, 'click').pipe(
        map(UiData => ({ UiData }))
      )
    );

    eventService
      .get(CartAddEvent, UiEvent)
      .subscribe(e => console.log('combined CartAddEvent and UiEvent', e));

    eventService
      .get(CartAddEvent, PageLoadEvent)
      .subscribe(e =>
        console.log('combined CartAddEvent and PageLoadEvent', e)
      );
  }

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
