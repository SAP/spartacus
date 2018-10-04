import { CartService } from './../../../services/cart.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { SpinnerModule } from './../../../../ui/components/spinner/spinner.module';
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
  let fixture: ComponentFixture<AddedToCartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        CartSharedModule,
        NgbModule.forRoot(),
        SpinnerModule
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
