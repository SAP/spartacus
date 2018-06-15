import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'projects/storefrontlib/src/lib/material.module';
import { of } from 'rxjs';
import { CartSharedModule } from './../../cart-shared/cart-shared.module';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        RouterTestingModule,
        CartSharedModule
      ],
      declarations: [AddedToCartDialogComponent],
      providers: [
        {
          provide: MatDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            entry$: of({
              product: { images: '' },
              totalPrice: { formattedValue: '' },
              quantity: 1,
              entryNumber: 0
            }),
            cart$: of({
              totalPrice: { formattedValue: '' }
            })
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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
