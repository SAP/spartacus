import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AddressBookPageLayoutModule } from './address-book-page-layout.module';
import { AddressBookPageLayoutComponent } from './address-book-page-layout.component';
import { StoreModule } from '@ngrx/store';

describe('AddressBookPageLayoutComponent', () => {
  let component: AddressBookPageLayoutComponent;
  let fixture: ComponentFixture<AddressBookPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddressBookPageLayoutModule, StoreModule.forRoot({})]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
