import { InjectionToken, NgZone, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RoutingMigrationConfig,
  RoutingMigrationConfigType,
} from './routing-migration-config';
import { RoutingMigrationGuard } from './routing-migration.guard';
import { RoutingMigrationService } from './routing-migration.service';

const InternalRouteGuard = new InjectionToken('InternalRouteGuard');

describe('RoutingMigrationService', () => {
  let service: RoutingMigrationService;
  let router: Router;
  let zone: NgZone;
  let internalRouteGuard: CanActivate;
  let migrationGuard: CanActivate;

  function beforeEachWithConfig(config: RoutingMigrationConfig) {
    internalRouteGuard = {
      canActivate: jasmine
        .createSpy('testGuard.canActivate')
        .and.returnValue(false),
    };
    migrationGuard = {
      canActivate: jasmine
        .createSpy('migrationGuard.canActivate')
        .and.returnValue(false),
    };

    TestBed.configureTestingModule({
      providers: [
        RoutingMigrationService,
        { provide: InternalRouteGuard, useValue: internalRouteGuard },
        {
          provide: RoutingMigrationGuard,
          useValue: migrationGuard,
        },
        {
          provide: RoutingMigrationConfig,
          useValue: config,
        },
      ],

      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '**',
            canActivate: [InternalRouteGuard],
            component: {} as any,
          },
        ]),
      ],
    });

    service = TestBed.get(RoutingMigrationService);
    router = TestBed.get(Router);
    zone = TestBed.get(NgZone as Type<NgZone>);
  }

  describe('addMigrationRoutes', () => {
    describe('when configured explicitly external paths', () => {
      beforeEach(() => {
        beforeEachWithConfig({
          routing: {
            migration: {
              paths: ['path/with/param/:someParam', 'normal/path', ''],
              type: RoutingMigrationConfigType.EXTERNAL,
            },
          },
        });
      });

      it('should prepend the migration route for configured URLs', () => {
        expect(router.config.length).toBe(1);
        service.addMigrationRoutes();
        expect(router.config.length).toBe(2);
        expect(router.config[0].canActivate[0]).toBe(RoutingMigrationGuard);
      });

      it('should not redirect for internal routes', async () => {
        service.addMigrationRoutes();
        await zone.run(() => router.navigate(['test-route']));
        expect(internalRouteGuard.canActivate).toHaveBeenCalled();
        expect(migrationGuard.canActivate).not.toHaveBeenCalled();
      });

      it('should redirect for external routes - root path', async () => {
        service.addMigrationRoutes();
        await zone.run(() => router.navigate(['/']));
        expect(internalRouteGuard.canActivate).not.toHaveBeenCalled();
        expect(migrationGuard.canActivate).toHaveBeenCalled();
      });

      it('should redirect for external routes - normal path', async () => {
        service.addMigrationRoutes();
        await zone.run(() => router.navigate(['normal/path']));
        expect(internalRouteGuard.canActivate).not.toHaveBeenCalled();
        expect(migrationGuard.canActivate).toHaveBeenCalled();
      });

      it('should redirect for external routes - path with param', async () => {
        service.addMigrationRoutes();
        await zone.run(() => router.navigate(['path/with/param/1234']));
        expect(internalRouteGuard.canActivate).not.toHaveBeenCalled();
        expect(migrationGuard.canActivate).toHaveBeenCalled();
      });
    });
  });

  describe('when configured explicitly internal paths', () => {
    beforeEach(() => {
      beforeEachWithConfig({
        routing: {
          migration: {
            paths: ['path/with/param/:someParam', 'normal/path', ''],
            type: RoutingMigrationConfigType.INTERNAL,
          },
        },
      });
    });

    it('should prepend the migration route for configured URLs', () => {
      expect(router.config.length).toBe(1);
      service.addMigrationRoutes();
      expect(router.config.length).toBe(2);
      expect(router.config[0].canActivate[0]).toBe(RoutingMigrationGuard);
    });

    it('should redirect for external routes', async () => {
      service.addMigrationRoutes();
      await zone.run(() => router.navigate(['test-route']));
      expect(internalRouteGuard.canActivate).not.toHaveBeenCalled();
      expect(migrationGuard.canActivate).toHaveBeenCalled();
    });

    it('should not redirect for internal routes - root path', async () => {
      service.addMigrationRoutes();
      await zone.run(() => router.navigate(['/']));
      expect(internalRouteGuard.canActivate).toHaveBeenCalled();
      expect(migrationGuard.canActivate).not.toHaveBeenCalled();
    });

    it('should not redirect for internal routes - normal path', async () => {
      service.addMigrationRoutes();
      await zone.run(() => router.navigate(['normal/path']));
      expect(internalRouteGuard.canActivate).toHaveBeenCalled();
      expect(migrationGuard.canActivate).not.toHaveBeenCalled();
    });

    it('should not redirect for external routes - path with param', async () => {
      service.addMigrationRoutes();
      await zone.run(() => router.navigate(['path/with/param/1234']));
      expect(internalRouteGuard.canActivate).toHaveBeenCalled();
      expect(migrationGuard.canActivate).not.toHaveBeenCalled();
    });
  });
});
