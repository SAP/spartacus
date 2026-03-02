import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  ListComponent,
  UnitListComponent,
} from '@spartacus/organization/administration/components';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitListService } from '../services/unit-list.service';
import { UnitTreeService } from '../services/unit-tree.service';
import createSpy = jasmine.createSpy;

@Component({
  template: '<ng-content select="[actions]"></ng-content>',
  selector: 'cx-org-list',
  imports: [I18nTestingModule, UrlTestingModule],
})
class MockListComponent {
  @Input() key: any;
  @Input() hideAddButton = false;
}

class MockUnitTreeService {
  expandAll = createSpy('expandAll');
  collapseAll = createSpy('collapseAll');
}

class MockOrgUnitService implements Partial<OrgUnitService> {
  isUpdatingUnitAllowed(): boolean {
    return true;
  }
}

class MockUnitListService {
  search = createSpy('search');
  clearSearch = createSpy('clearSearch');
}

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let unitTreeService: UnitTreeService;
  let unitListService: UnitListService;
  let fixture: ComponentFixture<UnitListComponent>;
  let expandAll: HTMLElement;
  let collapseAll: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnitListComponent],
      providers: [
        {
          provide: UnitTreeService,
          useClass: MockUnitTreeService,
        },
        {
          provide: OrgUnitService,
          useClass: MockOrgUnitService,
        },
        {
          provide: UnitListService,
          useClass: MockUnitListService,
        },
      ],
    })
      .overrideComponent(UnitListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, UrlPipe, ListComponent],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockListComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
    unitTreeService = TestBed.inject(UnitTreeService);
    unitListService = TestBed.inject(UnitListService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    [expandAll, collapseAll] = fixture.debugElement
      .queryAll(By.css('button.link'))
      .map((el) => el.nativeNode);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render links', () => {
    expect(expandAll.innerText).toEqual('orgUnit.tree.expandAll');
    expect(collapseAll.innerText).toEqual('orgUnit.tree.collapseAll');
  });

  it('should call expandAll', () => {
    expandAll.click();
    expect(unitTreeService.expandAll).toHaveBeenCalled();
  });

  it('should call collapseAll', () => {
    collapseAll.click();
    expect(unitTreeService.collapseAll).toHaveBeenCalled();
  });

  it('should render search input', () => {
    const input = fixture.debugElement.query(By.css('input.search-input'));
    expect(input).toBeTruthy();
  });

  it('should not show reset button initially', () => {
    const container = fixture.debugElement.query(By.css('.unit-search'));
    expect(container.nativeElement.classList.contains('dirty')).toBeFalse();
  });

  it('should call search and expandAll on input change', () => {
    const input = fixture.debugElement.query(By.css('input.search-input'));
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(unitListService.search).toHaveBeenCalledWith('test');
    expect(unitTreeService.expandAll).toHaveBeenCalled();
    const container = fixture.debugElement.query(By.css('.unit-search'));
    expect(container.nativeElement.classList.contains('dirty')).toBeTrue();
  });

  it('should not call expandAll when search value is empty', () => {
    component.onSearchChange('');
    expect(unitTreeService.expandAll).not.toHaveBeenCalled();
  });

  it('should call clearSearch and reset input on clearSearch()', () => {
    component.onSearchChange('abc');
    fixture.detectChanges();

    component.clearSearch();
    fixture.detectChanges();

    expect(unitListService.clearSearch).toHaveBeenCalled();
    expect(component.searchInput).toBe('');
    const container = fixture.debugElement.query(By.css('.unit-search'));
    expect(container.nativeElement.classList.contains('dirty')).toBeFalse();
  });

  it('should call clearSearch when reset button is clicked', () => {
    component.searchInput = 'abc';
    fixture.detectChanges();

    const resetBtn = fixture.debugElement.query(By.css('button.reset'));
    resetBtn.nativeElement.click();

    expect(unitListService.clearSearch).toHaveBeenCalled();
  });
});
