import { ClearCartService } from './clear-cart.service';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
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
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

describe('ClearCartDialogComponent', () => {
  let component: ClearCartDialogComponent;
  let fixture: ComponentFixture<ClearCartDialogComponent>;
  let clearCartService: ClearCartService;
  let launchDialogService: LaunchDialogService;

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
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ClearCartService, useClass: MockClearCartService },
      ],
    }).compileComponents();

    clearCartService = TestBed.inject(ClearCartService);
    launchDialogService = TestBed.inject(LaunchDialogService);
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
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });
});
