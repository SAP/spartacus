import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import { ExternalRoutesConfig } from './external-routes-config';
import { ExternalRoutesGuard } from './external-routes.guard';
import { ExternalRoutesService } from './external-routes.service';

describe('ExternalRoutesService', () => {
  let service: ExternalRoutesService;
  let router: Router;

  beforeEach(() => {
    const mockUrlMatcherFactoryService: Partial<UrlMatcherFactoryService> = {
      getOppositeUrlMatcher: matcher => `oppositeTo-${matcher}` as any,
      getGlobUrlMatcher: patterns => `globUrlMatcherFor-${patterns[0]}` as any,
    };

    TestBed.configureTestingModule({
      providers: [
        ExternalRoutesService,
        {
          provide: ExternalRoutesConfig,
          useValue: { routing: { internal: ['/internal/path/pattern'] } },
        },
        {
          provide: UrlMatcherFactoryService,
          useValue: mockUrlMatcherFactoryService,
        },
      ],

      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '**',
            component: {} as any,
          },
        ]),
      ],
    });

    service = TestBed.inject(ExternalRoutesService);
    router = TestBed.inject(Router);
  });

  describe('addExternalRoutes', () => {
    it('should prepend the external route with a special guard', () => {
      expect(router.config.length).toBe(1);
      service.addRoutes();
      expect(router.config.length).toBe(2);
      expect(router.config[0].canActivate[0]).toBe(ExternalRoutesGuard);
    });

    it('should prepend the external route not accepting internal routes', () => {
      service.addRoutes();
      expect(router.config[0].matcher).toEqual(
        'oppositeTo-globUrlMatcherFor-/internal/path/pattern'
      );
    });
  });
});
