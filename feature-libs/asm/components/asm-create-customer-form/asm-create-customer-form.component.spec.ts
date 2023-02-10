import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmCreateCustomerFormComponent } from './asm-create-customer-form.component';

describe('AsmCreateCustomerFormComponent', () => {
  let component: AsmCreateCustomerFormComponent;
  let fixture: ComponentFixture<AsmCreateCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsmCreateCustomerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsmCreateCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
