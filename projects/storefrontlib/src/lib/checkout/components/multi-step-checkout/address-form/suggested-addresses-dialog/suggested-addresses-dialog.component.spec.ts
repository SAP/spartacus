import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../../../../../material.module';
import { CheckoutService } from '../../../../services';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog.component';
import { CartService } from '../../../../../cart/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

class MockMatDialogRef {
  close() {}
}

const address = { mockAddress: 'mockAddress', titleCode: 'mr' };

describe('SuggestedAddressDialogComponent', () => {
  let component: SuggestedAddressDialogComponent;
  let fixture: ComponentFixture<SuggestedAddressDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [SuggestedAddressDialogComponent],

      providers: [
        CheckoutService,
        CartService,
        {
          provide: MatDialogRef,
          useClass: MockMatDialogRef
        },
        { provide: MAT_DIALOG_DATA, useValue: { address } }
      ]
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
