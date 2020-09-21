import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { EventEmitter } from 'events';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { Table } from 'projects/storefrontlib/src/shared/components/table/table.model';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationListService } from '../organization-list/organization-list.service';
import { MessageTestingModule } from '../organization-message/message.testing.module';
import { OrganizationSubListComponent } from './organization-sub-list.component';
import createSpy = jasmine.createSpy;

const mockList: Table<any> = {
  data: [
    {
      code: 'c1',
    },
    {
      code: 'c2',
    },
  ],
  pagination: { totalPages: 2, totalResults: 1, sort: 'byCode' },
  structure: { type: 'MockTable' },
};

const mockEmptyList: Table<any> = {
  data: [],
  structure: { type: 'MockTable' },
};

@Component({
  selector: 'cx-table',
  template: '',
})
class MockTableComponent {
  @Input() dataset;
  @Input() currentItem;
  @Output() launch = new EventEmitter();
}

class MockBaseOrganizationListService {
  view = createSpy('view');
  sort = createSpy('sort');
  getTable() {
    return of(null);
  }
  key() {
    return 'code';
  }
}

class MockOrganizationItemService {
  key$ = of('key');
  launchDetails = createSpy('launchDetails');
}

describe('OrganizationSubListComponent', () => {
  let component: OrganizationSubListComponent;
  let fixture: ComponentFixture<OrganizationSubListComponent>;
  let organizationListService: OrganizationListService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OrganizationCardTestingModule,
        MessageTestingModule,
        I18nTestingModule,
        RouterTestingModule,
        PaginationTestingModule,
      ],
      declarations: [OrganizationSubListComponent, MockTableComponent],

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
  });

  beforeEach(() => {
    organizationListService = TestBed.inject(OrganizationListService);
  });

  describe('with table data', () => {
    beforeEach(() => {
      spyOn(organizationListService, 'getTable').and.returnValue(of(mockList));
      fixture = TestBed.createComponent(OrganizationSubListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should resolve getRouteParam', () => {
      let result;
      component.getRouteParam().subscribe((param) => (result = param));
      expect(result).toEqual({ code: 'key' });
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
      spyOn(organizationListService, 'getTable').and.returnValue(
        of(mockEmptyList)
      );
      fixture = TestBed.createComponent(OrganizationSubListComponent);
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
