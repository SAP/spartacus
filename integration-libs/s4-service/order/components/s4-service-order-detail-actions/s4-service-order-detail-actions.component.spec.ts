import { Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  I18nModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { S4ServiceOrderDetailActionsComponent } from './s4-service-order-detail-actions.component';
import { OrderDetailsService } from '@spartacus/order/components';

// Mock Order Details
const mockOrder1 = {
  entries: [{ product: { productTypes: ['SERVICE'] } }],
  status: 'PROCESSING',
};
const mockOrder2 = {
  entries: [],
  status: 'CANCELLED',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {
    return '';
  }
}

class MockRoutingService {
  go() {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return of('Cancel Service');
  }
}

class MockOrderDetailsService {
  getOrderDetails(): Observable<any> {
    return of(mockOrder1);
  }
}

@Component({
  template: '',
  selector: 'cx-order-details-actions',
})
class MockOrderDetailActionsComponent {}

describe('S4ServiceOrderDetailActionsComponent', () => {
  let component: S4ServiceOrderDetailActionsComponent;
  let fixture: ComponentFixture<S4ServiceOrderDetailActionsComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule, RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: OrderDetailsService, useClass: MockOrderDetailsService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: Store, useValue: {} },
      ],
      declarations: [
        S4ServiceOrderDetailActionsComponent,
        MockUrlPipe,
        MockOrderDetailActionsComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S4ServiceOrderDetailActionsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Cancel  Button', () => {
    component.order$ = of(mockOrder1);
    fixture.detectChanges();
    expect(el.query(By.css('.cx-order-details-actions'))).toBeTruthy();
    const elements = fixture.debugElement.queryAll(By.css('button'));
    expect(elements.length).toEqual(1);
  });

  it('should not show Cancel  Button', () => {
    component.order$ = of(mockOrder2);
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('button'));
    expect(elements.length).toEqual(0);
  });
});
