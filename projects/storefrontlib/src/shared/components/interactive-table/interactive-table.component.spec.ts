import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';

import { TranslationService } from '@spartacus/core';
import { TableModule } from '../table/table.module';
import { InteractiveTableComponent } from './interactive-table.component';
import { InteractiveTableModule } from './interactive-table.module';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { ListingModel } from './../../../cms-components/organization/abstract-component/abstract-listing.component';

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}

class MockTranslationService {
  translate(key) {
    return of(key);
  }
}

const mockList: ListingModel = {
  values: [
    {
      code: '1',
      name: 'b1',
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
    },
    {
      code: '2',
      name: 'b2',
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
    },
  ],
  pagination: { pageSize: 2, totalPages: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const genericList = new BehaviorSubject(mockList);

describe('InteractiveTableComponent', () => {
  let component: InteractiveTableComponent;
  let fixture: ComponentFixture<InteractiveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, InteractiveTableModule],
      declarations: [InteractiveTableComponent, MockPaginationComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveTableComponent);
    component = fixture.componentInstance;
    genericList.next(mockList);
    component.data$ = of(mockList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No items found page if the list is empty', () => {
    const emptyList: ListingModel = {
      values: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    genericList.next(emptyList);
    fixture.detectChanges();

    const notFoundElement = fixture.debugElement.query(By.css('.cx-no-items'));
    expect(notFoundElement).not.toBeNull();
    expect(notFoundElement.nativeElement.textContent).toContain(
      'common.noData'
    );
  });

  it('should read list', () => {
    let testList: any;
    component.data$
      .subscribe((value) => {
        testList = value;
      })
      .unsubscribe();

    expect(testList).toEqual(mockList);
  });

  describe('changeSortCode', () => {
    it('should sort by code', () => {
      spyOn(component.changeSortCode, 'emit');
      component.sortListEvent('byCode');
      fixture.detectChanges();

      expect(component.changeSortCode.emit).toHaveBeenCalledWith('byCode');
    });
  });

  describe('pageChange', () => {
    it('should set page', () => {
      spyOn(component.pageChange, 'emit');
      component.viewPageEvent(2);
      fixture.detectChanges();

      expect(component.pageChange.emit).toHaveBeenCalledWith(2);
    });
  });
});
