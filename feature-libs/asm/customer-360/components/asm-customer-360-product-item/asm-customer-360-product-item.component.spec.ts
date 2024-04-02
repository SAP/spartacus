import {
  Component,
  DebugElement,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, ImageType, Product } from '@spartacus/core';
import { FocusConfig, ICON_TYPE } from '@spartacus/storefront';

import { By } from '@angular/platform-browser';
import { AsmCustomer360ProductItemComponent } from './asm-customer-360-product-item.component';

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: any;
  @Input() alt: any;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('AsmCustomer360ProductItemComponent', () => {
  const mockProduct: Product = {
    code: '553637',
    name: 'NV10',
    images: {
      PRIMARY: {
        thumbnail: {
          altText: 'NV10',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: 'image-url',
        },
      },
    },
    price: {
      formattedValue: '$264.69',
    },
    stock: {
      stockLevel: 0,
      stockLevelStatus: 'outOfStock',
    },
  };

  @Pipe({
    name: 'cxTranslate',
  })
  class MockTranslatePipe implements PipeTransform {
    transform(): any {}
  }
  @Component({
    selector: 'cx-icon',
    template: '',
  })
  class MockCxIconComponent {
    @Input() type: ICON_TYPE;
  }

  let component: AsmCustomer360ProductItemComponent;
  let fixture: ComponentFixture<AsmCustomer360ProductItemComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AsmCustomer360ProductItemComponent,
        MockTranslatePipe,
        MockCxIconComponent,
        MockMediaComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomer360ProductItemComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display product for interest item', () => {
    spyOn(component.selectProduct, 'emit').and.stub();

    component.product = mockProduct;
    component.isOrderEntry = false;

    fixture.detectChanges();

    const productLink = el.query(
      By.css('.cx-asm-customer-360-product-item-name')
    );

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-name'))
    ).toBeTruthy();

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-code'))
    ).toBeFalsy();

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-quantity'))
    ).toBeFalsy();

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-price'))
    ).toBeFalsy();

    productLink.nativeElement.click();
    expect(component.selectProduct.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('should display product for cart item', () => {
    spyOn(component.selectProduct, 'emit').and.stub();

    component.product = mockProduct;
    component.quantity = 1;
    component.isOrderEntry = true;

    fixture.detectChanges();

    const productLink = el.query(
      By.css('.cx-asm-customer-360-product-item-name')
    );

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-name'))
    ).toBeTruthy();

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-code'))
    ).toBeTruthy();

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-quantity'))
    ).toBeTruthy();

    expect(
      el.query(By.css('.cx-asm-customer-360-product-item-price'))
    ).toBeTruthy();

    productLink.nativeElement.click();
    expect(component.selectProduct.emit).toHaveBeenCalledWith(mockProduct);
  });
});
