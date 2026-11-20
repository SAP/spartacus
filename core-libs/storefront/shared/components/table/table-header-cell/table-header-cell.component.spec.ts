import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of, Subject } from 'rxjs';
import { TableHeaderOutletContext, TableOptions } from '../table.model';
import { TableHeaderCellComponent } from './table-header-cell.component';

const mockOptions: TableOptions = {
  cells: {
    name1: {
      label: 'static name',
    },
    name2: {},
    name3: {
      label: { i18nKey: 'custom.prop.name2' },
    },
  },
};

describe('TableHeaderCellComponent', () => {
  let component: TableHeaderCellComponent;
  let fixture: ComponentFixture<TableHeaderCellComponent>;

  it('should render an outlet context that arrives after creation', async () => {
    const context$ = new Subject<TableHeaderOutletContext>();
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, TableHeaderCellComponent],
      providers: [{ provide: OutletContextData, useValue: { context$ } }],
    }).compileComponents();
    fixture = TestBed.createComponent(TableHeaderCellComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.localizedHeader).toBe('');
    expect(fixture.nativeElement.textContent.trim()).toBe('');

    context$.next({ _type: 'table', _field: 'name1', _options: mockOptions });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent.trim()).toBe('static name');
  });

  describe('static field', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, TableHeaderCellComponent],
        providers: [
          {
            provide: OutletContextData,
            useValue: {
              context$: of({
                _type: 'table',
                _field: 'name1',
                _options: mockOptions,
              } as TableHeaderOutletContext),
            },
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TableHeaderCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should resolve static header', () => {
      expect(component.header).toEqual('static name');
    });
  });

  describe('i18n default', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, TableHeaderCellComponent],
        providers: [
          {
            provide: OutletContextData,
            useValue: {
              context$: of({
                _type: 'table',
                _field: 'name2',
                _i18nRoot: 'i18nRoot',
                _options: mockOptions,
              } as TableHeaderOutletContext),
            },
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TableHeaderCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should resolve static header', () => {
      expect(component.localizedHeader).toEqual('i18nRoot.name2');
    });
  });

  describe('i18n field', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, TableHeaderCellComponent],
        providers: [
          {
            provide: OutletContextData,
            useValue: {
              context$: of({
                _type: 'table',
                _field: 'name3',
                _options: mockOptions,
              } as TableHeaderOutletContext),
            },
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TableHeaderCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should resolve static header', () => {
      expect(component.localizedHeader).toEqual('custom.prop.name2');
    });
  });
});
