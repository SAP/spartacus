import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, UrlTestingModule } from '@spartacus/core';
import {
  Table,
  TableModule,
  SplitViewTestingModule,
  PaginationTestingModule,
  IconTestingModule,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserListService, UserModel } from './user-list.service';

const mockUserList: Table<UserModel> = {
  data: [
    {
      uid: 'c1',
      name: 'n1',
    },
    {
      uid: 'c2',
      name: 'n2',
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  structure: { type: '' },
};

export class MockUserListService {
  getTable() {}
  sort() {}
  viewPage() {}
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let service: UserListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        PaginationTestingModule,
        IconTestingModule,
      ],
      declarations: [UserListComponent],
      providers: [{ provide: UserListService, useClass: MockUserListService }],
    }).compileComponents();

    service = TestBed.inject(UserListService);
  }));

  // Not sure why this is needed, but we're failing otherwise.
  afterEach(() => {
    fixture.destroy();
  });

  describe('with table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(mockUserList));
      fixture = TestBed.createComponent(UserListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have cost centers', () => {
      let result;
      component.dataTable$.subscribe((data) => (result = data));
      expect(result).toEqual(mockUserList);
    });

    it('should delegate pagination to service', () => {
      spyOn(service, 'viewPage');
      component.viewPage({ currentPage: 3 }, 7);
      expect(service.viewPage).toHaveBeenCalledWith({ currentPage: 3 }, 7);
    });

    it('should revert currentPage when sorting', () => {
      spyOn(service, 'sort');
      component.sort({ currentPage: 3 }, 'bySortCode');
      expect(service.sort).toHaveBeenCalledWith(
        { currentPage: 3 },
        'bySortCode'
      );
    });

    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });

    it('should have cx-pagination element', () => {
      const el = fixture.debugElement.query(By.css('cx-pagination'));
      expect(el).toBeTruthy();
    });

    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeFalsy();
    });
  });

  describe('without table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(null));
      fixture = TestBed.createComponent(UserListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });

    it('should not have cx-pagination element', () => {
      const el = fixture.debugElement.query(By.css('cx-pagination'));
      expect(el).toBeFalsy();
    });

    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });

  describe('without pagination data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(
        of({ ...mockUserList, pagination: null })
      );
      fixture = TestBed.createComponent(UserListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });

    it('should not have cx-pagination element', () => {
      const el = fixture.debugElement.query(By.css('cx-pagination'));
      expect(el).toBeFalsy();
    });
  });
});
