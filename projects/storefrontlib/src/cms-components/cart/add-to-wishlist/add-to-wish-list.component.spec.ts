import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToWishListComponent } from './add-to-wish-list.component';
import { I18nTestingModule } from '@spartacus/core';

describe('AddToWishListComponent', () => {
  let component: AddToWishListComponent;
  let fixture: ComponentFixture<AddToWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AddToWishListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to wish list', () => {
    expect(component.add()).toBeTruthy();
  });

  it('should remove product from wish list', () => {
    expect(component.remove()).toBeFalsy();
  });
});
