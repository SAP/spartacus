import { CommonModule } from '@angular/common';
import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  EntitiesModel,
  I18nTestingModule,
  Translatable,
} from '@spartacus/core';
import { OrganizationTableType } from '@spartacus/organization/administration/components';
import { PopoverModule, Table } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { KeyboardFocusTestingModule } from 'projects/storefrontlib/layout/a11y/keyboard-focus/focus-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/shared/components/split-view/testing/spit-view-testing.module';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { EMPTY, of } from 'rxjs';
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
    return EMPTY;
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
  onCreateButtonClick(): void {}
  getCreateButtonType = createSpy('getCreateButtonType');
  getCreateButtonLabel(): Translatable {
    return { key: 'organization.add' };
  }
}

class MockItemService {
  key$ = EMPTY;
  launchDetails = createSpy('launchDetails');
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cx-table',
  template: '',
})
class MockTableComponent {
  @Input() data;
  @Input() structure;
  @Input() currentItem;
  @Input() i18nRoot;
  @Output() launch = new EventEmitter();
  @Input() showHint = true;
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
  viewType = OrganizationTableType.BUDGET;
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
        PopoverModule,
      ],
      declarations: [
        MockListComponent,
        MockTableComponent,
        MockFeatureDirective,
      ],
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

  describe('hint', () => {
    beforeEach(() => {
      spyOn(service, 'getData').and.returnValue(of(mockEmptyList));
      fixture = TestBed.createComponent(MockListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should not show hint by default', () => {
      const el = fixture.debugElement.query(
        By.css('cx-popover > .popover-body > p')
      );
      expect(el).toBeFalsy();
    });

    it('should display hint after click info button', () => {
      const infoButton = fixture.debugElement.query(
        By.css('button[ng-reflect-cx-popover]')
      ).nativeElement;
      infoButton.click();
      const el = fixture.debugElement.query(
        By.css('cx-popover > .popover-body > p')
      );
      expect(el).toBeTruthy();
      expect(el.nativeElement.innerText).toBe('orgBudget.hint');
    });
  });

  describe('onCreateButtonClick', () => {
    beforeEach(() => {
      spyOn(service, 'getData').and.returnValue(of(mockEmptyList));
      fixture = TestBed.createComponent(MockListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should process click of create button', () => {
      spyOn(service, 'onCreateButtonClick').and.callThrough();
      component.onCreateButtonClick();
      expect(service.onCreateButtonClick).toHaveBeenCalled();
    });
  });

  describe('Hide/Show a Link/Button with appropriate Label ', () => {
    let el: DebugElement;

    beforeEach(() => {
      spyOn(service, 'getData').and.returnValue(of(mockEmptyList));
      fixture = TestBed.createComponent(MockListComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('it should show create functionality by default', () => {
      it('it should show Hyperlink with correct label and not Button', () => {
        service.getCreateButtonType = createSpy().and.returnValue('LINK');
        service.getCreateButtonLabel = createSpy().and.returnValue({
          key: 'organization.add',
        });
        component.createButtonType = service.getCreateButtonType();
        component.hideAddButton = false;
        fixture.detectChanges();

        let hlink = el.query(By.css('a.button.primary.create'));
        expect(hlink).toBeTruthy();
        expect(hlink.nativeElement.innerText).toBe('organization.add');
        let button = el.query(By.css('button.button.primary.create'));
        expect(button).toBeNull();
      });

      it('it should show Button with correct label and not Hyperlink', () => {
        service.getCreateButtonType = createSpy().and.returnValue('BUTTON');
        service.getCreateButtonLabel = createSpy().and.returnValue({
          key: 'organization.manageUsers',
        });
        component.createButtonType = service.getCreateButtonType();
        component.hideAddButton = false;
        fixture.detectChanges();

        let hlink = el.query(By.css('a.button.primary.create'));
        expect(hlink).toBeNull();
        let button = el.query(By.css('button.button.primary.create'));
        expect(button).toBeTruthy();
        expect(button.nativeElement.innerText).toBe('organization.manageUsers');
      });
    });

    describe('it should not show create functionality', () => {
      it('it should not show Hyperlink', () => {
        service.getCreateButtonType = createSpy().and.returnValue('LINK');
        component.hideAddButton = true;
        component.createButtonType = service.getCreateButtonType();
        fixture.detectChanges();

        let hlink = el.query(By.css('a.button.primary.create'));
        expect(hlink).toBeNull();
        let button = el.query(By.css('button.button.primary.create'));
        expect(button).toBeNull();
      });

      it('it should not show Button', () => {
        service.getCreateButtonType = createSpy().and.returnValue('BUTTON');
        component.createButtonType = service.getCreateButtonType();
        component.hideAddButton = true;
        fixture.detectChanges();

        let hlink = el.query(By.css('a.button.primary.create'));
        expect(hlink).toBeNull();
        let button = el.query(By.css('button.button.primary.create'));
        expect(button).toBeNull();
      });
    });
  });
});
