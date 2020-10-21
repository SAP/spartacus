import { TestBed } from '@angular/core/testing';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { TableConfig } from './config/table.config';
import { TableLayout, TableStructure } from './table.model';
import { TableService } from './table.service';

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of();
  }
  get breakpoints(): BREAKPOINT[] {
    return [
      BREAKPOINT.xs,
      BREAKPOINT.sm,
      BREAKPOINT.md,
      BREAKPOINT.lg,
      BREAKPOINT.xl,
    ];
  }
}

const MockTableConfig: TableConfig = {
  table: {
    table1: { cells: ['name-col'] },
    table2: {
      cells: ['name'],
      [BREAKPOINT.xs]: { cells: ['xs-col'] },
      [BREAKPOINT.md]: { cells: ['md-col'] },
    },
    table3: {
      cells: ['xs'],
      sm: {
        cells: ['sm'],
      },
      md: {
        cells: ['md'],
      },
      lg: {
        cells: ['lg'],
      },
      xl: {
        cells: ['xl'],
      },
    },
    table4: {
      cells: ['xs'],
      options: {
        layout: TableLayout.VERTICAL,
      },
      xl: {
        cells: ['xl'],
        options: {
          layout: TableLayout.HORIZONTAL,
        },
      },
    },
  },
};

describe('TableService', () => {
  let tableService: TableService;
  let breakpointService: BreakpointService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TableService,
          { provide: BreakpointService, useClass: MockBreakpointService },
          { provide: TableConfig, useValue: MockTableConfig },
        ],
      });
      tableService = TestBed.inject(TableService);
      breakpointService = TestBed.inject(BreakpointService);
    });

    it('should inject service', () => {
      expect(tableService).toBeTruthy();
    });

    describe('buildStructure', () => {
      describe('merge fields', () => {
        it('should return fields for xs screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.xs)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table3')
            .subscribe((table) => (result = table));
          expect(result.cells).toEqual(['xs']);
        });

        it('should return fields for sm screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.sm)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table3')
            .subscribe((table) => (result = table));
          expect(result.cells).toEqual(['sm']);
        });

        it('should return fields for md screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.md)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table3')
            .subscribe((table) => (result = table));
          expect(result.cells).toEqual(['md']);
        });

        it('should return fields for lg screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.lg)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table3')
            .subscribe((table) => (result = table));
          expect(result.cells).toEqual(['lg']);
        });

        it('should return fields for xl screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.xl)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table3')
            .subscribe((table) => (result = table));
          expect(result.cells).toEqual(['xl']);
        });

        it('should return default fields for md screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.md)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table4')
            .subscribe((table) => (result = table));
          expect(result.cells).toEqual(['xs']);
        });
      });

      describe('merge options', () => {
        it('should return default options for md screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.md)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table4')
            .subscribe((table) => (result = table));
          expect(result.options.layout).toEqual(TableLayout.VERTICAL);
        });

        it('should merge options for xl screen', () => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.xl)
          );
          let result: TableStructure;
          tableService
            .buildStructure('table4')
            .subscribe((table) => (result = table));
          expect(result.options.layout).toEqual(TableLayout.HORIZONTAL);
        });
      });

      describe('lg breakpoint', () => {
        beforeEach(() => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.lg)
          );
        });

        describe('table2', () => {
          it('should return the tablet (md) structure for large screens', () => {
            let result: TableStructure;
            tableService
              .buildStructure('table2')
              .subscribe((structure) => (result = structure));

            expect(result.cells).toEqual(['md-col']);
          });
        });
      });

      describe('xs breakpoint', () => {
        beforeEach(() => {
          spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
            of(BREAKPOINT.xs)
          );
        });

        describe('"table1" table type', () => {
          it('should return a structure with the type', () => {
            let result: TableStructure;
            tableService
              .buildStructure('table1')
              .subscribe((structure) => (result = structure));

            expect(result.type).toEqual('table1');
          });

          it('should return a header with name key', () => {
            let result: TableStructure;
            tableService
              .buildStructure('table1')
              .subscribe((structure) => (result = structure));

            expect(result.cells[0]).toEqual('name-col');
          });
        });

        describe('"table2" table type', () => {
          it('should return a mobile table structure, having "xs-col" key', () => {
            let result: TableStructure;
            tableService
              .buildStructure('table2')
              .subscribe((structure) => (result = structure));

            expect(result.cells[0]).toEqual('xs-col');
          });
        });

        it('should generate random table structure', () => {
          let result: TableStructure;
          spyOn(console, 'warn').and.stub();
          tableService
            .buildStructure('unknown')
            .subscribe((structure) => (result = structure));

          expect(result.cells.length).toEqual(5);
        });
      });
    });
  });
});
