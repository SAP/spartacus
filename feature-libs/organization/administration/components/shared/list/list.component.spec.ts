import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { EntitiesModel, I18nTestingModule } from '@spartacus/core';
import { Table } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { KeyboardFocusTestingModule } from 'projects/storefrontlib/src/layout/a11y/keyboard-focus/focus-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { ItemService } from '../item.service';
import { ListComponent } from './list.component';
import { ListService } from './list.service';
import createSpy = jasmine.createSpy;

interface Mock {
  code: string;
}

const mockList: EntitiesModel<Mock> = {
  values: [
    {
      code: 'c1',
    },
    {
      code: 'c2',
    },
  ],
  pagination: {
    totalPages: 1,
    totalResults: 1,
    sort: 'byCode',
    currentPage: 0,
  },
  // structure: { type: 'MockTable' },
};

const mockEmptyList: EntitiesModel<Mock> = {
  values: [],
  pagination: { totalPages: 0 },
};

class MockBaseListService {
  view = createSpy('view');
  sort = createSpy('sort');
  getData() {
    return of();
  }
  getStructure() {
    return of({});
  }
  key() {
    return 'code';
  }
  hasGhostData() {
    return false;
  }
}

class MockItemService {
  key$ = of();
  launchDetails = createSpy('launchDetails');
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cx-table',
  template: '',
})
class MockTableComponent {
  @Input() data;
  @Input() structure;
  @Input() currentItem;
  @Input() i18nRoot;
  @Output() launch = new EventEmitter();
}

@Component({
  templateUrl: './list.component.html',
})
class MockListComponent extends ListComponent<Mock> {
  constructor(
    protected baseListService: ListService<Mock>,
    protected organizationItemService: ItemService<Mock>
  ) {
    super(baseListService, organizationItemService);
  }
}

describe('ListComponent', () => {
  let component: MockListComponent;
  let fixture: ComponentFixture<MockListComponent>;
  let service: ListService<Mock>;
  let itemService: ItemService<any>;

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
          provide: ListService,
          useClass: MockBaseListService,
        },
        {
          provide: ItemService,
          useClass: MockItemService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ListService);
    itemService = TestBed.inject(ItemService);
  });

  describe('with table data', () => {
    beforeEach(() => {
      spyOn(service, 'getData').and.returnValue(of(mockList));
      spyOn(service, 'key').and.callThrough();
      fixture = TestBed.createComponent(MockListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should resolve get property', () => {
      expect(service.key).toHaveBeenCalled();
      expect(component.key).toEqual('code');
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
      component.launchItem(mockList.values[0]);
      expect(itemService.launchDetails).toHaveBeenCalledWith(
        mockList.values[0]
      );
    });

    it('should delegate sorting to service.sort', () => {
      component.sortCode = 'sortCode';
      component.sort({ sort: 'previousSortCode', currentPage: 3 });
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
      spyOn(service, 'getData').and.returnValue(of(mockEmptyList));
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
