import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartService } from '../../../core/services/saved-cart.service';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailService } from '../saved-cart-detail.service';
import { SavedCartDetailActionComponent } from './saved-cart-detail-action.component';

class MockSavedCartDetailService implements Partial<SavedCartDetailService> {
  getCartDetails(): Observable<Cart> {
    return of();
  }
}

class MockSavedCartService implements Partial<SavedCartService> {
  restoreSavedCart(_cartId: string): void {}
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  deleteSavedCart(_cartId: string): void {}
  clearRestoreSavedCart(): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

class MockSavedCartFormLaunchDialogService
  implements Partial<SavedCartFormLaunchDialogService> {
  openDialog(
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ): Observable<any> {
    return of();
  }
}

describe('SavedCartDetailActionComponent', () => {
  let component: SavedCartDetailActionComponent;
  let fixture: ComponentFixture<SavedCartDetailActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedCartDetailActionComponent],
      providers: [
        {
          provide: SavedCartDetailService,
          useClass: MockSavedCartDetailService,
        },
        {
          provide: SavedCartService,
          useClass: MockSavedCartService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: SavedCartFormLaunchDialogService,
          useClass: MockSavedCartFormLaunchDialogService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartDetailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
