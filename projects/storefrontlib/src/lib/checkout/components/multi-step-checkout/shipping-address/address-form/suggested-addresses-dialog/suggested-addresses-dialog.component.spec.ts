import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutService } from '../../../../../services';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';
import { CartService } from '../../../../../../cart/services';

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestedAddressDialogComponent],
      providers: [CheckoutService, CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAddressDialogComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
