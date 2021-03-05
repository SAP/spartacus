import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartFormLaunchDialogService } from '../../saved-cart-form-dialog/saved-cart-form-launch-dialog.service';
import { SavedCartDetailService } from '../saved-cart-detail.service';

import { SavedCartDetailOverviewComponent } from './saved-cart-detail-overview.component';

class MockSavedCartDetailService implements Partial<SavedCartDetailService> {
  getCartDetails(): Observable<Cart> {
    return of();
  }
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

describe('SavedCartDetailOverviewComponent', () => {
  let component: SavedCartDetailOverviewComponent;
  let fixture: ComponentFixture<SavedCartDetailOverviewComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartDetailOverviewComponent],
      providers: [
        {
          provide: SavedCartDetailService,
          useClass: MockSavedCartDetailService,
        },
        {
          provide: SavedCartFormLaunchDialogService,
          useClass: MockSavedCartFormLaunchDialogService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
