import { CartService } from './../../../services/cart.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { MaterialModule } from 'projects/storefrontlib/src/lib/material.module';
import { CartSharedModule } from './../../cart-shared/cart-shared.module';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

class MockNgbActiveModal {
  dismiss() {}
  close() {}
}

class MockCartService {
  updateCartEntry(entryNumber, updatedQuantity) {}
  removeCartEntry(entry) {}
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let cartService: CartService;
  let modalService: NgbActiveModal;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        RouterTestingModule,
        CartSharedModule,
        NgbModule.forRoot()
      ],
      declarations: [AddedToCartDialogComponent],
      providers: [
        { provide: NgbActiveModal, useClass: MockNgbActiveModal },
        { provide: CartService, useClass: MockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    cartService = TestBed.get(CartService);
    modalService = TestBed.get(NgbActiveModal);
    // fixture.detectChanges();
    component.entry$ = of(undefined);
    spyOn(cartService, 'updateCartEntry').and.callThrough();
    spyOn(cartService, 'removeCartEntry').and.callThrough();
    spyOn(modalService, 'close').and.callThrough();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form quantity control after init and entry observable finished', () => {
    const entryForm = component.form.controls.entryForm as FormGroup;
    expect(entryForm.controls.quantity).toBeDefined();
  });

  it('should update entry', () => {
    component.updateEntry({ entry: { entryNumber: 2 }, updatedQuantity: 4 });
    expect(cartService.updateCartEntry).toHaveBeenCalledWith(2, 4);
  });

  it('should remove entry', () => {
    component.removeEntry({ id: 1 });
    expect(cartService.removeCartEntry).toHaveBeenCalledWith({ id: 1 });
    expect(modalService.close).toHaveBeenCalled();
  });
});
