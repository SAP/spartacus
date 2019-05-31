import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import {
  SaveForLaterDataService,
  SaveForLaterService,
  I18nTestingModule,
  PromotionResult,
  OrderEntry,
  Cart,
} from '@spartacus/core';
import { SaveForLaterComponent } from './save-for-later.component';
import { Item } from '../cart-shared/cart-item/cart-item.component';

@Component({
  template: '',
  selector: 'cx-save-for-later-item-list',
})
class MockSaveForLaterItemListComponent {
  @Input()
  items: Item[] = [];
  @Input()
  saveForLaterLoading = false;
  @Input()
  potentialProductPromotions: PromotionResult[] = [];
}

describe('SaveForLaterComponent', () => {
  let component: SaveForLaterComponent;
  let fixture: ComponentFixture<SaveForLaterComponent>;

  const mockCart: Cart = {
    code: '1234',
  };
  const mockEntries: OrderEntry[] = [
    {
      quantity: 1,
      entryNumber: 1,
      product: {
        code: 'CODE1111',
      },
    },
  ];

  const sflService = jasmine.createSpyObj('SaveForLaterService', [
    'getSaveForLater',
    'getEntries',
    'getLoaded',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SaveForLaterComponent, MockSaveForLaterItemListComponent],
      providers: [
        SaveForLaterDataService,
        { provide: SaveForLaterService, useValue: sflService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterComponent);
    component = fixture.componentInstance;
    component.cartEntries$ = of([]);
    sflService.getSaveForLater.and.returnValue(of({}));
    sflService.getEntries.and.returnValue(of([]));
    sflService.getLoaded.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to show message when cart is empty', () => {
    fixture.detectChanges();
    const message = fixture.debugElement.queryAll(By.css('.cx-msg'));
    expect(message).toBeTruthy();
    const slfListComponent = fixture.debugElement.nativeElement.querySelector(
      'cx-save-for-later-item-list'
    );
    expect(slfListComponent).toBeFalsy();
  });

  it('should be able to show save for later list', () => {
    sflService.getSaveForLater.and.returnValue(of(mockCart));
    sflService.getEntries.and.returnValue(of(mockEntries));

    component.ngOnInit();
    fixture.detectChanges();

    const message = fixture.debugElement.queryAll(By.css('.cx-msg'));
    expect(message).toBeTruthy();
    const header = fixture.debugElement.queryAll(By.css('.cx-total'));
    expect(header).toBeTruthy();
    const slfListComponent = fixture.debugElement.nativeElement.querySelector(
      'cx-save-for-later-item-list'
    );
    expect(slfListComponent).toBeTruthy();
  });
});
