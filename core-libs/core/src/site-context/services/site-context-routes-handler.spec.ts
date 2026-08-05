import { vi } from 'vitest';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SiteContextParamsService } from './site-context-params.service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import { SiteContextUrlSerializer } from './site-context-url-serializer';

describe('SiteContextRoutesHandler', () => {
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
      parseUrl: vi.fn().mockImplementation((url) => url + '_a'),
      serializeUrl: vi.fn().mockImplementation((url) => url + '_b'),
    };

    mockLocation = {
      replaceState: vi.fn(),
      path: () => 'test',
    };

    activeLanguage = new BehaviorSubject('en');

    mockLanguageService = {
      getActive: vi.fn().mockReturnValue(activeLanguage),
    };

    mockSiteContextParamsService = {
      getUrlEncodingParameters: () => ['language'],
      getSiteContextService: () => mockLanguageService,
      getParamValues: () => ['en', 'de'],
      setValue: vi.fn(),
    };

    mockSiteContextUrlSerializer = {
      urlExtractContextParameters: (url) => ({ params: { language: url } }),
    };

    TestBed.configureTestingModule({
      providers: [
        SiteContextRoutesHandler,
        {
          provide: SiteContextParamsService,
          useValue: mockSiteContextParamsService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: Location,
          useValue: mockLocation,
        },
        {
          provide: SiteContextUrlSerializer,
          useValue: mockSiteContextUrlSerializer,
        },
      ],
    });

    service = TestBed.inject(SiteContextRoutesHandler);
    service.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set context parameter on init', () => {
    expect(mockSiteContextParamsService.setValue).toHaveBeenCalledWith(
      'language',
      'test'
    );
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
