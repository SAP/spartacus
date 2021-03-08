import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActiveCartService,
  AuthService,
  Cart,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartFormLaunchDialogService } from '../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { AddToSavedCartComponent } from './add-to-saved-cart.component';

const cart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
};

class MockActiveCartService implements Partial<ActiveCartService> {
  getActive(): Observable<Cart> {
    return of(cart);
  }
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn(): Observable<boolean> {
    return of();
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

class MockSavedCartFormLaunchDialogService {
  openDialog(_openElement?: ElementRef, _vcr?: ViewContainerRef, _data?: any) {}
}

xdescribe('AddToSavedCartComponent', () => {
  let component: AddToSavedCartComponent;
  let fixture: ComponentFixture<AddToSavedCartComponent>;
  beforeEach(() => {
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddToSavedCartComponent],
        imports: [I18nTestingModule],
        providers: [
          { provide: ActiveCartService, useClass: MockActiveCartService },
          { provide: AuthService, useClass: MockAuthService },
          { provide: RoutingService, useClass: MockRoutingService },
          {
            provide: SavedCartFormLaunchDialogService,
            useClass: MockSavedCartFormLaunchDialogService,
          },
        ],
      }).compileComponents();
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToSavedCartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
