import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import { RoutingMigrationConfig } from './routing-migration-config';
import { RoutingMigrationGuard } from './routing-migration.guard';
import { RoutingMigrationService } from './routing-migration.service';

describe('RoutingMigrationService', () => {
  let service: RoutingMigrationService;
  let router: Router;

  beforeEach(() => {
    const mockUrlMatcherFactoryService: Partial<UrlMatcherFactoryService> = {
      getOppositeUrlMatcher: matcher => `oppositeTo-${matcher}` as any,
      getGlobUrlMatcher: patterns => `globUrlMatcherFor-${patterns[0]}` as any,
    };

    TestBed.configureTestingModule({
      providers: [
        RoutingMigrationService,
        {
          provide: RoutingMigrationConfig,
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

    service = TestBed.get(RoutingMigrationService);
    router = TestBed.get(Router);
  });

  describe('addMigrationRoutes', () => {
    it('should prepend the migration route with a special guard', () => {
      expect(router.config.length).toBe(1);
      service.addMigrationRoutes();
      expect(router.config.length).toBe(2);
      expect(router.config[0].canActivate[0]).toBe(RoutingMigrationGuard);
    });

    it('should prepend the migration route not accepting internal routes', () => {
      service.addMigrationRoutes();
      expect(router.config[0].matcher).toEqual(
        'oppositeTo-globUrlMatcherFor-/internal/path/pattern'
      );
    });
  });
});
