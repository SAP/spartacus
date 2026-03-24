import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import {
  FocusDirective,
  IconComponent,
  MockIconComponent,
  MockKeyboardFocusDirective,
} from '@spartacus/storefront';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';

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
      imports: [ClearCartDialogComponent],
      providers: [
        {
          provide: ClearCartDialogComponentService,
          useClass: MockClearCartService,
        },
      ],
    })
      .overrideComponent(ClearCartDialogComponent, {
        remove: { imports: [TranslatePipe, FocusDirective, IconComponent] },
        add: {
          imports: [
            MockTranslatePipe,
            MockKeyboardFocusDirective,
            MockIconComponent,
          ],
        },
      })
      .compileComponents();

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
      By.css('.btn-secondary')
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
