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
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
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
        { provide: NgbActiveModal, useClass: MockNgbActiveModal }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    component.entry$ = of(undefined);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form quantity control after init and entry observable finished', () => {
    const entryForm = component.form.controls.entryForm as FormGroup;
    expect(entryForm.controls.quantity).toBeDefined();
  });
});
