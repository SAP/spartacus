import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportToCartComponent } from './import-to-cart.component';

describe('ImportToCartComponent', () => {
  let component: ImportToCartComponent;
  let fixture: ComponentFixture<ImportToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportToCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
