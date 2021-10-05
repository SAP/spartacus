import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartValidationWarningsComponent } from './cart-validation-warnings.component';
import { CartModification, CartValidationStatusCode } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { CartValidationWarningsStateService } from '../cart-validation-warnings-state.service';
import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { By } from '@angular/platform-browser';

const mockData = [
  {
    statusCode: CartValidationStatusCode.NO_STOCK,
    entry: {
      product: {
        code: 'productCode1',
      },
    },
  },
  {
    statusCode: CartValidationStatusCode.NO_STOCK,
    entry: {
      product: {
        code: 'productCode2',
      },
    },
  },
  {
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: 'productCode3',
      },
    },
  },
];

const dataReplaySubject = new ReplaySubject<CartModification[]>();

class MockCartValidationWarningsStateService
  implements Partial<CartValidationWarningsStateService>
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

describe('CartValidationWarningsComponent', () => {
  let component: CartValidationWarningsComponent;
  let fixture: ComponentFixture<CartValidationWarningsComponent>;
  let mockCartValidationWarningsStateService: CartValidationWarningsStateService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CartValidationWarningsComponent,
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

    fixture = TestBed.createComponent(CartValidationWarningsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    mockCartValidationWarningsStateService = TestBed.inject(
      CartValidationWarningsStateService
    );

    mockCartValidationWarningsStateService.cartValidationResult$.next(mockData);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find proper cart modification object', () => {
    mockCartValidationWarningsStateService.cartValidationResult$.next(mockData);

    component.cartModifications$.subscribe();

    expect(Object.keys(component.visibleWarnings).length).toEqual(2);
  });

  it('should close / hide warning when clicked icon for certain product', () => {
    spyOn(component, 'removeMessage').and.callThrough();
    let alerts = el.queryAll(By.css('div.alert'));
    expect(alerts.length).toEqual(2);
    let closeButton = el.queryAll(By.css('button.close'));
    closeButton[0].nativeElement.click();

    fixture.detectChanges();

    expect(component.visibleWarnings[mockData[0].entry.product.code]).toEqual(
      false
    );
    expect(component.visibleWarnings[mockData[1].entry.product.code]).toEqual(
      true
    );
    expect(component.removeMessage).toHaveBeenCalledWith(mockData[0]);
  });
});
