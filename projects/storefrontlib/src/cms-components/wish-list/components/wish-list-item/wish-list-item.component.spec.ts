import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { WishListItemComponent } from './wish-list-item.component';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input() product;
  @Input() showQuantity;
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
})
export class MockPictureComponent {
  @Input() container;
  @Input() alt;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('WishListItemComponent', () => {
  let component: WishListItemComponent;
  let fixture: ComponentFixture<WishListItemComponent>;
  let el: DebugElement;

  const mockCartEntry = {
    basePrice: {
      formattedValue: '$546.20',
    },
    product: {
      name: 'Test product',
      code: '1',
      averageRating: 4.5,
      stock: {
        stockLevelStatus: 'inStock',
      },
      images: {
        PRIMARY: {},
      },
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        WishListItemComponent,
        MockPictureComponent,
        MockAddToCartComponent,
        MockUrlPipe,
      ],
    })
      .overrideComponent(WishListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListItemComponent);
    component = fixture.componentInstance;
    component.cartEntry = mockCartEntry;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-name').textContent
    ).toContain(component.cartEntry.product.name);
  });

  it('should display product code', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-code').textContent
    ).toContain(component.cartEntry.product.code);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-price').textContent
    ).toContain(component.cartEntry.basePrice.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

  it('should display add to cart component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-add-to-cart')
    ).not.toBeNull();
  });

  it('should call remove', () => {
    spyOn(component, 'removeEntry');
    el.query(By.css('.cx-return-button button')).nativeElement.click();
    expect(component.removeEntry).toHaveBeenCalledWith(mockCartEntry);
  });

  it('should disable remove link when loading', () => {
    component.isLoading = true;
    fixture.detectChanges();

    expect(
      el.query(By.css('.cx-return-button button')).nativeElement.disabled
    ).toBeTruthy();
  });

  it('should not display add to cart component when product is out of stock', () => {
    component.cartEntry.product.stock.stockLevelStatus = 'outOfStock';
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('cx-add-to-cart')
    ).toBeNull();
  });
});
