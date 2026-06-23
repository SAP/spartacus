import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  FeatureConfigService,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ProgressButtonModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartProceedToCheckoutComponent } from './cart-proceed-to-checkout.component';
import createSpy = jasmine.createSpy;

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

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isEnabled(flag: string): boolean {
    return flag === 'enableCartSlowNetworkResilience';
  }
}

describe('CartProceedToCheckoutComponent', () => {
  let component: CartProceedToCheckoutComponent;
  let fixture: ComponentFixture<CartProceedToCheckoutComponent>;

  beforeEach(waitForAsync(() => {
    stable$.next(true);
    mockRouterEvents$ = new Subject<Event>();
    TestBed.configureTestingModule({
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
          useValue: { markForCheck: createSpy('markForCheck') },
        },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
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
  }));

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
    it('should emit false when cart is stable', fakeAsync(() => {
      stable$.next(true);
      component.ngOnInit();
      const emissions: boolean[] = [];
      const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));
      // startWith(false) emits the seed; isStable=true means the inverted
      // value matches, so distinctUntilChanged drops it after the debounce.
      tick(250);
      expect(emissions).toEqual([false]);
      sub.unsubscribe();
    }));

    it('should emit true after debounce when isStable() flips to false', fakeAsync(() => {
      stable$.next(false);
      component.ngOnInit();
      const emissions: boolean[] = [];
      const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

      expect(emissions).toEqual([false]);
      tick(249);
      expect(emissions).toEqual([false]);
      tick(1);
      expect(emissions).toEqual([false, true]);

      // When isStable flips back to true, the gate releases (after debounce).
      stable$.next(true);
      tick(250);
      expect(emissions).toEqual([false, true, false]);

      sub.unsubscribe();
      // Drain the safety-valve timer to keep fakeAsync clean.
      tick(10_000);
    }));

    it('should release the gate after the safety-valve timeout even when isStable stays false', fakeAsync(() => {
      stable$.next(false);
      component.ngOnInit();
      const emissions: boolean[] = [];
      const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

      // Advance past the debounce so the gate engages.
      tick(250);
      expect(emissions).toEqual([false, true]);

      // Advance to just after the 10s safety valve fires (plus the 250ms
      // debounce that gates the falling edge of !stable && !expired).
      tick(10_000);
      expect(emissions).toEqual([false, true, false]);

      sub.unsubscribe();
    }));

    it('should fire safety-valve at exactly 10_000ms with debounce holding the falling edge', fakeAsync(() => {
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
      tick(250);
      expect(emissions).toEqual([false, true]);

      // 1ms before the timer would fire — still gated.
      tick(9_749);
      expect(emissions).toEqual([false, true]);

      // Timer fires; mapped value flips to false but debounce holds.
      tick(1);
      expect(emissions).toEqual([false, true]);

      // Debounce window closes; falling edge emits.
      tick(250);
      expect(emissions).toEqual([false, true, false]);

      sub.unsubscribe();
    }));

    it('should track a stable → unstable → stable cycle in a single subscriber', fakeAsync(() => {
      // Single-subscriber cycle: validates that the operator chain handles
      // multiple isStable() flips over time without leaking state between
      // edges. Each edge passes through a 250ms debounce.
      stable$.next(true);
      component.ngOnInit();
      const emissions: boolean[] = [];
      const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

      // Initial: stable=true → seed `false` is the only emission.
      tick(250);
      expect(emissions).toEqual([false]);

      // Flip unstable → after 250ms debounce, gate engages.
      stable$.next(false);
      tick(250);
      expect(emissions).toEqual([false, true]);

      // Flip stable again → after 250ms debounce, gate releases.
      stable$.next(true);
      tick(250);
      expect(emissions).toEqual([false, true, false]);

      sub.unsubscribe();
      // Drain the safety-valve timer so fakeAsync ends clean.
      tick(10_000);
    }));
  });
});

describe('CartProceedToCheckoutComponent — enableCartSlowNetworkResilience OFF', () => {
  let component: CartProceedToCheckoutComponent;
  let fixture: ComponentFixture<CartProceedToCheckoutComponent>;

  beforeEach(waitForAsync(() => {
    stable$.next(false);
    mockRouterEvents$ = new Subject<Event>();
    TestBed.configureTestingModule({
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
          useValue: { markForCheck: createSpy('markForCheck') },
        },
        {
          provide: FeatureConfigService,
          useValue: { isEnabled: (_flag: string) => false },
        },
      ],
    })
      .overrideComponent(CartProceedToCheckoutComponent, {
        remove: { imports: [TranslatePipe, CxDatePipe, UrlPipe] },
        add: { imports: [MockTranslatePipe, MockDatePipe, MockUrlPipe] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProceedToCheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should keep cartUpdating$ at false even when cart is unstable', fakeAsync(() => {
    stable$.next(false);
    component.ngOnInit();
    const emissions: boolean[] = [];
    const sub = component.cartUpdating$.subscribe((v) => emissions.push(v));

    tick(10_000);
    expect(emissions).toEqual([false]);

    sub.unsubscribe();
  }));
});
