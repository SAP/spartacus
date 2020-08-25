import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { AmountComponent } from '..';

describe('AmountComponent', () => {
  let component: AmountComponent;
  let fixture: ComponentFixture<AmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountComponent],
      imports: [RouterTestingModule, UrlModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: { context: { budget: '1000', currency: 'EUR' } },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve property', () => {
    expect(component.property).toEqual('1000 EUR');
  });
});
