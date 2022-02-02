import { ClearCartService } from './clear-cart.service';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
} from '@spartacus/storefront';
import { I18nTestingModule } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';
import { BehaviorSubject } from 'rxjs';

const mockCloseReason = 'Close Dialog';
const clearProgress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  false
);
class MockClearCartService implements Partial<ClearCartService> {
  clearActiveCart(): void {}
  getClearingCartProgess(): BehaviorSubject<boolean> {
    return clearProgress$;
  }
  closeDialog(): void {}
}

describe('ClearCartDialogComponent', () => {
  let component: ClearCartDialogComponent;
  let fixture: ComponentFixture<ClearCartDialogComponent>;
  let clearCartService: ClearCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        I18nTestingModule,
        KeyboardFocusTestingModule,
        IconTestingModule,
      ],
      declarations: [ClearCartDialogComponent],
      providers: [
        { provide: ClearCartService, useClass: MockClearCartService },
      ],
    }).compileComponents();

    clearCartService = TestBed.inject(ClearCartService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isClearing$).toBeDefined();
  });

  it('should trigger clear cart', () => {
    spyOn(clearCartService, 'clearActiveCart');
    component.clear();
    expect(clearCartService.clearActiveCart).toHaveBeenCalled();
  });

  it('should close dialog on close method', () => {
    spyOn(clearCartService, 'closeDialog');
    component.close(mockCloseReason);

    expect(clearCartService.closeDialog).toHaveBeenCalledWith(mockCloseReason);
  });
});
