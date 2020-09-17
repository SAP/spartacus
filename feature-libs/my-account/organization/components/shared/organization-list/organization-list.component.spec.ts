import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { KeyboardFocusTestingModule } from 'projects/storefrontlib/src/layout/a11y/keyboard-focus/focus-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationListComponent } from './organization-list.component';
import { OrganizationListService } from './organization-list.service';
import createSpy = jasmine.createSpy;

interface Mock {
  code: string;
}

const mockList: Table<Mock> = {
  data: [
    {
      code: 'c1',
    },
    {
      code: 'c2',
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byCode' },
  structure: { type: 'MockTable' },
};

const mockEmptyList: Table<Mock> = {
  data: [],
  structure: { type: 'MockTable' },
};

class MockBaseOrganizationListService {
  view = createSpy('view');
  sort = createSpy('sort');
  getTable() {}
  key() {
    return 'code';
  }
}

class MockOrganizationItemService {
  key$ = of();
  launchDetails = createSpy('launchDetails');
}

@Component({
  selector: 'cx-table',
  template: '',
})
class MockTableComponent {
  @Input() dataset;
  @Input() currentItem;
  @Output() launch = new EventEmitter();
}

@Component({
  templateUrl: './organization-list.component.html',
})
class MockListComponent extends OrganizationListComponent<Mock> {
  constructor(
    protected baseOrganizationListService: OrganizationListService<Mock>,
    protected organizationItemService: OrganizationItemService<Mock>
  ) {
    super(baseOrganizationListService, organizationItemService);
  }
}

describe('OrganizationListComponent?', () => {
  let component: MockListComponent;
  let fixture: ComponentFixture<MockListComponent>;
  let service: OrganizationListService<Mock>;
  let itemService: OrganizationItemService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        PaginationTestingModule,
        IconTestingModule,
        NgSelectModule,
        FormsModule,
        KeyboardFocusTestingModule,
      ],
      declarations: [MockListComponent, MockTableComponent],
      providers: [
        {
          provide: OrganizationListService,
          useClass: MockBaseOrganizationListService,
        },
        {
          provide: OrganizationItemService,
          useClass: MockOrganizationItemService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(OrganizationListService);
    itemService = TestBed.inject(OrganizationItemService);
  });

  describe('with table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(mockList));
      fixture = TestBed.createComponent(MockListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should resolve get property', () => {
      spyOn(service, 'key').and.callThrough();
      const key = component.key;
      expect(service.key).toHaveBeenCalled();
      expect(key).toEqual('code');
    });

    it('should return list count', () => {
      const count = component.getListCount({
        pagination: { totalResults: 5 },
      } as Table);
      expect(count).toEqual(5);
    });

    it('should delegate browsing to service.view', () => {
      component.browse({ currentPage: 3 }, 7);
      expect(service.view).toHaveBeenCalledWith({ currentPage: 3 }, 7);
    });

    it('should delegate launch to service.launch', () => {
      component.launchItem(mockList.data[0]);
      expect(itemService.launchDetails).toHaveBeenCalledWith(mockList.data[0]);
    });

    it('should delegate sorting to service.sort', () => {
      component.sort({ sort: 'sortCode', currentPage: 3 });
      expect(service.sort).toHaveBeenCalledWith({
        sort: 'sortCode',
        currentPage: 3,
      });
    });

    describe('UI', () => {
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
  });

  describe('without table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(mockEmptyList));
      fixture = TestBed.createComponent(MockListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });

    it('should show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });
});
