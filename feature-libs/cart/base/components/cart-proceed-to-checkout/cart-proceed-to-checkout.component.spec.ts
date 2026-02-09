import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import { ProgressButtonModule } from '@spartacus/storefront';
import { Subject } from 'rxjs';
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

describe('CartProceedToCheckoutComponent', () => {
  let component: CartProceedToCheckoutComponent;
  let fixture: ComponentFixture<CartProceedToCheckoutComponent>;

  beforeEach(waitForAsync(() => {
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
          provide: ChangeDetectorRef,
          useValue: { markForCheck: createSpy('markForCheck') },
        },
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
});
