import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import { SiteContextParamsService } from '../facade/site-context-params.service';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import createSpy = jasmine.createSpy;
import { SiteContextUrlSerializer } from './site-context-url-serializer';

describe('SiteContextRoutesHandlerService', () => {
  let mockRouterEvents;
  let mockRouter;
  let mockLocation;
  let activeLanguage;
  let mockLanguageService;
  let mockSiteContextParamsService;
  let mockSiteContextUrlSerializer;
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

    mockSiteContextUrlSerializer = {
      urlExtractContextParameters: url => ({ params: { language: url } })
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
        },
        {
          provide: SiteContextUrlSerializer,
          useValue: mockSiteContextUrlSerializer
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
    mockRouterEvents.next(new NavigationStart(1, 'en'));
    expect(mockSiteContextParamsService.setValue).toHaveBeenCalledWith(
      'language',
      'en'
    );
  });

  it('should reserialize url on siteContext change', () => {
    activeLanguage.next('de');
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('test');
    expect(mockRouter.serializeUrl).toHaveBeenCalledWith('test_a');
  });

  it('should replace location state on siteContext change', () => {
    activeLanguage.next('de');
    expect(mockLocation.replaceState).toHaveBeenCalledWith('test_a_b');
  });
});
