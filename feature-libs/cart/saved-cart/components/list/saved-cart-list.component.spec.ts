import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartListComponent } from './saved-cart-list.component';
import { Cart, RoutingService, TranslationService, I18nTestingModule } from '@spartacus/core';
import { SavedCartService } from '../../core/services/saved-cart.service';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

class MockTranslationService {
  translate(text: string) {
    return text;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

const mockCart1: Cart = {
  code: "00001",
  name: "test name",
  saveTime: new Date(2000, 2, 2),
  description: "test description", 
  totalItems: 2,
  totalPrice: {
    formattedValue: "$165.00"
  }
}
const mockCart2: Cart = {
  code: "00002",
  name: "test name",
  saveTime: new Date(2000, 2, 2),
  description: "test description", 
  totalItems: 2,
  totalPrice: {
    formattedValue: "$167.00"
  }
}
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

fdescribe('SavedCartListComponent', () => {
  let component: SavedCartListComponent;
  let fixture: ComponentFixture<SavedCartListComponent>;
  let savedCartService: SavedCartService | MockSavedCartService;
  //let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartListComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: SavedCartService, useClass: MockSavedCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {

    //routingService = TestBed.inject(RoutingService);
    savedCartService = TestBed.inject(SavedCartService);
    fixture = TestBed.createComponent(SavedCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render saved carts when they exist', () => {
    
    component.savedCarts$ = savedCartService.getList();
    fixture.detectChanges();
    console.log("item");
    let obj = fixture.debugElement;
    console.log({obj});

    expect(
      fixture.debugElement.query(By.css('.cx-saved-cart-list'))
    ).not.toBeNull();

    //check number of entries

  });

  // it('should render message when no saved carts exist'){
  //   spyOn(savedCartService, 'getList').and.stub());
  // }
});
