import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { UnitListComponent } from '@spartacus/organization/administration/components';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitTreeService } from '../services/unit-tree.service';
import createSpy = jasmine.createSpy;

@Component({
  template: '<ng-content select="[actions]"></ng-content>',
  selector: 'cx-org-list',
})
class MockListComponent {}

class MockUnitTreeService {
  expandAll = createSpy('expandAll');
  collapseAll = createSpy('collapseAll');
}

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let unitTreeService: UnitTreeService;
  let fixture: ComponentFixture<UnitListComponent>;
  let expandAll: HTMLElement;
  let collapseAll: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UrlTestingModule],
      declarations: [MockListComponent, UnitListComponent],
      providers: [
        {
          provide: UnitTreeService,
          useClass: MockUnitTreeService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
    unitTreeService = TestBed.inject(UnitTreeService);
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
});
