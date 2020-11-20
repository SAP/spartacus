import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel, PaginationModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { OrganizationTableType } from '../organization.model';
import { ListService } from './list.service';

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
});
