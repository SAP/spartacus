import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement, ViewChild } from '@angular/core';
import {
  SaveForLaterService,
  CartService,
  PromotionResult,
  I18nTestingModule,
  OrderEntry,
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

@Component({
  template: `
    <cx-save-for-later-item-list
      [saveForLaterLoading]="sflCartLoaded"
      [items]="entries"
      [potentialProductPromotions]="potentialProductPromotions"
    >
    </cx-save-for-later-item-list>
    <button></button>
  `,
})
class MockedSaveForLaterComponent {
  sflCartLoaded = true;
  entries: OrderEntry[] = mockItems;
  potentialProductPromotions: PromotionResult[] = mockPotentialProductPromotions;

  @ViewChild(SaveForLaterItemListComponent, { static: false })
  saveForLaterItemListComponent: SaveForLaterItemListComponent;
}

describe('SaveForLaterItemListComponent', () => {
  let component: MockedSaveForLaterComponent;
  let fixture: ComponentFixture<MockedSaveForLaterComponent>;
  let el: DebugElement;
  const sflService = jasmine.createSpyObj('SaveForLaterService', [
    'removeEntry',
  ]);
  const cartService = jasmine.createSpyObj('CartService', ['addEntry']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        MockedSaveForLaterComponent,
        SaveForLaterItemListComponent,
        MockCartItemComponent,
      ],
      providers: [
        { provide: SaveForLaterService, useValue: sflService },
        { provide: CartService, useValue: cartService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockedSaveForLaterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    sflService.removeEntry.and.stub();
    cartService.addEntry.and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show save for later items', () => {
    const slfItems = el.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(2);
  });

  it('should remove item from save for later list', () => {
    const slfItems = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(2);

    const item = mockItems[0];
    component.saveForLaterItemListComponent.removeEntry(item);
    expect(sflService.removeEntry).toHaveBeenCalledWith(item);
  });

  it('should move item to cart', () => {
    const slfItems = fixture.debugElement.nativeElement.querySelectorAll(
      'cx-save-for-later-item'
    );
    expect(slfItems.length).toBe(2);

    const item = mockItems[0];
    component.saveForLaterItemListComponent.moveItemToCart(item);
    expect(cartService.addEntry).toHaveBeenCalledWith('PR0000', 5);
    expect(sflService.removeEntry).toHaveBeenCalledWith(item);
  });
});
