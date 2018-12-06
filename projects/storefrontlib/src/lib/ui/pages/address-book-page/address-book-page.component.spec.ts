import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AddressBookPageLayoutModule } from '../../layout/address-book-page-layout/address-book-page-layout.module';
import { AddressBookPageComponent } from './address-book-page.component';
import { StoreModule } from '@ngrx/store';

describe('AddressBookPageComponent', () => {
  let component: AddressBookPageComponent;
  let fixture: ComponentFixture<AddressBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddressBookPageLayoutModule, StoreModule.forRoot({})],
      declarations: [AddressBookPageComponent]
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
