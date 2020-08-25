import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Configurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { ConfigUtilsService } from '../service/config-utils.service';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from './../../core/facade/configurator-groups.service';
import * as ConfigurationTestData from './../../shared/testing/configuration-test-data';
import { ConfigPreviousNextButtonsComponent } from './config-previous-next-buttons.component';

let routerStateObservable = null;

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

const config: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }
}

class MockConfigUtilsService {
  scrollToConfigurationElement(): void {}
}

describe('ConfigPreviousNextButtonsComponent', () => {
  let classUnderTest: ConfigPreviousNextButtonsComponent;
  let fixture: ComponentFixture<ConfigPreviousNextButtonsComponent>;
  let configurationGroupsService: ConfiguratorGroupsService;
  let configuratorUtils: GenericConfigUtilsService;

  beforeEach(async(() => {
    routerStateObservable = of(ConfigurationTestData.mockRouterState);
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfigPreviousNextButtonsComponent],
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
          provide: ConfigUtilsService,
          useClass: MockConfigUtilsService,
        },
      ],
    })
      .overrideComponent(ConfigPreviousNextButtonsComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPreviousNextButtonsComponent);
    classUnderTest = fixture.componentInstance;
    configurationGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    fixture.detectChanges();
    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(config.owner);
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should display previous button as disabled if it is the first group', () => {
    spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
      of(null)
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-action'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('should display previous button as enabled if it is not the first group', () => {
    spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
      of('anyGroupId')
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-action'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });

  it('should display next button as disabled if it is the last group', () => {
    spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
      of(null)
    );
    fixture.detectChanges();
    const lastBtn = fixture.debugElement.query(By.css('.btn-secondary'))
      .nativeElement;
    expect(lastBtn.disabled).toBe(true);
  });

  it('should display next button as enabled if it is not the last group', () => {
    spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
      of('anyGroupId')
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-secondary'))
      .nativeElement;
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
    //usage of TestScheduler because of the async check in last line
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const previousGroup = cold('-a-b', {
        a: ConfigurationTestData.GROUP_ID_1,
        b: ConfigurationTestData.GROUP_ID_2,
      });
      //this just validates the testScheduler
      expectObservable(previousGroup.pipe(take(1))).toBe('-(a|)', {
        a: ConfigurationTestData.GROUP_ID_1,
      });

      spyOn(configurationGroupsService, 'getPreviousGroupId').and.returnValue(
        previousGroup
      );
      spyOn(configurationGroupsService, 'navigateToGroup');

      classUnderTest.onPrevious(config);
    });
    //this is the actual test
    expect(configurationGroupsService.navigateToGroup).toHaveBeenCalledTimes(1);
  });

  it('should navigate to group exactly one time on navigateToNextGroup', () => {
    //usage of TestScheduler because of the async check in last line
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(() => {
      const nextGroup = cold('-a-b', {
        a: ConfigurationTestData.GROUP_ID_1,
        b: ConfigurationTestData.GROUP_ID_2,
      });

      spyOn(configurationGroupsService, 'getNextGroupId').and.returnValue(
        nextGroup
      );
      spyOn(configurationGroupsService, 'navigateToGroup');

      classUnderTest.onNext(config);
    });

    expect(configurationGroupsService.navigateToGroup).toHaveBeenCalledTimes(1);
  });
});
