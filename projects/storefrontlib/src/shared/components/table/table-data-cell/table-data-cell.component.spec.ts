import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { TableDataCellComponent } from './table-data-cell.component';

describe('TableDataCellComponent', () => {
  let component: TableDataCellComponent;
  let fixture: ComponentFixture<TableDataCellComponent>;

  describe('static field', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TableDataCellComponent],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: OutletContextData,
            useValue: {
              context: {
                _type: 'table',
                _field: 'name',
                name: 'the name',
                code: 'the code',
              },
            },
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TableDataCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should resolve static header', () => {
      expect(component.value).toEqual('the name');
    });
  });
});
