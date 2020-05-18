import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigyaStorefrontComponent } from './gigya.storefront.component';

describe('Gigya.StorefrontComponent', () => {
  let component: GigyaStorefrontComponent;
  let fixture: ComponentFixture<GigyaStorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigyaStorefrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigyaStorefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
