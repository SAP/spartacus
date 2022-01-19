import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { ProgressButtonModule } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import { CartProceedToCheckoutComponent } from './cart-proceed-to-checkout.component';

const entriesMock: OrderEntry[] = [
  {
    entryNumber: 1,
  },
  {
    entryNumber: 2,
  },
];

class MockActiveCartService {
  getEntries(): Observable<OrderEntry[]> {
    return of(entriesMock);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

let mockRouterEvents$ = new Subject<RouterEvent>();
class MockRouter implements Partial<Router> {
  events = mockRouterEvents$;
  routerState = { snapshot: { root: {} } } as any;
}

describe('CartProceedToCheckoutComponent', () => {
  let component: CartProceedToCheckoutComponent;
  let fixture: ComponentFixture<CartProceedToCheckoutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, ProgressButtonModule],
        declarations: [CartProceedToCheckoutComponent, MockUrlPipe],
        providers: [
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: Router,
            useClass: MockRouter,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProceedToCheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should get entries on ngOnInit()', () => {
    let entries: OrderEntry[];

    component.ngOnInit();
    fixture.detectChanges();

    component.entries$.subscribe((data: OrderEntry[]) => (entries = data));
    expect(entries).toEqual(entriesMock);
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
