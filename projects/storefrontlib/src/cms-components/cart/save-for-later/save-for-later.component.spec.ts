import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import {
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
  let el: DebugElement;

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
    'getLoading',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SaveForLaterComponent, MockSaveForLaterItemListComponent],
      providers: [{ provide: SaveForLaterService, useValue: sflService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.cartEntries$ = of([]);
    sflService.getSaveForLater.and.returnValue(of({}));
    sflService.getEntries.and.returnValue(of([]));
    sflService.getLoading.and.returnValue(of(false));
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cart is empty', () => {
    it('should not show message when save for later list is empty', () => {
      fixture.detectChanges();

      const message = el.query(By.css('[data-test="cart-empty-msg"]'));
      expect(message).toBeFalsy();
      const sflTotal = el.query(By.css('[data-test="sfl-total"]'));
      expect(sflTotal).toBeFalsy();
      const sflListComponent = el.nativeElement.querySelector(
        'cx-save-for-later-item-list'
      );
      expect(sflListComponent).toBeFalsy();
    });

    it('should show save for later list when it is not empty', () => {
      sflService.getSaveForLater.and.returnValue(of(mockCart));
      sflService.getEntries.and.returnValue(of(mockEntries));
      fixture.detectChanges();

      const message = fixture.debugElement.query(
        By.css('[data-test="cart-empty-msg"]')
      );
      expect(message).toBeTruthy();
      const sflTotal = fixture.debugElement.query(
        By.css('[data-test="sfl-total"]')
      );
      expect(sflTotal).toBeTruthy();
      const sflListComponent = fixture.debugElement.nativeElement.querySelector(
        'cx-save-for-later-item-list'
      );
      expect(sflListComponent).toBeTruthy();
    });
  });

  describe('cart is not empty', () => {
    it('should not show message when save for later list is empty', () => {
      component.cartEntries$ = of(mockEntries);
      component.ngOnInit();
      fixture.detectChanges();

      const message = el.query(By.css('[data-test="cart-empty-msg"]'));
      expect(message).toBeFalsy();
      const sflTotal = el.query(By.css('[data-test="sfl-total"]'));
      expect(sflTotal).toBeFalsy();
      const sflListComponent = el.nativeElement.querySelector(
        'cx-save-for-later-item-list'
      );
      expect(sflListComponent).toBeFalsy();
    });

    it('should show save for later list when it is not empty', () => {
      component.cartEntries$ = of(mockEntries);
      sflService.getSaveForLater.and.returnValue(of(mockCart));
      sflService.getEntries.and.returnValue(of(mockEntries));
      fixture.detectChanges();

      const message = el.query(By.css('[data-test="cart-empty-msg"]'));
      expect(message).toBeFalsy();
      const sflTotal = el.query(By.css('[data-test="sfl-total"]'));
      expect(sflTotal).toBeTruthy();
      const sflListComponent = el.nativeElement.querySelector(
        'cx-save-for-later-item-list'
      );
      expect(sflListComponent).toBeTruthy();
    });
  });
});
