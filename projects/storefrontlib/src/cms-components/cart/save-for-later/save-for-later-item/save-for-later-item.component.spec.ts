import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  ViewChild,
  DebugElement,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { I18nTestingModule, PromotionResult } from '@spartacus/core';
import { SaveForLaterItemComponent } from './save-for-later-item.component';
import { By } from '@angular/platform-browser';
import { Item } from '../../cart-shared';
import { cold, getTestScheduler } from 'jasmine-marbles';

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

const mockPotentialProductPromotions: PromotionResult[] = [
  {
    description: 'test potential product promotion',
    consumedEntries: [
      {
        orderEntryNumber: 1,
      },
    ],
  },
];

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

@Component({
  template: `
    <cx-save-for-later-item
      [item]="item"
      [saveForLaterLoading]="saveForLaterLoading"
      [potentialProductPromotions]="potentialProductPromotions"
    ></cx-save-for-later-item>
  `,
})
class MockSaveFprLaterItemListComponent {
  item: Item = item;
  // saveForLaterLoading = false;
  potentialProductPromotions: PromotionResult[] = mockPotentialProductPromotions;

  @ViewChild(SaveForLaterItemComponent, { static: false })
  saveForLaterItemComponent: SaveForLaterItemComponent;

  get saveForLaterLoading() {
    return false;
  }
}

describe('SaveForLaterItemComponent', () => {
  let component: MockSaveFprLaterItemListComponent;
  let fixture: ComponentFixture<MockSaveFprLaterItemListComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        MockSaveFprLaterItemListComponent,
        SaveForLaterItemComponent,
        MockMediaComponent,
        MockPromotionsComponent,
        MockUrlPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockSaveFprLaterItemListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all elements', () => {
    const media = el.nativeElement.querySelector('cx-media');
    expect(media).toBeTruthy();

    const imageLink = el.queryAll(By.css('[data-test="product-img-url"]'));
    expect(imageLink.length).toBe(1);

    const productName = el.queryAll(By.css('[data-test="product-name"]'));
    expect(productName.length).toBe(1);

    const productLink = el.queryAll(By.css('[data-test="product-url"]'));
    expect(productLink.length).toBe(1);

    const productCode = el.queryAll(By.css('[data-test="product-code"]'));
    expect(productCode.length).toBe(1);

    const variants = el.queryAll(By.css('[data-test="product-variant"]'));
    expect(variants.length).toBe(2);

    const basePrice = el.queryAll(By.css('[data-test="product-base-price"]'));
    expect(basePrice.length).toBe(1);

    const quantity = el.queryAll(By.css('[data-test="product-quantity"]'));
    expect(quantity.length).toBe(1);

    const availability = el.queryAll(
      By.css('[data-test="product-availability"]')
    );
    expect(availability.length).toBe(1);

    const promotions = el.nativeElement.querySelector('cx-promotions');
    expect(promotions).toBeTruthy();

    const moveActions = el.queryAll(By.css('[data-test="move-btn"]'));
    expect(moveActions.length).toBe(1);

    const removeActions = el.queryAll(By.css('[data-test="remove-btn"]'));
    expect(removeActions.length).toBe(1);
  });

  it('should call removeItem()', () => {
    spyOn(component.saveForLaterItemComponent.remove, 'emit').and.callThrough();
    spyOnProperty(component, 'saveForLaterLoading').and.returnValue(
      cold('-b|', { a: true })
    );

    const removeAction = el.query(By.css('[data-test="remove-btn"]'))
      .nativeElement;
    removeAction.click();
    expect(
      component.saveForLaterItemComponent.remove.emit
    ).toHaveBeenCalledWith(component.item);

    getTestScheduler().flush();
    fixture.detectChanges();
    expect(removeAction.disabled).toEqual(true);
  });

  it('should call moveToCart()', () => {
    spyOn(
      component.saveForLaterItemComponent.moveToCart,
      'emit'
    ).and.callThrough();
    spyOnProperty(component, 'saveForLaterLoading').and.returnValue(
      cold('-b|', { a: true })
    );

    const moveAction = el.query(By.css('[data-test="move-btn"]')).nativeElement;
    moveAction.click();
    expect(
      component.saveForLaterItemComponent.moveToCart.emit
    ).toHaveBeenCalledWith(component.item);

    getTestScheduler().flush();
    fixture.detectChanges();
    expect(moveAction.disabled).toEqual(true);
  });
});
