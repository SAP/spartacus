import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { FakeTabsComponent } from './fake-tabs.component';
import { TabLink } from './tab-link.model';
import {
  I18nTestingModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { FakeTabsDesktopModule } from './fake-tabs-desktop/fake-tabs-desktop.module';
import { FakeTabsMobileModule } from './fake-tabs-mobile/fake-tabs-mobile.module';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';

const mockLinks: Array<TabLink> = [
  { name: 'link1', cxRoute: 'route1', active: false },
  { name: 'link2', cxRoute: 'route2', active: true },
  {
    name: 'link3',
    cxRoute: 'route3',
    active: false,
    params: { code: 'anotherCode' },
  },
];

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('FakeTabsComponent', () => {
  let component: FakeTabsComponent;
  let fixture: ComponentFixture<FakeTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FakeTabsComponent, MockUrlPipe],
      imports: [
        I18nTestingModule,
        RouterTestingModule,
        FakeTabsDesktopModule,
        FakeTabsMobileModule,
      ],
      providers: [{ provide: RoutingConfig, useClass: MockRoutingConfig }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeTabsComponent);
    component = fixture.componentInstance;
    component.links = mockLinks;
    component.code = 'testCode';
    component.routerBackLink = { name: 'backLink', cxRoute: 'backRoute' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getLinks', () => {
    it('should render component', () => {
      expect(component.getLinks()).toEqual([
        {
          name: 'link1',
          cxRoute: 'route1',
          active: false,
          params: { code: 'testCode' },
        },
        {
          name: 'link2',
          cxRoute: 'route2',
          active: true,
          params: { code: 'testCode' },
        },
        {
          name: 'link3',
          cxRoute: 'route3',
          active: false,
          params: { code: 'anotherCode' },
        },
      ]);
    });
  });
});
