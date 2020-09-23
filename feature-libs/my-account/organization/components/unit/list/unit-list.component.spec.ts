import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { UnitListComponent } from '@spartacus/my-account/organization/components';
import { UnitListService } from '../services/unit-list.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Component } from '@angular/core';
import createSpy = jasmine.createSpy;

@Component({
  template: '<ng-content select="[actions]"></ng-content>',
  selector: 'cx-organization-list',
})
class MockOrganizationListComponent {}

class MockUnitListService {
  expandAll = createSpy('expandAll');
  collapseAll = createSpy('collapseAll');
}

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let unitListService: UnitListService;
  let fixture: ComponentFixture<UnitListComponent>;
  let expandAll: HTMLElement, collapseAll: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UrlTestingModule],
      declarations: [MockOrganizationListComponent, UnitListComponent],
      providers: [
        {
          provide: UnitListService,
          useClass: MockUnitListService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
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
    expect(expandAll.innerText).toEqual('unit.tree.expandAll');
    expect(collapseAll.innerText).toEqual('unit.tree.collapseAll');
  });

  it('should call expandAll', () => {
    expandAll.click();
    expect(unitListService.expandAll).toHaveBeenCalledWith();
  });

  it('should call collapseAll', () => {
    collapseAll.click();
    expect(unitListService.collapseAll).toHaveBeenCalledWith();
  });
});
