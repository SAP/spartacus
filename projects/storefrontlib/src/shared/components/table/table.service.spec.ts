import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { TableConfig } from './config/table.config';
import { TableStructure } from './table.model';
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
    table1: [{ headers: [{ key: 'name-col' }] }],
    table2: [
      { headers: [{ key: 'name' }] },
      { breakpoint: BREAKPOINT.xs, headers: [{ key: 'xs-col' }] },
      { breakpoint: BREAKPOINT.md, headers: [{ key: 'md-col' }] },
    ],
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

            expect(result.headers[0].key).toEqual('md-col');
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

            expect(result.headers[0].key).toEqual('name-col');
          });
        });

        describe('"table2" table type', () => {
          it('should return a mobile table structure, having "xs-col" key', () => {
            let result: TableStructure;
            tableService
              .buildStructure('table2')
              .subscribe((structure) => (result = structure));

            expect(result.headers[0].key).toEqual('xs-col');
          });
        });

        describe('"unknown" table type', () => {
          it('should generate table structure based on first data item', () => {
            let result: TableStructure;
            tableService
              .buildStructure(
                'unknown',
                of([{ firstUnknown: 'foo', lastUnknown: 'bar' }])
              )
              .subscribe((structure) => (result = structure));

            expect(result.headers[0].label).toEqual('firstUnknown');
            expect(result.headers[1].label).toEqual('lastUnknown');
          });
        });

        it('should generate fallback table structure', () => {
          let result: TableStructure;
          tableService
            .buildStructure('unknown')
            .subscribe((structure) => (result = structure));

          expect(result.headers.length).toEqual(5);
          expect(result.hideHeader).toEqual(true);
        });
      });
    });
  });
});
