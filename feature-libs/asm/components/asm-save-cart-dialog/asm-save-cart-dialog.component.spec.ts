import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Cart } from '@spartacus/cart/base/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmSaveCartDialogComponent, MockTranslatePipe],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmSaveCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    launchDialogService = TestBed.inject(LaunchDialogService);

    fixture.detectChanges();
    spyOn(launchDialogService, 'closeDialog').and.stub();
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

  it('should close with replace action when save button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-primary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      SAVE_CART_DIALOG_ACTION.SAVE
    );
  });

  it('should close with cancel action when cancel button is clicked', () => {
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('.btn-secondary'))
      .triggerEventHandler('click');

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      SAVE_CART_DIALOG_ACTION.CANCEL
    );
  });

  it('should show meaasge based on `cx-message` selector', () => {
    expect(el.query(By.css('cx-message'))).not.toBeNull();
    component.closeDialogAlert();
  });

  it('should show meaasge based on `cx-message` selector', () => {
    component.closeDialogAlert();
    expect(component.showDialogAlert).toEqual(false);
  });
});
