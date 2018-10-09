import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutService } from '../../../../../services';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';
import { CartService } from '../../../../../../cart/services';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SuggestedAddressDialogComponent],
      providers: [CheckoutService, CartService, NgbActiveModal]
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
