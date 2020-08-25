import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { PermissionType } from '../form/permission-form.service';
import { PermissionListComponent } from './permission-list.component';
import {
  PermissionListService,
  PermissionModel,
} from './permission-list.service';
import createSpy = jasmine.createSpy;

const mockPermissionList: Table<PermissionModel> = {
  data: [
    {
      code: 'c1',
      orderApprovalPermissionType: { name: PermissionType.EXCEEDED },
      orgUnit: 'u1',
    },
    {
      code: 'c2',
      orderApprovalPermissionType: { name: PermissionType.ORDER },
      threshold: 10000,
      orgUnit: 'u2',
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  structure: { type: '' },
};

const mockRouterState = {
  state: {
    params: {
      code: 'c1',
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

export class MockPermissionListService {
  getTable() {}
  sort() {}
  viewPage() {}
}

describe('PermissionListComponent', () => {
  let component: PermissionListComponent;
  let fixture: ComponentFixture<PermissionListComponent>;
  let service: PermissionListService;

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
      declarations: [PermissionListComponent],
      providers: [
        { provide: PermissionListService, useClass: MockPermissionListService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    service = TestBed.inject(PermissionListService);
  }));

  describe('with table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(mockPermissionList));
      fixture = TestBed.createComponent(PermissionListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have permission', () => {
      let result;
      component.dataTable$.subscribe((data) => (result = data));
      expect(result).toEqual(mockPermissionList);
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
      fixture = TestBed.createComponent(PermissionListComponent);
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
        of({ ...mockPermissionList, pagination: null })
      );
      fixture = TestBed.createComponent(PermissionListComponent);
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
