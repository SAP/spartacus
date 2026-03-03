import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { OrganizationUIConfig } from '@spartacus/organization/administration/root';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { OrganizationTableType } from '../organization.model';
import { ListService, SearchablePaginationModel } from './list.service';

const mockValues = [{ foo: 'bar' }];

@Injectable()
class SampleListService extends ListService<any> {
  tableType = 'mockTableType' as OrganizationTableType;
  load(pagination: PaginationModel): Observable<EntitiesModel<any>> {
    return of({
      values: mockValues,
      pagination,
    });
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockOrganizationUIConfig: OrganizationUIConfig = {
  organizationUI: {
    listSearch: {
      minCharacters: 3,
    },
  },
};

describe('ListService', () => {
  let service: SampleListService;
  let tableService: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SampleListService,
        {
          provide: TableService,
          useClass: MockTableService,
        },
        {
          provide: OrganizationUIConfig,
          useValue: mockOrganizationUIConfig,
        },
      ],
    });

    service = TestBed.inject(SampleListService);
    tableService = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return "code" key', () => {
    expect(service.key()).toEqual('code');
  });

  describe('getData', () => {
    it('should call load method to get data', () => {
      spyOn(service, 'load').and.callThrough();
      service.getData().subscribe();
      expect(service.load).toHaveBeenCalled();
    });

    it('should return values', () => {
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect(result.values).toEqual(mockValues);
    });

    it('should default to pageSize=10', () => {
      let result: EntitiesModel<any>;
      service
        .getData()
        .subscribe((data) => (result = data))
        .unsubscribe();
      expect(result.pagination.pageSize).toEqual(10);
    });

    it('should use pageSize=3 from configurable structure', () => {
      let result: EntitiesModel<any>;
      spyOn(service, 'getStructure').and.returnValue(
        of({ options: { pagination: { pageSize: 3 } } } as TableStructure)
      );
      service
        .getData()
        .subscribe((data) => (result = data))
        .unsubscribe();
      expect(result.pagination.pageSize).toEqual(3);
    });

    it('should emit ghostData before each load operation', () => {
      const emissions: EntitiesModel<any>[] = [];
      service.getData().subscribe((data) => emissions.push(data));

      // First emission should be ghostData, second should be actual data
      expect(emissions.length).toBeGreaterThanOrEqual(2);
      expect(emissions[0].values.length).toBe(10); // ghostData has 10 empty items
      expect(emissions[0].values[0]).toBeUndefined();
      expect(emissions[1].values).toEqual(mockValues);
    });

    it('should emit ghostData when search is triggered', () => {
      const emissions: EntitiesModel<any>[] = [];
      service.getData().subscribe((data) => emissions.push(data));

      // Clear previous emissions
      emissions.length = 0;

      // Trigger search
      service.search({ pageSize: 10 }, 'test');

      // Should emit ghostData first, then actual data
      expect(emissions.length).toBeGreaterThanOrEqual(2);
      expect(emissions[0].values[0]).toBeUndefined(); // ghostData
      expect(emissions[1].values).toEqual(mockValues); // actual data
    });
  });

  describe('getStructure()', () => {
    it('should build structure with tableService', () => {
      spyOn(tableService, 'buildStructure').and.returnValue(
        of({ options: { pagination: { pageSize: 3 } } } as TableStructure)
      );
      service.getStructure().subscribe().unsubscribe();
      expect(tableService.buildStructure).toHaveBeenCalled();
    });
  });

  describe('view()', () => {
    it('should paginate to page 5', () => {
      service.view({ currentPage: 1 }, 5);
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect(result.pagination.currentPage).toEqual(5);
    });

    // TODO: drop as soon as we dropped the method
    it('should paginate to page 5', () => {
      service.view({ currentPage: 1 }, 5);
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect(result.pagination.currentPage).toEqual(5);
    });
  });

  describe('sort()', () => {
    it('should sort by sortCode', () => {
      service.sort({ currentPage: 7, sort: 'byCode' });
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect(result.pagination.sort).toEqual('byCode');
    });

    it('should reset currentPage', () => {
      service.sort({ currentPage: 7 }, 'byCode');
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect(result.pagination.currentPage).toEqual(0);
    });
  });

  it('should show Add hyperlink', () => {
    expect(service.getCreateButtonType()).toEqual('LINK');
  });

  describe('isSearchEnabled()', () => {
    it('should return false by default', () => {
      expect(service.isSearchEnabled()).toBe(false);
    });
  });

  describe('getMinSearchCharacters()', () => {
    it('should return value from config', () => {
      expect(service.getMinSearchCharacters()).toBe(3);
    });

    it('should return custom value when config is changed', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          SampleListService,
          {
            provide: TableService,
            useClass: MockTableService,
          },
          {
            provide: OrganizationUIConfig,
            useValue: {
              organizationUI: {
                listSearch: {
                  minCharacters: 5,
                },
              },
            },
          },
        ],
      });
      const customService = TestBed.inject(SampleListService);
      expect(customService.getMinSearchCharacters()).toBe(5);
    });

    it('should return default value (3) when config is not provided', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          SampleListService,
          {
            provide: TableService,
            useClass: MockTableService,
          },
          {
            provide: OrganizationUIConfig,
            useValue: {},
          },
        ],
      });
      const noConfigService = TestBed.inject(SampleListService);
      expect(noConfigService.getMinSearchCharacters()).toBe(3);
    });
  });

  describe('search()', () => {
    it('should update pagination with query and reset to first page', () => {
      service.search({ currentPage: 5, sort: 'byName' }, 'testQuery');
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect((result.pagination as SearchablePaginationModel).query).toEqual(
        'testQuery'
      );
      expect(result.pagination.currentPage).toEqual(0);
    });

    it('should preserve other pagination properties', () => {
      service.search({ currentPage: 5, sort: 'byName', pageSize: 20 }, 'test');
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect(result.pagination.sort).toEqual('byName');
    });
  });

  describe('clearSearch()', () => {
    it('should clear query and reset to first page', () => {
      service.search({ currentPage: 3 }, 'someQuery');
      service.clearSearch({
        currentPage: 3,
        query: 'someQuery',
      } as SearchablePaginationModel);
      let result: EntitiesModel<any>;
      service.getData().subscribe((data) => (result = data));
      expect((result.pagination as SearchablePaginationModel).query).toEqual(
        ''
      );
      expect(result.pagination.currentPage).toEqual(0);
    });
  });
});
