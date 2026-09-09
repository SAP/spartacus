import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewMenuComponent } from '../overview-menu/configurator-overview-menu.component';
import { ConfiguratorOverviewMenuStandaloneComponent } from './configurator-overview-menu-standalone.component';

const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const CONFIG_ID = '1234-56-7890';
const CONFIGURATION: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration.overview,
};
const CONFIGURATION_WITHOUT_OVERVIEW: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
};

@Component({
  selector: 'cx-configurator-overview-menu',
  template: '',
})
class MockConfiguratorOverviewMenuComponent {
  @Input() config: Configurator.ConfigurationWithOverview;
  @Input() navigationSlotSelector: string;
  @Input() overviewHeaderSelector: string;
}

let configuration$: Observable<Configurator.Configuration> = of(CONFIGURATION);

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configuration$;
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(ConfigurationTestData.mockRouterState);
  }
}

describe('ConfiguratorOverviewMenuStandaloneComponent', () => {
  let component: ConfiguratorOverviewMenuStandaloneComponent;
  let fixture: ComponentFixture<ConfiguratorOverviewMenuStandaloneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorOverviewMenuStandaloneComponent],
      providers: [
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfiguratorRouterExtractorService,
        },
      ],
    })
      .overrideComponent(ConfiguratorOverviewMenuStandaloneComponent, {
        remove: {
          imports: [TranslatePipe, ConfiguratorOverviewMenuComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockConfiguratorOverviewMenuComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    configuration$ = of(CONFIGURATION);
    fixture = TestBed.createComponent(
      ConfiguratorOverviewMenuStandaloneComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render overview menu with CPQ slot selectors', () => {
    const menu = fixture.debugElement.query(
      By.directive(MockConfiguratorOverviewMenuComponent)
    );
    expect(menu).toBeTruthy();
    expect(menu.componentInstance.navigationSlotSelector).toBe(
      'cx-page-slot.CpqConfigOverviewMenu'
    );
    expect(menu.componentInstance.overviewHeaderSelector).toBe(
      '.CpqConfigHeader'
    );
    expect(menu.componentInstance.config).toEqual(CONFIGURATION);
    expect(component.ghostStyle).toBeFalsy();
  });

  it('should render a single non-clickable menu tab bar entry', () => {
    const menuBar = fixture.debugElement.query(By.css('.cx-menu-bar'));
    expect(menuBar).toBeTruthy();

    const menuBarItems = fixture.debugElement.queryAll(
      By.css('.cx-menu-bar-item')
    );
    expect(menuBarItems.length).toBe(1);
    expect(menuBarItems[0].nativeElement.classList).toContain('active');
    expect(menuBarItems[0].nativeElement.tagName).not.toBe('BUTTON');
  });

  it('should render ghost menu and keep ghostStyle when overview is missing', () => {
    configuration$ = of(CONFIGURATION_WITHOUT_OVERVIEW);
    fixture = TestBed.createComponent(
      ConfiguratorOverviewMenuStandaloneComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-ghost-menu'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('.cx-ghost-menu-bar'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(
        By.directive(MockConfiguratorOverviewMenuComponent)
      )
    ).toBeFalsy();
    expect(component.ghostStyle).toBeTruthy();
  });
});
