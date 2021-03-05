import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';
import { SavedCartFormDialogComponent } from './saved-cart-form-dialog.component';

const cart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
  saveTime: new Date(),
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({ cart });
  }

  closeDialog(_reason: string): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

class MockSavedCartService implements Partial<SavedCartService> {
  saveCart({}: {
    cartId: string;
    saveCartName?: string;
    saveCartDescription?: string;
    extraData?: { edit: boolean };
  }): void {}
  deleteSavedCart(_cartId: string): void {}
  clearSaveCart(): void {}
  clearRestoreSavedCart(): void {}
  getSaveCartProcessSuccess(): Observable<boolean> {
    return of();
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('SavedCartFormDialogComponent', () => {
  let component: SavedCartFormDialogComponent;
  let fixture: ComponentFixture<SavedCartFormDialogComponent>;
  //   let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule],
      declarations: [SavedCartFormDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: SavedCartService, useClass: MockSavedCartService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartFormDialogComponent);
    // launchDialogService = TestBed.inject(LaunchDialogService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
