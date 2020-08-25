import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UrlModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { StatusCellComponent } from '..';

describe('StatusCellComponent', () => {
  let component: StatusCellComponent;
  let fixture: ComponentFixture<StatusCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCellComponent],
      imports: [RouterTestingModule, UrlModule, I18nTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              active: true,
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return active', () => {
    expect(component.isActive).toBeTruthy();
  });
});
