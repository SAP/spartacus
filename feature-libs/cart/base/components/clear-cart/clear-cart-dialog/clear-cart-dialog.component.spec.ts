import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
} from '@spartacus/storefront';
import { I18nTestingModule } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';
import { By } from '@angular/platform-browser';

const mockCloseReason = 'Cancel Clear Cart';

class MockClearCartService implements Partial<ClearCartDialogComponentService> {
  deleteActiveCart(): void {}
  closeDialog(): void {}
}

describe('ClearCartDialogComponent', () => {
  let component: ClearCartDialogComponent;
  let fixture: ComponentFixture<ClearCartDialogComponent>;
  let clearCartService: ClearCartDialogComponentService;

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
        {
          provide: ClearCartDialogComponentService,
          useClass: MockClearCartService,
        },
      ],
    }).compileComponents();

    clearCartService = TestBed.inject(ClearCartDialogComponentService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger clear cart', () => {
    spyOn(clearCartService, 'deleteActiveCart');

    const clearBtn = fixture.debugElement.query(
      By.css('.btn-primary')
    ).nativeElement;

    clearBtn.click();

    expect(clearCartService.deleteActiveCart).toHaveBeenCalled();
  });

  it('should close dialog on cancel', () => {
    spyOn(clearCartService, 'closeDialog');
    const clearBtn = fixture.debugElement.query(
      By.css('.btn-action')
    ).nativeElement;

    clearBtn.click();

    expect(clearCartService.closeDialog).toHaveBeenCalledWith(mockCloseReason);
  });

  it('should close dialog on cross click', () => {
    spyOn(clearCartService, 'closeDialog');
    const clearBtn = fixture.debugElement.query(By.css('.close')).nativeElement;

    clearBtn.click();

    expect(clearCartService.closeDialog).toHaveBeenCalled();
  });
});
