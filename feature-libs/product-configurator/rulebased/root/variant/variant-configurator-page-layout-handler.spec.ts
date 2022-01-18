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
import { VariantConfiguratorPageLayoutHandler } from './variant-configurator-page-layout-handler';

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

const mockLayoutConfig: LayoutConfig = {
  layoutSlots: {
    VariantConfigurationOverviewTemplate: {
      headerDisplayOnly: {
        lg: {
          slots: displayOnlyHeaderSlotsLargeResolution,
        },
        xs: {
          slots: displayOnlyHeaderSlotsSmallResolution,
        },
      },
    },
  },
};
const headerSlots = ['SiteLogo', 'MiniCart'];

const pageTemplateVCOverview =
  VariantConfiguratorPageLayoutHandler['templateName'];
const pageTemplateOther = 'OtherTemplate';
const sectionHeader = 'header';
const sectionContent = 'content';

describe('VariantConfiguratorPageLayoutHandler', () => {
  let classUnderTest: VariantConfiguratorPageLayoutHandler;

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
      VariantConfiguratorPageLayoutHandler as Type<VariantConfiguratorPageLayoutHandler>
    );
  });

  it('should create service', () => {
    expect(classUnderTest).toBeDefined();
  });

  it('should not touch slots for section different than header', () => {
    let slots$ = cold('-a', {
      a: displayOnlyHeaderSlotsLargeResolution,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateVCOverview,
      sectionContent
    );
    expect(handledSlots$).toBeObservable(slots$);
  });

  it('should return SPA large resolution header slots in case we call overview in read-only mode, and ld resolution is active', () => {
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
      pageTemplateVCOverview,
      sectionHeader
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
      pageTemplateVCOverview,
      sectionHeader
    );
    expect(handledSlots$).toBeObservable(
      cold('-a-a', {
        a: displayOnlyHeaderSlotsSmallResolution,
      })
    );
  });

  it('should not change slots for header section in case we are on overview, but not in read-only mode', () => {
    routerData = {
      ...standardRouterData,
      pageType: ConfiguratorRouter.PageType.OVERVIEW,
    };
    let slots$ = cold('-aaa', {
      a: headerSlots,
    });
    const handledSlots$ = classUnderTest.handle(
      slots$,
      pageTemplateVCOverview,
      sectionHeader
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
      sectionHeader
    );
    expect(handledSlots$).toBeObservable(slots$);
  });
});
