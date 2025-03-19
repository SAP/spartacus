import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { EMPTY, Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
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
  fixture.detectChanges();
  configuratorStorefrontUtilsService = TestBed.inject(
    ConfiguratorStorefrontUtilsService
  );

  spyOn(configuratorStorefrontUtilsService, 'getElement').and.callThrough();
  spyOn(configuratorStorefrontUtilsService, 'changeStyling').and.stub();
  spyOn(
    configuratorStorefrontUtilsService,
    'getSpareViewportHeight'
  ).and.callThrough();
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return defaultConfigObservable;
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(ConfigurationTestData.mockRouterState);
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
  standalone: false,
})
class MockConfiguratorOverviewFilterComponent {
  @Input() showFilterBar: boolean = true;
  @Input() config: Configurator.ConfigurationWithOverview;
}

@Component({
  selector: 'cx-configurator-overview-menu',
  template: '',
  standalone: false,
})
class MockConfiguratorOverviewMenuComponent {
  @Input() config: Configurator.ConfigurationWithOverview;
}

describe('ConfiguratorOverviewSidebarComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        MockConfiguratorOverviewFilterComponent,
        MockConfiguratorOverviewMenuComponent,
      ],
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
      ],
    }).compileComponents();
    initTestComponent();
  }));

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should render overview menu component by default', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-configurator-overview-menu'
    );
  });

  it('should render overview filter component when filter tab is selected', () => {
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

  it('should render overview menu component when menu tab is selected', () => {
    component.onFilter();
    fixture.detectChanges();
    // click menu button
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

  it('should render overview menu component when menu tab is selected by enter-key', () => {
    component.onFilter();
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

  it('should render overview menu component when menu tab is selected by space-key', () => {
    component.onFilter();
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
      expect(component.getTabIndexForFilterTab()).toBe(0);
    });

    it('should return tabindex -1 if menu tab  content is displayed', () => {
      component.showFilter = false;
      expect(component.getTabIndexForFilterTab()).toBe(-1);
    });
  });

  describe('switchTabOnArrowPress', () => {
    it('should focus filter tab if right arrow pressed and if current tab is menu tab', () => {
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      });
      component.switchTabOnArrowPress(event, '#menuTab');
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
      component.switchTabOnArrowPress(event, '#menuTab');
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
      component.switchTabOnArrowPress(leftEvent, '#menuTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
      const upEvent = new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      });
      component.switchTabOnArrowPress(upEvent, '#menuTab');
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
      component.switchTabOnArrowPress(leftEvent, '#menuTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.filter '
      );
      const downEvent = new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      });
      component.switchTabOnArrowPress(downEvent, '#menuTab');
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
      component.switchTabOnArrowPress(event, '#filterTab');
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
      component.switchTabOnArrowPress(event, '#filterTab');
      let focusedElement = document.activeElement;
      expect(focusedElement?.innerHTML).toBe(
        ' configurator.overviewSidebar.menu '
      );
    });
  });
});
