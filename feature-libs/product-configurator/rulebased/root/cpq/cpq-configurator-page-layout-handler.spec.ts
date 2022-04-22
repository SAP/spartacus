import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { BreakpointService, LayoutConfig } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CpqConfiguratorPageLayoutHandler } from './cpq-configurator-page-layout-handler';

const standardRouterData: ConfiguratorRouter.Data = {
  owner: ConfiguratorModelUtils.createInitialOwner(),
};
let routerData: ConfiguratorRouter.Data;
class MockRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(routerData);
  }
}
let isLargeResolution: boolean;
class MockBreakpointService {
  isUp(): Observable<boolean> {
    return of(isLargeResolution);
  }
}
const headerSlots = ['SiteLogo', 'MiniCart'];
const headerSlotsIncludingPreHeader = ['PreHeader', 'SiteLogo', 'MiniCart'];
const contentSlots = [
  'CpqConfigHeader',
  'CpqConfigBanner',
  'CpqConfigMenu',
  'CpqConfigContent',
  'CpqConfigOverviewBanner',
  'CpqConfigOverviewContent',
  'CpqConfigBottombar',
];

const displayOnlyHeaderSlotsLargeResolution = [
  'SiteContext',
  'SiteLinks',
  'SiteLogo',
  'SearchBox',
  'SiteLogin',
  'MiniCart',
  'NavigationBar',
];

const displayOnlyHeaderSlotsSmallResolution = [
  'SiteLogo',
  'SearchBox',
  'MiniCart',
];

const displayOnlyNavigationSlotsLargeResolution: string[] = [];

const displayOnlyNavigationSlotsSmallResolution = [
  'SiteLogin',
  'NavigationBar',
  'SiteContext',
  'SiteLinks',
];

const standardNavigationSlots = ['CpqConfigMenu'];

const mockLayoutConfig: LayoutConfig = {
  layoutSlots: {
    CpqConfigurationTemplate: {
      headerDisplayOnly: {
        lg: {
          slots: displayOnlyHeaderSlotsLargeResolution,
        },
        xs: {
          slots: displayOnlyHeaderSlotsSmallResolution,
        },
      },
      navigationDisplayOnly: {
        lg: { slots: displayOnlyNavigationSlotsLargeResolution },
        xs: {
          slots: displayOnlyNavigationSlotsSmallResolution,
        },
      },
    },
  },
};
const pageTemplateCpq = CpqConfiguratorPageLayoutHandler['templateName'];
const pageTemplateOther = 'OtherTemplate';

const sectionContent = 'content';

describe('CpqConfiguratorPageLayoutHandler', () => {
  let classUnderTest: CpqConfiguratorPageLayoutHandler;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockRouterExtractorService,
          },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService,
          },
          {
            provide: LayoutConfig,
            useValue: mockLayoutConfig,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      CpqConfiguratorPageLayoutHandler as Type<CpqConfiguratorPageLayoutHandler>
    );
  });

  it('should create service', () => {
    expect(classUnderTest).toBeDefined();
  });

  it('should not touch slots for section different than header', () => {
    let slots$ = cold('-a', {
      a: contentSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      sectionContent
    );
    expect(handledSlots$).toBeObservable(slots$);
  });

  it('should change slots for header section in cpq template in case we are on configuration page', () => {
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.CONFIGURATION,
    };
    let slots$ = cold('-a-a', {
      a: headerSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionHeader']
    );
    expect(handledSlots$).toBeObservable(
      cold('-a-a', {
        a: headerSlotsIncludingPreHeader,
      })
    );
  });

  it('should not change slots for header section in cpq template in case we are on overview page', () => {
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.OVERVIEW,
    };
    let slots$ = cold('-aaa', {
      a: headerSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionHeader']
    );
    expect(handledSlots$).toBeObservable(slots$);
  });

  it('should not change slots for header section in other template', () => {
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.CONFIGURATION,
    };
    let slots$ = cold('-a-a', {
      a: headerSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateOther,
      CpqConfiguratorPageLayoutHandler['sectionHeader']
    );
    expect(handledSlots$).toBeObservable(slots$);
  });

  it('should return SPA large resolution header slots in case we call overview in read-only mode, and lg resolution is active', () => {
    isLargeResolution = true;
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.OVERVIEW,
      displayOnly: true,
    };
    let slots$ = cold('-a-a', {
      a: headerSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionHeader']
    );
    expect(handledSlots$).toBeObservable(
      cold('-a-a', {
        a: displayOnlyHeaderSlotsLargeResolution,
      })
    );
  });

  it('should return SPA reduced resolution header slots in case we call overview in read-only mode, and a small resolution is active', () => {
    isLargeResolution = false;
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.OVERVIEW,
      displayOnly: true,
    };
    let slots$ = cold('-a-a', {
      a: headerSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionHeader']
    );
    expect(handledSlots$).toBeObservable(
      cold('-a-a', {
        a: displayOnlyHeaderSlotsSmallResolution,
      })
    );
  });

  it('should return SPA large resolution navigation slots in case we call overview in read-only mode, and lg resolution is active', () => {
    isLargeResolution = true;
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.OVERVIEW,
      displayOnly: true,
    };
    let slots$ = cold('-a-a', {
      a: [],
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionNavigation']
    );
    expect(handledSlots$).toBeObservable(
      cold('-a-a', {
        a: displayOnlyNavigationSlotsLargeResolution,
      })
    );
  });

  it('should return SPA small resolution navigation slots in case we call overview in read-only mode, and xs resolution is active', () => {
    isLargeResolution = false;
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.OVERVIEW,
      displayOnly: true,
    };
    let slots$ = cold('-a-a', {
      a: [],
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionNavigation']
    );
    expect(handledSlots$).toBeObservable(
      cold('-a-a', {
        a: displayOnlyNavigationSlotsSmallResolution,
      })
    );
  });

  it('should not change navigation slots in case we are on configuration page', () => {
    isLargeResolution = false;
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.CONFIGURATION,
      displayOnly: true,
    };
    let slots$ = cold('-a|', {
      a: standardNavigationSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateCpq,
      CpqConfiguratorPageLayoutHandler['sectionNavigation']
    );
    expect(handledSlots$).toBeObservable(
      cold('-a|', {
        a: standardNavigationSlots,
      })
    );
  });
});
