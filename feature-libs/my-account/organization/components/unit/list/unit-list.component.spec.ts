import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  B2BUnitNode,
  I18nTestingModule,
  SemanticPathService,
} from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { UnitListComponent } from './unit-list.component';
import createSpy = jasmine.createSpy;
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { NavigationNode } from '@spartacus/storefront';

const mockOrgUnitTree: B2BUnitNode = {
  active: true,
  children: [],
  id: 'id',
  name: 'name',
  parent: 'parent',
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  getTree = createSpy('getTree').and.returnValue(of(mockOrgUnitTree));
}

class MockSemanticPathService implements Partial<SemanticPathService> {
  transform = (obj) => {
    return [obj.cxRoute + '/' + obj.params.uid];
  };
}
@Component({
  selector: 'cx-unit-tree',
  template: '',
})
class MockUnitTreeComponent {
  @Input() node: NavigationNode;
  @Input() defaultExpandLevel: number;
}

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        IconTestingModule,
      ],
      declarations: [UnitListComponent, MockUnitTreeComponent],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should translate B2BNode into NavigationNode', () => {
    const node = component.toNavigation(mockOrgUnitTree);
    expect(node.title).toEqual(mockOrgUnitTree.name);
    expect(node.children).toEqual(mockOrgUnitTree.children);
    expect(node.url).toEqual([`orgUnitDetails/${mockOrgUnitTree.id}`]);
  });
});
