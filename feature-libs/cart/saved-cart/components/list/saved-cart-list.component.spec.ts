import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartListComponent } from './saved-cart-list.component';
import {
  Cart,
  RoutingService,
  TranslationService,
  I18nTestingModule,
} from '@spartacus/core';
import { SavedCartService } from '../../core/services/saved-cart.service';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockTranslationService {
  translate(text: string) {
    return text;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

const mockCart1: Cart = {
  code: '00001',
  name: 'test name',
  saveTime: new Date(2000, 2, 2),
  description: 'test description',
  totalItems: 2,
  totalPrice: {
    formattedValue: '$165.00',
  },
};
const mockCart2: Cart = {
  code: '00002',
  name: 'test name',
  saveTime: new Date(2000, 2, 2),
  description: 'test description',
  totalItems: 2,
  totalPrice: {
    formattedValue: '$167.00',
  },
};
const mockCarts: Cart[] = [mockCart1, mockCart2];

class MockSavedCartService implements Partial<SavedCartService> {
  deleteSavedCart(_cartId: string): void {}
  clearRestoreSavedCart(): void {}
  loadSavedCarts(): void {}
  clearSaveCart(): void {}
  clearSavedCarts(): void {}
  getList(): Observable<Cart[]> {
    return of(mockCarts);
  }
  restoreSavedCart(_cartId: string): void {}
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return of();
  }
}

describe('SavedCartListComponent', () => {
  let component: SavedCartListComponent;
  let fixture: ComponentFixture<SavedCartListComponent>;
  let savedCartService: SavedCartService | MockSavedCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartListComponent, MockUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: SavedCartService, useClass: MockSavedCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    savedCartService = TestBed.inject(SavedCartService);
    fixture = TestBed.createComponent(SavedCartListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper number of carts when user contains saved carts', () => {
    component.savedCarts$ = savedCartService.getList();
    fixture.detectChanges();
    const el = fixture.debugElement;
    expect(el.query(By.css('.cx-saved-cart-list-table'))).not.toBeNull();
    expect(el.queryAll(By.css('.cx-saved-cart-list-cart-id')).length).toEqual(
      mockCarts.length
    );
  });

  it('should render empty message if no saved carts exist', () => {
    const el = fixture.debugElement;
    component.savedCarts$ = of([]);
    savedCartService.getList();
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-saved-cart-list-no-saved-carts'))
    ).not.toBeNull();
  });
});
