import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AddressBookPageLayoutModule } from '../../layout/address-book-page-layout/address-book-page-layout.module';
import { AddressBookPageComponent } from './address-book-page.component';
import { StoreModule } from '@ngrx/store';
import { GlobalMessageService } from '@spartacus/core';

describe('AddressBookPageComponent', () => {
  let component: AddressBookPageComponent;
  let fixture: ComponentFixture<AddressBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddressBookPageLayoutModule, StoreModule.forRoot({})],
      declarations: [AddressBookPageComponent],
      providers: [GlobalMessageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
