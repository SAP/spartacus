import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { AmountCellComponent } from '..';

describe('AmountCellComponent', () => {
  let component: AmountCellComponent;
  let fixture: ComponentFixture<AmountCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountCellComponent],
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
    fixture = TestBed.createComponent(AmountCellComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve property', () => {
    expect(component.property).toEqual('1000 EUR');
  });
});
