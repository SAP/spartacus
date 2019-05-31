import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import {
  SaveForLaterService,
  CartService,
  PromotionResult,
  I18nTestingModule,
} from '@spartacus/core';
import { Item } from '../../cart-shared';
import { SaveForLaterItemListComponent } from './save-for-later-item-list.component';

const mockItems = [
  {
    id: 1,
    quantity: 5,
    entryNumber: 1,
    product: {
      id: 1,
      code: 'PR0000',
    },
  },
  {
    id: 2,
    quantity: 3,
    entryNumber: 2,
    product: {
      id: 2,
      code: 'PR0001',
    },
  },
];

const mockPotentialProductPromotions = [
  {
    description: 'test potential product promotion',
    consumedEntries: [
      {
        orderEntryNumber: 1,
      },
    ],
  },
];

const sflService = jasmine.createSpyObj('SaveForLaterService', ['removeEntry']);
const cartService = jasmine.createSpyObj('CartService', ['addEntry']);

@Component({
  template: '',
  selector: 'cx-save-for-later-item',
})
class MockCartItemComponent {
  @Input()
  item: Item;
  @Input()
  saveForLaterLoading = false;
  @Input()
  potentialProductPromotions: PromotionResult[];
}

describe('SaveForLaterItemListComponent', () => {
  let component: SaveForLaterItemListComponent;
  let fixture: ComponentFixture<SaveForLaterItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SaveForLaterItemListComponent, MockCartItemComponent],
      providers: [
        { provide: SaveForLaterService, useValue: sflService },
        { provide: CartService, useValue: cartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterItemListComponent);
    component = fixture.componentInstance;
    component.items = mockItems;
    component.potentialProductPromotions = mockPotentialProductPromotions;
    sflService.removeEntry.and.callFake((_item: Item) => {
      component.items.pop();
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get potential promotions for product', () => {
    const item = mockItems[0];
    const promotions = component.getPotentialProductPromotionsForItem(item);
    expect(promotions).toEqual(mockPotentialProductPromotions);
  });

  it('should be able to remove item from entry', () => {
    let slfItems = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(2);

    const item = mockItems[0];
    component.removeEntry(item);
    expect(sflService.removeEntry).toHaveBeenCalledWith(item);

    fixture.detectChanges();
    slfItems = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(1);
  });

  it('should be able to move item to cart', () => {
    component.items = mockItems;
    component.ngOnInit();
    let slfItems = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(1);

    const item = mockItems[0];
    component.moveItemToCart(item);
    expect(cartService.addEntry).toHaveBeenCalledWith('PR0000', 5);
    expect(sflService.removeEntry).toHaveBeenCalledWith(item);

    fixture.detectChanges();
    slfItems = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(0);
  });
});
