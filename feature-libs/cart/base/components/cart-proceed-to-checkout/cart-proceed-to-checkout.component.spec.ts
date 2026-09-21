import { vi } from 'vitest';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { provideMockFeatureToggles } from '@spartacus/core/testing/mock-feature-toggles';
import { ProgressButtonModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartProceedToCheckoutComponent } from './cart-proceed-to-checkout.component';

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

let mockRouterEvents$ = new Subject<Event>();
class MockRouter implements Partial<Router> {
  events = mockRouterEvents$;
  routerState = { snapshot: { root: {} } } as any;
}

const stable$ = new BehaviorSubject<boolean>(true);
class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  isStable(): Observable<boolean> {
    return stable$.asObservable();
  }
}

describe('CartProceedToCheckoutComponent', () => {
  let component: CartProceedToCheckoutComponent;
  let fixture: ComponentFixture<CartProceedToCheckoutComponent>;

  beforeEach(async () => {
    stable$.next(true);
    mockRouterEvents$ = new Subject<Event>();
    await TestBed.configureTestingModule({
      imports: [
        ProgressButtonModule,
        CartProceedToCheckoutComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartFacade,
        },
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: () => {} },
        },
        ...provideMockFeatureToggles({ enableCartSlowNetworkResilience: true }),
      ],
    })
      .overrideComponent(CartProceedToCheckoutComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProceedToCheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should disable button when checkout routing with cart validation is active and enable once navigation is over', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.disableButtonWhileNavigation();
    expect(component.cartValidationInProgress).toEqual(true);
    mockRouterEvents$.next(new NavigationEnd(null, null, null));
    expect(component.cartValidationInProgress).toEqual(false);
  });

  describe('cartUpdating$', () => {
    it('should emit false when cart is stable', () => {
      vi.useFakeTimers();
      try {
        stable$.next(true);
        component.ngOnInit();
        const emissions: boolean[] = [];
        const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));
        // startWith(false) emits the seed; isStable=true means the inverted
        // value matches, so distinctUntilChanged drops it after the debounce.
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false]);
        sub.unsubscribe();
      } finally {
        vi.useRealTimers();
      }
    });

    it('should emit true after debounce when isStable() flips to false', () => {
      vi.useFakeTimers();
      try {
        stable$.next(false);
        component.ngOnInit();
        const emissions: boolean[] = [];
        const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

        expect(emissions).toEqual([false]);
        vi.advanceTimersByTime(249);
        expect(emissions).toEqual([false]);
        vi.advanceTimersByTime(1);
        expect(emissions).toEqual([false, true]);

        // When isStable flips back to true, the gate releases (after debounce).
        stable$.next(true);
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false, true, false]);

        sub.unsubscribe();
        // Drain the safety-valve timer to keep timers clean.
        vi.advanceTimersByTime(10_000);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should release the gate after the safety-valve timeout even when isStable stays false', () => {
      vi.useFakeTimers();
      try {
        stable$.next(false);
        component.ngOnInit();
        const emissions: boolean[] = [];
        const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

        // Advance past the debounce so the gate engages.
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false, true]);

        // Advance to just after the 10s safety valve fires (plus the 250ms
        // debounce that gates the falling edge of !stable && !expired).
        vi.advanceTimersByTime(10_000);
        expect(emissions).toEqual([false, true, false]);

        sub.unsubscribe();
      } finally {
        vi.useRealTimers();
      }
    });

    it('should fire safety-valve at exactly 10_000ms with debounce holding the falling edge', () => {
      vi.useFakeTimers();
      try {
        // Boundary-precise version of the safety-valve test. The state machine is:
        //   t=0      stable=false → !stable && !expired = true (debounced)
        //   t=250    debounce closes; gate engages → emit `true`
        //   t=9_999  timer not yet fired; nothing changed
        //   t=10_000 timer fires expired=true; mapped value flips to false; debounce holds
        //   t=10_250 debounce closes on the falling edge; emit `false`
        stable$.next(false);
        component.ngOnInit();
        const emissions: boolean[] = [];
        const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

        // Gate engages after the debounce window.
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false, true]);

        // 1ms before the timer would fire — still gated.
        vi.advanceTimersByTime(9_749);
        expect(emissions).toEqual([false, true]);

        // Timer fires; mapped value flips to false but debounce holds.
        vi.advanceTimersByTime(1);
        expect(emissions).toEqual([false, true]);

        // Debounce window closes; falling edge emits.
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false, true, false]);

        sub.unsubscribe();
      } finally {
        vi.useRealTimers();
      }
    });

    it('should track a stable → unstable → stable cycle in a single subscriber', () => {
      vi.useFakeTimers();
      try {
        // Single-subscriber cycle: validates that the operator chain handles
        // multiple isStable() flips over time without leaking state between
        // edges. Each edge passes through a 250ms debounce.
        stable$.next(true);
        component.ngOnInit();
        const emissions: boolean[] = [];
        const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

        // Initial: stable=true → seed `false` is the only emission.
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false]);

        // Flip unstable → after 250ms debounce, gate engages.
        stable$.next(false);
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false, true]);

        // Flip stable again → after 250ms debounce, gate releases.
        stable$.next(true);
        vi.advanceTimersByTime(250);
        expect(emissions).toEqual([false, true, false]);

        sub.unsubscribe();
        // Drain the safety-valve timer so timers end clean.
        vi.advanceTimersByTime(10_000);
      } finally {
        vi.useRealTimers();
      }
    });
  });
});

describe('CartProceedToCheckoutComponent — enableCartSlowNetworkResilience OFF', () => {
  let component: CartProceedToCheckoutComponent;
  let fixture: ComponentFixture<CartProceedToCheckoutComponent>;

  beforeEach(async () => {
    stable$.next(false);
    mockRouterEvents$ = new Subject<Event>();
    await TestBed.configureTestingModule({
      imports: [
        ProgressButtonModule,
        CartProceedToCheckoutComponent,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: () => {} },
        },
        ...provideMockFeatureToggles({}),
      ],
    })
      .overrideComponent(CartProceedToCheckoutComponent, {
        remove: { imports: [TranslatePipe, CxDatePipe, UrlPipe] },
        add: { imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProceedToCheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should still emit from cartUpdating$ when cart is unstable (UI suppressed by *cxFeature in template)', () => {
    vi.useFakeTimers();
    try {
      stable$.next(false);
      component.ngOnInit();
      const emissions: boolean[] = [];
      const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

      vi.advanceTimersByTime(250);
      expect(emissions).toEqual([false, true]);

      sub.unsubscribe();
    } finally {
      vi.useRealTimers();
    }
  });
});
