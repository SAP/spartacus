import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cart } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import {
  AsmSaveCartDialogComponent,
  SAVE_CART_DIALOG_ACTION,
} from './asm-save-cart-dialog.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}
class MockSavedCartFacade implements Partial<SavedCartFacade> {
  saveCart(): void {}
  getSaveCartProcessSuccess(): Observable<boolean> {
    return EMPTY;
  }
  getSaveCartProcessError(): Observable<boolean> {
    return EMPTY;
  }
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<Cart> {
    return of({
      code: '00000001',
      entries: [{ quantity: 1 }, { quantity: 2 }],
    });
  }
  closeDialog(_reason: any) {}
}

describe('AsmBindCartDialogComponent', () => {
  let component: AsmSaveCartDialogComponent;
  let fixture: ComponentFixture<AsmSaveCartDialogComponent>;
  let el: DebugElement;
  let launchDialogService: LaunchDialogService;
  let savedCartFacade: SavedCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmSaveCartDialogComponent, MockTranslatePipe],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSaveCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    launchDialogService = TestBed.inject(LaunchDialogService);
    savedCartFacade = TestBed.inject(SavedCartFacade);

    fixture.detectChanges();
    spyOn(launchDialogService, 'closeDialog').and.stub();
    spyOn(savedCartFacade, 'saveCart').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init()', () => {
    it('should init the component', () => {
      component.ngOnInit();

      expect(component.cartQty).toEqual(3);
      expect(component.cart).not.toBeNull();
    });
  });

  it('should save cart when save button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      SAVE_CART_DIALOG_ACTION.SAVE
    );
    expect(savedCartFacade.saveCart).toHaveBeenCalled();
  });

  it('should not save cart when cancel button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      SAVE_CART_DIALOG_ACTION.CANCEL
    );
    expect(savedCartFacade.saveCart).not.toHaveBeenCalled();
  });

  it('should show meaasge based on `cx-message` selector', () => {
    expect(el.query(By.css('cx-message'))).not.toBeNull();
    component.closeDialogAlert();
  });

  it('should show meaasge based on `cx-message` selector', () => {
    spyOn(component.showDialogAlert$, 'next').and.stub();
    component.closeDialogAlert();
    expect(component.showDialogAlert$.next).toHaveBeenCalledWith(false);
  });

  it('should set cart total Qty', () => {
    component.cart = {
      entries: [
        {
          quantity: 1,
        },
        {
          quantity: 2,
        },
      ],
    };
    component.setCartTotalQty();
    expect(component.cartQty).toEqual(3);
  });
});
