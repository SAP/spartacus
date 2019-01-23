import { ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressFormComponent } from './billing-address-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '@spartacus/core';

class MockUserService {
  getTitles() {}
  loadTitles() {}
  getRegions() {}
  loadRegions(_countryIsoCode: string) {}
}

describe('BillingAddressFormComponent', () => {
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgSelectModule
      ],
      declarations: [BillingAddressFormComponent],
      providers: [{ provide: UserService, useClass: MockUserService }]
    })
      .overrideComponent(BillingAddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
