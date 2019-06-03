import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { I18nTestingModule } from '@spartacus/core';
import { SaveForLaterItemComponent } from './save-for-later-item.component';
import { By } from '@angular/platform-browser';

const product = {
  id: 1,
  code: 'PR0000',
  name: 'test product',
  stock: {
    stockLevelStatus: 'outOfStock',
  },
  variantOptionQualifiers: [
    {
      name: 'name1',
      value: 'value1',
    },
    {
      name: 'name2',
      value: 'value2',
    },
  ],
  images: [{ PRIMARY: {} }],
};

const item = {
  id: 1,
  quantity: 5,
  entryNumber: 1,
  product: product,
  basePrice: '100',
  totalPrice: '110',
};
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

@Component({
  template: '',
  selector: 'cx-promotions',
})
class MockPromotionsComponent {
  @Input() promotions;
}

describe('SaveForLaterItemComponent', () => {
  let component: SaveForLaterItemComponent;
  let fixture: ComponentFixture<SaveForLaterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        SaveForLaterItemComponent,
        MockMediaComponent,
        MockPromotionsComponent,
        MockUrlPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    spyOn(component.remove, 'emit').and.callThrough();
    spyOn(component.moveToCart, 'emit').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeItem()', () => {
    component.removeItem();
    expect(component.remove.emit).toHaveBeenCalledWith(component.item);
  });

  it('should call moveToCart()', () => {
    component.moveItemToCart();
    expect(component.moveToCart.emit).toHaveBeenCalledWith(component.item);
  });

  it('should call isProductOutOfStock()', () => {
    expect(component.isProductOutOfStock(product)).toBeTruthy();
  });

  it('should display all elements', () => {
    const media = fixture.debugElement.nativeElement.querySelector('cx-media');
    expect(media).toBeTruthy();

    const imageLink = fixture.debugElement.queryAll(
      By.css('.cx-image-container a')
    );
    expect(imageLink.length).toBe(1);

    const productName = fixture.debugElement.queryAll(By.css('.cx-name'));
    expect(productName.length).toBe(1);

    const productLink = fixture.debugElement.queryAll(By.css('.cx-name a'));
    expect(productLink.length).toBe(1);

    const productCode = fixture.debugElement.queryAll(By.css('.cx-code'));
    expect(productCode.length).toBe(1);

    const variants = fixture.debugElement.queryAll(By.css('.cx-property'));
    expect(variants.length).toBe(2);

    const quantity = fixture.debugElement.queryAll(By.css('.cx-quantity'));
    expect(quantity.length).toBe(1);

    const total = fixture.debugElement.queryAll(By.css('.cx-total'));
    expect(total.length).toBe(1);

    const availability = fixture.debugElement.queryAll(
      By.css('.cx-availability')
    );
    expect(availability.length).toBe(1);

    const promotions = fixture.debugElement.nativeElement.querySelector(
      'cx-promotions'
    );
    expect(promotions).toBeTruthy();

    const actions = fixture.debugElement.queryAll(By.css('button'));
    expect(actions.length).toBe(2);
  });
});
