import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartItemValidationWarningComponent } from './cart-item-validation-warning.component';
import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { CartValidationWarningsStateService } from '../cart-validation-warnings-state.service';
import { ReplaySubject } from 'rxjs';
import { CartModification, CartValidationStatusCode } from '@spartacus/core';
import { By } from '@angular/platform-browser';

const mockCode = 'productCode1';
const mockData = [
  {
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: mockCode,
      },
    },
  },
  {
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: 'productCode2',
      },
    },
  },
];

const dataReplaySubject = new ReplaySubject<CartModification[]>();

class MockCartValidationWarningsStateService
  implements Partial<CartValidationWarningsStateService> {
  cartValidationResult$ = dataReplaySubject;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('CartItemValidationWarningComponent', () => {
  let component: CartItemValidationWarningComponent;
  let fixture: ComponentFixture<CartItemValidationWarningComponent>;
  let mockCartValidationWarningsStateService: CartValidationWarningsStateService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CartItemValidationWarningComponent,
        MockCxIconComponent,
        MockTranslatePipe,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: CartValidationWarningsStateService,
          useClass: MockCartValidationWarningsStateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemValidationWarningComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    mockCartValidationWarningsStateService = TestBed.inject(
      CartValidationWarningsStateService
    );

    mockCartValidationWarningsStateService.cartValidationResult$.next([]);
    component.code = mockCode;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find proper cart modification object', () => {
    mockCartValidationWarningsStateService.cartValidationResult$.next(mockData);
    let result;

    component.cartModification$.subscribe((value) => (result = value));

    expect(result.entry.product.code).toEqual(mockCode);
  });

  it('should close / hide warning when clicked icon', () => {
    let button = el.query(By.css('.close')) as any;
    expect(button).toBeNull();

    mockCartValidationWarningsStateService.cartValidationResult$.next(mockData);
    fixture.detectChanges();

    button = el.query(By.css('.close')).nativeElement;
    expect(button).toBeDefined();
    button.click();

    fixture.detectChanges();

    expect(component.isVisible).toEqual(false);
    const alert = el.query(By.css('.alert'));
    expect(alert).toBeNull();
  });
});
