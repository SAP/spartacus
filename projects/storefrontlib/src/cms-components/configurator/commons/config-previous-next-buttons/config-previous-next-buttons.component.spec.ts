import { ChangeDetectionStrategy, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ConfiguratorGroupsService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigPreviousNextButtonsComponent } from './config-previous-next-buttons.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorGroupsService {
  getCurrentGroup() {
    return of('');
  }
  getNextGroup() {
    return of('');
  }
  getPreviousGroup() {
    return of('');
  }
}

describe('ConfigPreviousNextButtonsComponent', () => {
  let classUnderTest: ConfigPreviousNextButtonsComponent;
  let fixture: ComponentFixture<ConfigPreviousNextButtonsComponent>;
  let configurationGroupsService: ConfiguratorGroupsService;

  beforeEach(async(() => {
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
    configurationGroupsService = TestBed.get(ConfiguratorGroupsService as Type<
      ConfiguratorGroupsService
    >);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('isFirstGroup should return true if the previous group of current group is null', () => {
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    spyOn(configurationGroupsService, 'getPreviousGroup').and.returnValue(
      of(null)
    );
    const isFirstGroup = classUnderTest.isFirstGroup();
    expect(isFirstGroup).toBeDefined();
    isFirstGroup.subscribe(group => {
      expect(group).toEqual(true);
    });
  });

  it('isFirstGroup should return false if the previous group of current group is not null', () => {
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    spyOn(configurationGroupsService, 'getPreviousGroup').and.returnValue(
      of('anyGroupId')
    );
    const isFirstGroup = classUnderTest.isFirstGroup();
    expect(isFirstGroup).toBeDefined();
    isFirstGroup.subscribe(group => {
      expect(group).toEqual(false);
    });
  });

  it('isLastGroup should return true if the next group of current group is null', () => {
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    spyOn(configurationGroupsService, 'getNextGroup').and.returnValue(of(null));
    const isLastGroup = classUnderTest.isLastGroup();
    expect(isLastGroup).toBeDefined();
    isLastGroup.subscribe(group => {
      expect(group).toEqual(true);
    });
  });

  it('isLastGroup should return false if the next group of current group is not null', () => {
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    spyOn(configurationGroupsService, 'getNextGroup').and.returnValue(
      of('anyGroupId')
    );
    const isLastGroup = classUnderTest.isLastGroup();
    expect(isLastGroup).toBeDefined();
    isLastGroup.subscribe(group => {
      expect(group).toEqual(false);
    });
  });

  it('should display previous button as disabled if it is the first group', () => {
    spyOn(configurationGroupsService, 'getPreviousGroup').and.returnValue(
      of(null)
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-action'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('should display previous button as enabled if it is not the first group', () => {
    spyOn(configurationGroupsService, 'getPreviousGroup').and.returnValue(
      of('anyGroupId')
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-action'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });

  it('should display next button as disabled if it is the last group', () => {
    spyOn(configurationGroupsService, 'getNextGroup').and.returnValue(of(null));
    fixture.detectChanges();
    const lastBtn = fixture.debugElement.query(By.css('.btn-secondary'))
      .nativeElement;
    expect(lastBtn.disabled).toBe(true);
  });

  it('should display next button as enabled if it is not the last group', () => {
    spyOn(configurationGroupsService, 'getNextGroup').and.returnValue(
      of('anyGroupId')
    );
    fixture.detectChanges();
    const prevBtn = fixture.debugElement.query(By.css('.btn-secondary'))
      .nativeElement;
    expect(prevBtn.disabled).toBe(false);
  });
});
