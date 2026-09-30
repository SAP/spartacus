import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFormComponent } from '../overview-form/configurator-overview-form.component';
import { ConfiguratorOverviewMenuComponent } from '../overview-menu/configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
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

class MockConfiguratorStorefrontUtilsService {
  idSelector(id: string): string {
    return '#' + id;
  }
  scrollToConfigurationElement(): void {}
  focusConfigurationElement(): void {}
}

describe('ConfiguratorOverviewMenuStandaloneComponent', () => {
  let component: ConfiguratorOverviewMenuStandaloneComponent;
  let fixture: ComponentFixture<ConfiguratorOverviewMenuStandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfiguratorStorefrontUtilsService,
        },
        provideMockFeatureToggles({ productConfiguratorCPQContainer: false }),
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
  });

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

  it('should render overview menu with configuration', () => {
    const menu = fixture.debugElement.query(
      By.directive(MockConfiguratorOverviewMenuComponent)
    );
    expect(menu).toBeTruthy();
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

  describe('skip link to overview content', () => {
    it('should not render the skip link if productConfiguratorCPQContainer is disabled', () => {
      expect(
        fixture.debugElement.query(
          By.css('.cx-configurator-overview-skip-link')
        )
      ).toBeNull();
    });

    describe('with productConfiguratorCPQContainer enabled', () => {
      beforeEach(() => {
        TestBed.inject(MockFeatureTogglesController).set(
          'productConfiguratorCPQContainer',
          true
        );
        fixture = TestBed.createComponent(
          ConfiguratorOverviewMenuStandaloneComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should render the skip link before the menu bar', () => {
        const skipLink: HTMLElement = fixture.debugElement.query(
          By.css('.cx-configurator-overview-skip-link')
        ).nativeElement;
        expect(skipLink.tagName).toBe('BUTTON');
        expect(skipLink.textContent?.trim()).toBe(
          'configurator.a11y.skipToOverviewContent'
        );
        expect(skipLink.nextElementSibling?.classList).toContain('cx-menu-bar');
      });

      it('should scroll to and focus the overview content on click', () => {
        const utilsService = TestBed.inject(ConfiguratorStorefrontUtilsService);
        spyOn(utilsService, 'scrollToConfigurationElement');
        spyOn(utilsService, 'focusConfigurationElement');
        fixture.debugElement
          .query(By.css('.cx-configurator-overview-skip-link'))
          .triggerEventHandler('click');
        const selector =
          '#' + ConfiguratorOverviewFormComponent.OVERVIEW_CONTENT_ID;
        expect(utilsService.scrollToConfigurationElement).toHaveBeenCalledWith(
          selector
        );
        expect(utilsService.focusConfigurationElement).toHaveBeenCalledWith(
          selector
        );
      });
    });
  });
});
