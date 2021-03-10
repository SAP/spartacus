import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitCellComponent } from '..';

describe('UnitCellComponent', () => {
  let component: UnitCellComponent;
  let fixture: ComponentFixture<UnitCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitCellComponent],
      imports: [RouterTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              unit: {
                name: 'unit name',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve property', () => {
    expect(component.property).toEqual('unit name');
  });
});
