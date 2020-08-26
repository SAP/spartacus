import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
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

class MockCurrentOrganizationItemService {
  key$ = of();
}

@Component({
  selector: 'cx-table',
  template: '',
})
class MockTableComponent {
  @Input() dataset;
  @Input() suffix;
  @Input() currentItem;
}

@Component({
  templateUrl: './organization-list.component.html',
})
class MockListComponent extends OrganizationListComponent<Mock> {
  constructor(
    protected baseOrganizationListService: OrganizationListService<Mock>,
    protected currentOrganizationItemService: CurrentOrganizationItemService<
      Mock
    >
  ) {
    super(baseOrganizationListService, currentOrganizationItemService);
  }
}

describe('OrganizationListComponent', () => {
  let component: MockListComponent;
  let fixture: ComponentFixture<MockListComponent>;
  let service: OrganizationListService<Mock>;

  beforeEach(async(() => {
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
      ],
      declarations: [MockListComponent, MockTableComponent],
      providers: [
        {
          provide: OrganizationListService,
          useClass: MockBaseOrganizationListService,
        },
        {
          provide: CurrentOrganizationItemService,
          useClass: MockCurrentOrganizationItemService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(OrganizationListService);
  }));

  describe('with table data?', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(mockList));
      fixture = TestBed.createComponent(MockListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should delegate browsing to service.view', () => {
      component.browse({ currentPage: 3 }, 7);
      expect(service.view).toHaveBeenCalledWith({ currentPage: 3 }, 7);
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
