import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { SubListService } from './sub-list.service';

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('SubListService', () => {
  let service: SubListService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubListService,
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });

    service = TestBed.inject(SubListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
