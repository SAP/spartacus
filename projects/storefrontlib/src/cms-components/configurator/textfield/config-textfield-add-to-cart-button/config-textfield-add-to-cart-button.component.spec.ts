import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ConfiguratorTextfieldService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigTextfieldAddToCartButtonComponent } from './config-textfield-add-to-cart-button.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
  },
};
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorTextfieldService {
  addToCart(): void {}
}

describe('ConfigTextfieldAddToCartButtonComponent', () => {
  let classUnderTest: ConfigTextfieldAddToCartButtonComponent;
  let fixture: ComponentFixture<ConfigTextfieldAddToCartButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigTextfieldAddToCartButtonComponent],
      providers: [
        {
          provide: ConfiguratorTextfieldService,
          useClass: MockConfiguratorTextfieldService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    })
      .overrideComponent(ConfigTextfieldAddToCartButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTextfieldAddToCartButtonComponent);
    classUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });
});
