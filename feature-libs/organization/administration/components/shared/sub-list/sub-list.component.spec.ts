import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel, I18nTestingModule } from '@spartacus/core';
import { PaginationTestingModule } from 'projects/storefrontlib/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { of } from 'rxjs';
import { CardTestingModule } from '../card/card.testing.module';
import { ItemService } from '../item.service';
import { ListService } from '../list/list.service';
import { MessageTestingModule } from '../message/message.testing.module';
import { SubListComponent } from './sub-list.component';
import createSpy = jasmine.createSpy;

const mockList: EntitiesModel<any> = {
  values: [
    {
      code: 'c1',
    },
    {
      code: 'c2',
    },
  ],
  pagination: { totalPages: 2, totalResults: 1, sort: 'byCode' },
};

const mockEmptyList: EntitiesModel<any> = {
  values: [],
};

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
}

class MockBaseListService {
  view = createSpy('view');
  sort = createSpy('sort');
  getData() {
    return of(null);
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
  key$ = of('key');
  launchDetails = createSpy('launchDetails');
}

describe('SubListComponent', () => {
  let component: SubListComponent;
  let fixture: ComponentFixture<SubListComponent>;
  let organizationListService: ListService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CardTestingModule,
        MessageTestingModule,
        I18nTestingModule,
        RouterTestingModule,
        PaginationTestingModule,
      ],
      declarations: [SubListComponent, MockTableComponent],

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
  });

  beforeEach(() => {
    organizationListService = TestBed.inject(ListService);
  });

  describe('with  data', () => {
    beforeEach(() => {
      spyOn(organizationListService, 'getData').and.returnValue(of(mockList));
      fixture = TestBed.createComponent(SubListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
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

  describe('without data', () => {
    beforeEach(() => {
      spyOn(organizationListService, 'getData').and.returnValue(
        of(mockEmptyList)
      );
      fixture = TestBed.createComponent(SubListComponent);
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
