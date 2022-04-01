import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import {
  IconTestingModule,
  KeyboardFocusTestingModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { I18nTestingModule } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearCartDialogComponent } from './clear-cart-dialog.component';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockClearCartService implements Partial<ClearCartDialogComponentService> {
  deleteActiveCart(): Observable<boolean> {
    return of(true);
  }
}

describe('ClearCartDialogComponent', () => {
  let component: ClearCartDialogComponent;
  let fixture: ComponentFixture<ClearCartDialogComponent>;
  let clearCartService: ClearCartDialogComponentService;
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
        {
          provide: ClearCartDialogComponentService,
          useClass: MockClearCartService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
    }).compileComponents();

    clearCartService = TestBed.inject(ClearCartDialogComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
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
    spyOn(launchDialogService, 'closeDialog');
    const closeBtn = fixture.debugElement.query(
      By.css('.btn-action')
    ).nativeElement;

    closeBtn.click();

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Cancel Clear Cart'
    );
  });

  it('should close dialog on cross click', () => {
    spyOn(launchDialogService, 'closeDialog');
    const crossBtn = fixture.debugElement.query(By.css('.close')).nativeElement;

    crossBtn.click();

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close Clear Cart Dialog'
    );
  });
});
