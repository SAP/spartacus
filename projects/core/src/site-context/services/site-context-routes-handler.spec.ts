import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import { SiteContextParamsService } from '../facade/site-context-params.service';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import createSpy = jasmine.createSpy;

fdescribe('SiteContextRoutesHandlerService', () => {
  let mockRouterEvents;
  let mockRouter;
  let mockLocation;
  let activeLanguage;
  let mockLanguageService;
  let mockSiteContextParamsService;
  let service: SiteContextRoutesHandler;

  beforeEach(() => {
    mockRouterEvents = new Subject();

    mockRouter = {
      events: mockRouterEvents,
      url: 'test',
      parseUrl: createSpy().and.callFake(url => url + '_a'),
      serializeUrl: createSpy().and.callFake(url => url + '_b')
    };

    mockLocation = {
      replaceState: createSpy()
    };

    activeLanguage = new BehaviorSubject('en');

    mockLanguageService = {
      getActive: createSpy().and.returnValue(activeLanguage)
    };

    mockSiteContextParamsService = {
      getContextParameters: () => ['language'],
      getSiteContextService: () => mockLanguageService,
      getParamValues: () => ['en', 'de'],
      setValue: createSpy('setValue')
    };

    TestBed.configureTestingModule({
      providers: [
        SiteContextRoutesHandler,
        {
          provide: SiteContextParamsService,
          useValue: mockSiteContextParamsService
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: Location,
          useValue: mockLocation
        }
      ]
    });

    service = TestBed.get(SiteContextRoutesHandler);
    service.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set context parameter on route navigation', () => {
    mockRouterEvents.next(new NavigationStart(1, 'en/'));
    expect(mockSiteContextParamsService.setValue).toHaveBeenCalledWith(
      'language',
      'en'
    );
  });

  it('should replace location state on siteContext change', () => {
    activeLanguage.next('de');
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('test');
    expect(mockRouter.serializeUrl).toHaveBeenCalledWith('test_a');
    expect(mockLocation.replaceState).toHaveBeenCalledWith('test_a_b');
  });
});
