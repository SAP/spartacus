import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
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
const pageTemplateCpq = 'CpqConfigurationTemplate';
const pageTemplateOther = 'OtherTemplate';
const sectionHeader = 'header';
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
      sectionHeader
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
