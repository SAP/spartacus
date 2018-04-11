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
  let dialogRef: MatDialogRef<SuggestedAddressDialogComponent>;

  beforeEach(
    async(() => {
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAddressDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.get(MatDialogRef);

    spyOn(component.onSelectedAddress, 'emit').and.callThrough();
    spyOn(dialogRef, 'close').and.callThrough();
    spyOn(component, 'closeDialog').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.data.address = 'mockAddress';
    component.ngOnInit();
    expect(component.enteredAddress).toEqual('mockAddress');
  });

  it('should call closeDialog() with selected address not null', () => {
    component.selectedAddress = 'mockAddress';
    component.closeDialog();
    expect(component.selectedAddress).toEqual('mockAddress');
    expect(component.onSelectedAddress.emit).toHaveBeenCalledWith(
      'mockAddress'
    );
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call closeDialog() with selected address null', () => {
    component.enteredAddress = 'mockAddress';
    component.closeDialog();
    expect(component.selectedAddress).toEqual('mockAddress');
    expect(component.onSelectedAddress.emit).toHaveBeenCalledWith(
      'mockAddress'
    );
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should call setAddress(address)', () => {
    const resultSelectedAddress = {
      mockAddress: 'mockAddress',
      titleCode: 'mr',
      phone: undefined,
      selected: true
    };
    component.setAddress(address);
    expect(component.selectedAddress).toEqual(resultSelectedAddress);

    expect(component.closeDialog).toHaveBeenCalled();
  });
});
