import { ChangeDetectionStrategy, Directive, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../testing/configurator-test-data';
import { GROUP_ID_1, PRODUCT_CODE } from '../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import { ConfiguratorPreviousNextButtonsComponent } from './configurator-previous-next-buttons.component';

let routerStateObservable: any = null;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockConfiguratorGroupsService {
  getCurrentGroupId() {
    return of('');
  }

  getNextGroupId() {
    return of('');
  }

  getPreviousGroupId() {
    return of('');
  }

  navigateToGroup() {}
}

const groups: Configurator.Group = {
  id: GROUP_ID_1,
  groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
  attributes: [],
  subGroups: [],
};

const configWithoutGroups: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    'CONFIG_ID',
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  ),
  productCode: PRODUCT_CODE,
  totalNumberOfIssues: 0,
  groups: [groups],
  flatGroups: [groups],
};

const config: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }

  isConfigurationLoading(): Observable<boolean> {
    return of(false);
  }
}

class MockConfigUtilsService {
  scrollToConfigurationElement(): void {}

  focusFirstAttribute(): void {}
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

describe('ConfigPreviousNextButtonsComponent', () => {
  let classUnderTest: ConfiguratorPreviousNextButtonsComponent;
  let fixture: ComponentFixture<ConfiguratorPreviousNextButtonsComponent>;
  let htmlElem: HTMLElement;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let configurationGroupsService: ConfiguratorGroupsService;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;

  beforeEach(
    waitForAsync(() => {
      routerStateObservable = of(ConfigurationTestData.mockRouterState);
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          ConfiguratorPreviousNextButtonsComponent,
          MockFocusDirective,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
        ],
      })
        .overrideComponent(ConfiguratorPreviousNextButtonsComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorPreviousNextButtonsComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    configurationGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    fixture.detectChanges();
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(config.owner);

    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );
    spyOn(
      configuratorStorefrontUtilsService,
      'focusFirstAttribute'
    ).and.callThrough();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it("should not display 'previous' & 'next' buttons", () => {
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(configWithoutGroups)
    );
    fixture = TestBed.createComponent(ConfiguratorPreviousNextButtonsComponent);
    classUnderTest = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.childElementCount).toBe(0);
  });

  it('should display previous button as disabled if it is the first group', () => {
    spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
      of(null)
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(
      By.css('.btn-action')
    ).nativeElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('should display previous button as enabled if it is not the first group', () => {
    spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
      of('anyGroupId')
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(
      By.css('.btn-action')
    ).nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });

  it('should display next button as disabled if it is the last group', () => {
    spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
      of(null)
    );
    fixture.detectChanges();
    const lastBtn = fixture.debugElement.query(
      By.css('.btn-secondary')
    ).nativeElement;
    expect(lastBtn.disabled).toBe(true);
  });

  it('should display next button as enabled if it is not the last group', () => {
    spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
      of('anyGroupId')
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(
      By.css('.btn-secondary')
    ).nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });

  it('should derive that current group is last group depending on group service nextGroup function', () => {
    const nextGroup = cold('-a-b-c', {
      a: ConfigurationTestData.GROUP_ID_1,
      b: ConfigurationTestData.GROUP_ID_2,
      c: null,
    });

    spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
      nextGroup
    );

    expect(classUnderTest.isLastGroup(config.owner)).toBeObservable(
      cold('-a-b-c', {
        a: false,
        b: false,
        c: true,
      })
    );
  });

  it('should derive that current group is first group depending on group service getPreviousGroup function', () => {
    const previousGroup = cold('-a-b-c-d-e', {
      a: null,
      b: ConfigurationTestData.GROUP_ID_2,
      c: null,
      d: '',
      e: ' ',
    });

    spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
      previousGroup
    );

    expect(classUnderTest.isFirstGroup(config.owner)).toBeObservable(
      cold('-a-b-c-d-e', {
        a: true,
        b: false,
        c: true,
        d: true,
        e: false,
      })
    );
  });

  it('should navigate to group exactly one time on navigateToPreviousGroup', () => {
    const previousGroup = cold('-a-b|', {
      a: ConfigurationTestData.GROUP_ID_1,
      b: ConfigurationTestData.GROUP_ID_2,
    });

    spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
      previousGroup
    );
    spyOn(configurationGroupsService, 'navigateToGroup');

    classUnderTest.onPrevious(config);
    previousGroup.subscribe({
      complete: () => {
        expect(
          configurationGroupsService.navigateToGroup
        ).toHaveBeenCalledTimes(1);
      },
    });
  });

  it('should navigate to group exactly one time on navigateToNextGroup', () => {
    const nextGroup = cold('-a-b|', {
      a: ConfigurationTestData.GROUP_ID_1,
      b: ConfigurationTestData.GROUP_ID_2,
    });

    spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
      nextGroup
    );
    spyOn(configurationGroupsService, 'navigateToGroup');

    classUnderTest.onNext(config);
    nextGroup.subscribe({
      complete: () => {
        expect(
          configurationGroupsService.navigateToGroup
        ).toHaveBeenCalledTimes(1);
      },
    });
  });

  it('should call focusFirstAttribute', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    //we need to run the test in a test scheduler
    //because of the delay() in method focusFirstAttribute
    testScheduler.run(() => {
      const configurationLoading = cold('-a-b', {
        a: true,
        b: false,
      });
      spyOn(
        configuratorCommonsService,
        'isConfigurationLoading'
      ).and.returnValue(configurationLoading);
      classUnderTest['focusFirstAttribute']();
    });
    expect(
      configuratorStorefrontUtilsService.focusFirstAttribute
    ).toHaveBeenCalledTimes(1);
  });

  describe('Accessibility', () => {
    it("should contain action button element with 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-action',
        0,
        'aria-label',
        'configurator.a11y.previous',
        'configurator.button.previous'
      );
    });

    it("should contain secondary button element with 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-secondary',
        0,
        'aria-label',
        'configurator.a11y.next',
        'configurator.button.next'
      );
    });
  });
});
