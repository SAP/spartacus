import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CartModification, CartValidationStatusCode } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { ReplaySubject } from 'rxjs';
import { CartValidationStateService } from '../cart-validation-state.service';
import { CartItemValidationWarningComponent } from './cart-item-validation-warning.component';

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

class MockCartValidationStateService
  implements Partial<CartValidationStateService>
{
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
  let mockCartValidationStateService: CartValidationStateService;
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
          provide: CartValidationStateService,
          useClass: MockCartValidationStateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemValidationWarningComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    mockCartValidationStateService = TestBed.inject(CartValidationStateService);

    (
      mockCartValidationStateService.cartValidationResult$ as ReplaySubject<
        CartModification[]
      >
    ).next([]);
    component.code = mockCode;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find proper cart modification object', () => {
    (
      mockCartValidationStateService.cartValidationResult$ as ReplaySubject<
        CartModification[]
      >
    ).next(mockData);
    let result;

    component.cartModification$.subscribe((value) => (result = value));

    expect(result.entry.product.code).toEqual(mockCode);
  });

  it('should close / hide warning when clicked icon', () => {
    let button = el.query(By.css('.close')) as any;
    expect(button).toBeNull();

    (
      mockCartValidationStateService.cartValidationResult$ as ReplaySubject<
        CartModification[]
      >
    ).next(mockData);
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
