import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { OrganizationSubListService } from './organization-sub-list.service';

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('OrganizationSubListService', () => {
  let service: OrganizationSubListService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationSubListService,
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });

    service = TestBed.inject(OrganizationSubListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
