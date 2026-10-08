import {
  Component,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FeatureDirective,
  FeatureToggles,
  MockTranslatePipe,
  Product,
  ProductService,
  provideDefaultConfig,
  RouterState,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { defaultConfiguratorUISettingsConfig } from '../config/default-configurator-ui-settings.config';
import { EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorOverviewFilterComponent } from '../overview-filter/configurator-overview-filter.component';
import { ConfiguratorOverviewFormComponent } from '../overview-form/configurator-overview-form.component';
import { ConfiguratorOverviewMenuComponent } from '../overview-menu/configurator-overview-menu.component';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorOverviewSidebarComponent } from './configurator-overview-sidebar.component';

const OWNER: CommonConfigurator.Owner =
  ConfigurationTestData.productConfiguration.owner;
const CONFIG_ID = '1234-56-7890';
const CONFIGURATION: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER),
  overview: ConfigurationTestData.productConfiguration.overview,
};

let component: ConfiguratorOverviewSidebarComponent;
let fixture: ComponentFixture<ConfiguratorOverviewSidebarComponent>;
let htmlElem: HTMLElement;
let defaultConfigObservable: any;
let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

function initTestComponent() {
  defaultConfigObservable = of(CONFIGURATION);
  fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.ghostStyle = false;
  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService
  );

  vi.spyOn(configuratorStorefrontUtilsService, 'getElement');
  vi.spyOn(
    configuratorStorefrontUtilsService,
    'changeStyling'
  ).mockImplementation(() => {});
  vi.spyOn(configuratorStorefrontUtilsService, 'getSpareViewportHeight');
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return defaultConfigObservable;
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of({
      owner: {
        ...ConfigurationTestData.productConfiguration.owner,
        configuratorType: ConfiguratorType.VARIANT,
      },
    } as ConfiguratorRouter.Data);
  }
}

class MockConfiguratorRouterExtractorServiceCpqOverview {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of({
      owner: {
        ...ConfigurationTestData.productConfiguration.owner,
        configuratorType: ConfiguratorType.CPQ,
      },
    } as ConfiguratorRouter.Data);
  }
}

class MockConfiguratorStorefrontUtilsService {
  getElement(): void {}
  getElements(): void {}
  getPrefixId(): void {}
  changeStyling(): void {}
  removeStyling(): void {}
  createOvMenuItemId(): void {}
  getSpareViewportHeight(): void {}
  getVerticallyScrolledPixels(): void {}
  isDisplayOnlyVariant(): void {}
  isOverviewMenuFilterTabVisible(
    configuratorType: string | undefined
  ): boolean {
    return configuratorType === ConfiguratorType.VARIANT;
  }
  idSelector(id: string): string {
    return '#' + id;
  }
  scrollToConfigurationElement(): void {}
  focusConfigurationElement(): void {}
}

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(ConfigurationTestData.mockRouterState);
  }

  go = () => Promise.resolve(true);
}

class MockProductService {
  get(): Observable<Product> {
    return EMPTY;
  }
}

@Component({
  selector: 'cx-configurator-overview-filter',
  template: '',
})
class MockConfiguratorOverviewFilterComponent {
  @Input() showFilterBar: boolean = true;
  @Input() config: Configurator.ConfigurationWithOverview;
}

@Component({
  selector: 'cx-configurator-overview-menu',
  template: '',
})
class MockConfiguratorOverviewMenuComponent {
  @Input() config: Configurator.ConfigurationWithOverview;
}

/**
 * Renders legacy vs CPQ-container template branches based on `productConfiguratorCPQContainer`.
 */
@Directive({ selector: '[cxFeature]', standalone: true })
class OverviewSidebarMockFeatureDirective {
  private featureToggles = inject(FeatureToggles);

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set cxFeature(feature: string) {
    this.viewContainer.clear();
    const featureText = feature.toString();
    if (!featureText.includes('productConfiguratorCPQContainer')) {
      if (!featureText.includes('!')) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      return;
    }
    const cpqContainerEnabled =
      !!this.featureToggles.productConfiguratorCPQContainer;
    const showBranch = featureText.includes('!')
      ? !cpqContainerEnabled
      : cpqContainerEnabled;
    if (showBranch) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

function initSidebarWithCpqContainerToggle(cpqContainerEnabled: boolean): void {
  TestBed.inject(MockFeatureTogglesController).set(
    'productConfiguratorCPQContainer',
    cpqContainerEnabled
  );
  fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
  htmlElem = fixture.nativeElement;
  component = fixture.componentInstance;
  component.ghostStyle = false;
  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService
  );
  fixture.detectChanges();
}

describe('ConfiguratorOverviewSidebarComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ConfiguratorOverviewSidebarComponent],
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
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        provideDefaultConfig(defaultConfiguratorUISettingsConfig),
        provideMockFeatureToggles({ productConfiguratorCPQContainer: false }),
      ],
    })
      .overrideComponent(ConfiguratorOverviewSidebarComponent, {
        remove: {
          imports: [
            TranslatePipe,
            FeatureDirective,
            ConfiguratorOverviewFilterComponent,
            ConfiguratorOverviewMenuComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            OverviewSidebarMockFeatureDirective,
            MockConfiguratorOverviewFilterComponent,
            MockConfiguratorOverviewMenuComponent,
          ],
        },
      })
      .compileComponents();
    initTestComponent();
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  it('should render overview menu component by default', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should render visible Menu and Filter tabs when filter tab is shown', async () => {
    fixture.detectChanges();
    const overviewMenuFilterTabVisible = await firstValueFrom(
      component.overviewMenuFilterTabVisible$
    );
    expect(
      component.isOverviewFilterTabShown(overviewMenuFilterTabVisible)
    ).toBe(true);
    const tabs = fixture.debugElement.queryAll(
      By.css('.cx-menu-bar button[role="tab"]')
    );
    expect(tabs).toHaveLength(2);
    const filterTab = tabs[1].nativeElement as HTMLButtonElement;
    expect(filterTab.disabled).toBe(false);
    expect(filterTab.classList.contains('cx-visually-hidden')).toBe(false);
    expect(filterTab.getAttribute('aria-hidden')).toBeNull();
  });

  it('should render overview filter component when filter tab is selected', () => {
    fixture.detectChanges();
    // click filter button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('click');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-filter'
    );
  });

  it('should render overview filter component when filter tab is selected by enter-key', () => {
    fixture.detectChanges();
    // keypress on filter button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('keydown.enter');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-filter'
    );
  });

  it('should render overview filter component when filter tab is selected by space-key', () => {
    fixture.detectChanges();
    // keypress on filter button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('keydown.space');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-filter'
    );
  });

  it('should render overview menu component when menu tab is selected', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    // Switch to filter tab first
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('click');
    fixture.detectChanges();
    // click menu button to switch back
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[0]
      .triggerEventHandler('click');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should render overview menu component when menu tab is selected by enter-key', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    // Switch to filter tab first
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('click');
    fixture.detectChanges();
    // keypress on menu button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[0]
      .triggerEventHandler('keydown.enter');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should render overview menu component when menu tab is selected by space-key', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    // Switch to filter tab first
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[1]
      .triggerEventHandler('click');
    fixture.detectChanges();
    // keypress on menu button
    fixture.debugElement
      .queryAll(By.css('.cx-menu-bar button'))[0]
      .triggerEventHandler('keydown.space');
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should set showFilters to true by calling onFilter', () => {
    component.onFilter();
    expect(component.showFilter).toBe(true);
  });

  it('should set showFilters to false by calling onMenu', () => {
    component.showFilter = true;
    component.onMenu();
    expect(component.showFilter).toBe(false);
  });

  describe('getTabIndexForMenuTab', () => {
    it('should return tabindex 0 if menu tab content is displayed', () => {
      component.showFilter = false;
      expect(component.getTabIndexForMenuTab()).toBe(0);
    });

    it('should return tabindex -1 if filter content is displayed', () => {
      component.showFilter = true;
      expect(component.getTabIndexForMenuTab()).toBe(-1);
    });
  });

  describe('getTabIndexForFilterTab', () => {
    it('should return tabindex 0 if filter tab content is displayed', () => {
      component.showFilter = true;
      expect(component.getTabIndexForFilterTab(true)).toBe(0);
    });

    it('should return tabindex -1 if menu tab  content is displayed', () => {
      component.showFilter = false;
      expect(component.getTabIndexForFilterTab(true)).toBe(-1);
    });

    it('should return tabindex -1 if filter tab is not interactive when productConfiguratorCPQContainer is enabled', () => {
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
      component.showFilter = true;
      expect(component.getTabIndexForFilterTab(false)).toBe(-1);
    });
  });

  describe('switchTabOnArrowPress', () => {
    it('should not focus tabs when filter tab is disabled and productConfiguratorCPQContainer is enabled', () => {
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });
      component.switchTabOnArrowPress(event, '#menuTab', false);
      expect(event.defaultPrevented).toBe(false);
    });

    it('should focus filter tab if right arrow pressed and if current tab is menu tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });
      component.switchTabOnArrowPress(event, '#menuTab', true);
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
    });

    it('should focus filter tab if left arrow pressed and if current tab is menu tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(event, '#menuTab', true);
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
    });

    it('should not change focus if up arrow pressed', () => {
      fixture.detectChanges();
      const leftEvent = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(leftEvent, '#menuTab', true);
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
      const upEvent = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });
      component.switchTabOnArrowPress(upEvent, '#menuTab', true);
      document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
    });

    it('should not change focus if down arrow pressed', () => {
      fixture.detectChanges();
      const leftEvent = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(leftEvent, '#menuTab', true);
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
      const downEvent = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });
      component.switchTabOnArrowPress(downEvent, '#menuTab', true);
      document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
    });

    it('should focus menu tab if right arrow pressed and if current tab is filter tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });
      component.switchTabOnArrowPress(event, '#filterTab', true);
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.menu '
      );
    });

    it('should focus menu tab if left arrow pressed and if current tab is filter tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      });
      component.switchTabOnArrowPress(event, '#filterTab', true);
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.menu '
      );
    });
  });

  describe('overview menu filter tab visibility', () => {
    it('should derive overviewMenuFilterTabVisible from config when productConfiguratorCPQContainer is enabled', async () => {
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
      fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
      component = fixture.componentInstance;
      component.ghostStyle = false;
      fixture.detectChanges();
      await expect(
        firstValueFrom(component.overviewMenuFilterTabVisible$)
      ).resolves.toBe(true);
    });

    it('should not render filter tab when overviewMenuFilterTabVisible is false for CLOUD CPQ configurator type and productConfiguratorCPQContainer is enabled', async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [ConfiguratorOverviewSidebarComponent],
        providers: [
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorServiceCpqOverview,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfiguratorStorefrontUtilsService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
          provideDefaultConfig(defaultConfiguratorUISettingsConfig),
          provideMockFeatureToggles({ productConfiguratorCPQContainer: true }),
        ],
      })
        .overrideComponent(ConfiguratorOverviewSidebarComponent, {
          remove: {
            imports: [
              TranslatePipe,
              FeatureDirective,
              ConfiguratorOverviewFilterComponent,
              ConfiguratorOverviewMenuComponent,
            ],
          },
          add: {
            imports: [
              MockTranslatePipe,
              OverviewSidebarMockFeatureDirective,
              MockConfiguratorOverviewFilterComponent,
              MockConfiguratorOverviewMenuComponent,
            ],
          },
        })
        .compileComponents();
      initTestComponent();
      fixture.detectChanges();

      const menuBar = htmlElem.querySelector('.cx-menu-bar');
      expect(menuBar?.getAttribute('role')).toBe('tablist');

      const overviewMenuFilterTabVisible = await firstValueFrom(
        component.overviewMenuFilterTabVisible$
      );
      expect(overviewMenuFilterTabVisible).toBe(false);
      expect(
        component.isOverviewFilterTabShown(overviewMenuFilterTabVisible)
      ).toBe(false);

      const tabs = fixture.debugElement.queryAll(
        By.css('.cx-menu-bar button[role="tab"]')
      );
      expect(tabs).toHaveLength(1);

      const menuTab = tabs[0].nativeElement as HTMLButtonElement;
      expect(menuTab.classList.contains('active')).toBe(true);
      expect(menuTab.getAttribute('tabindex')).toBe('0');
      expect(menuTab.getAttribute('aria-selected')).toBe('true');

      expect(
        htmlElem.querySelector('.cx-menu-bar button[role="tab"]:not(.active)')
      ).toBeNull();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter'
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-menu'
      );
    });
  });

  describe('ghost sidebar', () => {
    it('should render ghost placeholder while configuration has no overview', () => {
      defaultConfigObservable = of(
        ConfiguratorTestUtils.createConfiguration(CONFIG_ID, OWNER)
      );
      fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
      htmlElem = fixture.nativeElement;
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.ghostStyle).toBe(true);
      expect(htmlElem.querySelector('.cx-ghost-menu')).not.toBeNull();
      expect(htmlElem.querySelector('.cx-menu-bar')).toBeNull();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-menu'
      );
    });
  });

  describe('isOverviewFilterTabShown', () => {
    it('should always return true when productConfiguratorCPQContainer is disabled', () => {
      expect(component.isOverviewFilterTabShown(false)).toBe(true);
      expect(component.isOverviewFilterTabShown(true)).toBe(true);
      expect(component.isOverviewFilterTabShown(undefined)).toBe(true);
    });

    it('should follow route visibility when productConfiguratorCPQContainer is enabled', () => {
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
      fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
      component = fixture.componentInstance;

      expect(component.isOverviewFilterTabShown(true)).toBe(true);
      expect(component.isOverviewFilterTabShown(false)).toBe(false);
      expect(component.isOverviewFilterTabShown(undefined)).toBe(false);
    });
  });

  describe('productConfiguratorCPQContainer', () => {
    it('should render legacy menu and filter tabs when the toggle is disabled', () => {
      initSidebarWithCpqContainerToggle(false);

      const tabs = fixture.debugElement.queryAll(
        By.css('.cx-menu-bar button[role="tab"]')
      );
      expect(tabs).toHaveLength(2);
      expect(
        htmlElem.querySelector('button.cx-configurator-overview-skip-link')
      ).toBeNull();
    });

    it('should render legacy filter content when the toggle is disabled', () => {
      initSidebarWithCpqContainerToggle(false);

      fixture.debugElement
        .queryAll(By.css('.cx-menu-bar button[role="tab"]'))[1]
        .triggerEventHandler('click');
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter'
      );
    });

    it('should render CPQ-container menu and filter tabs when the toggle is enabled and route allows the filter tab', () => {
      initSidebarWithCpqContainerToggle(true);

      const tabs = fixture.debugElement.queryAll(
        By.css('.cx-menu-bar button[role="tab"]')
      );
      expect(tabs).toHaveLength(2);
    });

    it('should render CPQ-container filter content when the toggle is enabled and route allows the filter tab', () => {
      initSidebarWithCpqContainerToggle(true);

      fixture.debugElement
        .queryAll(By.css('.cx-menu-bar button[role="tab"]'))[1]
        .triggerEventHandler('click');
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-overview-filter'
      );
    });

    it('should ignore route visibility for filter tabindex when the toggle is disabled', () => {
      initSidebarWithCpqContainerToggle(false);
      component.showFilter = true;
      expect(component.getTabIndexForFilterTab(false)).toBe(0);
    });

    it('should switch tabs on arrow press without route visibility when the toggle is disabled', () => {
      initSidebarWithCpqContainerToggle(false);

      const menuTab = fixture.debugElement.query(
        By.css('.cx-menu-bar button[role="tab"]')
      );
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      });
      vi.spyOn(event, 'preventDefault');
      menuTab.triggerEventHandler('keydown', event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should render legacy filter tab even when route marks filter tab hidden', async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [ConfiguratorOverviewSidebarComponent],
        providers: [
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorServiceCpqOverview,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfiguratorStorefrontUtilsService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
          provideDefaultConfig(defaultConfiguratorUISettingsConfig),
          provideMockFeatureToggles({ productConfiguratorCPQContainer: false }),
        ],
      })
        .overrideComponent(ConfiguratorOverviewSidebarComponent, {
          remove: {
            imports: [
              TranslatePipe,
              FeatureDirective,
              ConfiguratorOverviewFilterComponent,
              ConfiguratorOverviewMenuComponent,
            ],
          },
          add: {
            imports: [
              MockTranslatePipe,
              OverviewSidebarMockFeatureDirective,
              MockConfiguratorOverviewFilterComponent,
              MockConfiguratorOverviewMenuComponent,
            ],
          },
        })
        .compileComponents();
      initSidebarWithCpqContainerToggle(false);

      expect(
        await firstValueFrom(component.overviewMenuFilterTabVisible$)
      ).toBe(false);
      expect(
        component.isOverviewFilterTabShown(
          await firstValueFrom(component.overviewMenuFilterTabVisible$)
        )
      ).toBe(true);
      expect(
        fixture.debugElement.queryAll(By.css('.cx-menu-bar button[role="tab"]'))
      ).toHaveLength(2);
    });
  });

  describe('isSkipLinkEnabled', () => {
    it('should return false when productConfiguratorCPQContainer is disabled', () => {
      expect(component.isSkipLinkEnabled).toBe(false);
    });

    it('should return true when productConfiguratorCPQContainer is enabled', () => {
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
      fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
      component = fixture.componentInstance;
      expect(component.isSkipLinkEnabled).toBe(true);
    });
  });

  describe('skip link to overview content', () => {
    it('should not render the skip link if productConfiguratorCPQContainer is disabled', () => {
      fixture.detectChanges();
      expect(
        htmlElem.querySelector('button.cx-visually-hidden:not([role="tab"])')
      ).toBeNull();
    });

    describe('with productConfiguratorCPQContainer enabled', () => {
      beforeEach(() => {
        TestBed.inject(MockFeatureTogglesController).set(
          'productConfiguratorCPQContainer',
          true
        );
        fixture = TestBed.createComponent(ConfiguratorOverviewSidebarComponent);
        htmlElem = fixture.nativeElement;
        component = fixture.componentInstance;
        component.ghostStyle = false;
        fixture.detectChanges();
      });

      it('should render the skip link before the tab list', () => {
        const skipLink = htmlElem.querySelector(
          'button.cx-visually-hidden:not([role="tab"])'
        );
        expect(skipLink?.tagName).toBe('BUTTON');
        expect(skipLink?.textContent?.trim()).toBe(
          'configurator.a11y.skipToOverviewContent'
        );
        expect(skipLink?.nextElementSibling?.classList).toContain(
          'cx-menu-bar'
        );
      });

      it('should scroll to and focus the overview content on click', () => {
        vi.spyOn(
          configuratorStorefrontUtilsService,
          'scrollToConfigurationElement'
        );
        vi.spyOn(
          configuratorStorefrontUtilsService,
          'focusConfigurationElement'
        );
        fixture.debugElement
          .query(By.css('button.cx-visually-hidden:not([role="tab"])'))
          .triggerEventHandler('click');
        const selector =
          '#' + ConfiguratorOverviewFormComponent.OVERVIEW_CONTENT_ID;
        expect(
          configuratorStorefrontUtilsService.scrollToConfigurationElement
        ).toHaveBeenCalledWith(selector);
        expect(
          configuratorStorefrontUtilsService.focusConfigurationElement
        ).toHaveBeenCalledWith(selector);
      });
    });
  });
});
