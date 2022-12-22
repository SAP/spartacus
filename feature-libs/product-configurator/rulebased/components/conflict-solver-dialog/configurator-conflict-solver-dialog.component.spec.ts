import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorConflictSolverDialogComponent } from './configurator-conflict-solver-dialog.component';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import {
  ICON_TYPE,
  IconLoaderService,
  IconModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  ConfigFormUpdateEvent,
  Configurator,
  ConfiguratorCommonsService,
} from '@spartacus/product-configurator/rulebased';
import { Type } from '@angular/core';

export class MockIconFontLoaderService {
  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-exclamation-circle';
  }
  addLinkResource() {}
  getHtml(_iconType: ICON_TYPE) {}
  getFlipDirection(): void {}
}

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({
      conflictGroup: of([]),
      routerData: of(undefined),
    });
  }

  closeDialog(_reason: string): void {}
}

describe('ConfiguratorConflictSolverDialogComponent', () => {
  let component: ConfiguratorConflictSolverDialogComponent;
  let fixture: ComponentFixture<ConfiguratorConflictSolverDialogComponent>;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let launchDialogService: LaunchDialogService;
  let mockLanguageService;

  beforeEach(
    waitForAsync(() => {
      mockLanguageService = {
        getAll: () => of([]),
        getActive: jasmine.createSpy().and.returnValue(of('en')),
      };

      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconModule],
        declarations: [ConfiguratorConflictSolverDialogComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
          { provide: LanguageService, useValue: mockLanguageService },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorConflictSolverDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();

    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );

    spyOn(configuratorCommonsService, 'updateConfiguration').and.callThrough();

    launchDialogService = TestBed.inject(LaunchDialogService);
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateConfiguration', () => {
    it('should update a configuration through the facade layer ', () => {
      const event: ConfigFormUpdateEvent = {
        changedAttribute: undefined,
        ownerKey: 'product/TEST_PRODUCT',
        updateType: Configurator.UpdateType.ATTRIBUTE,
      };

      component.updateConfiguration(event);

      expect(configuratorCommonsService.updateConfiguration).toHaveBeenCalled();
      expect(
        configuratorCommonsService.updateConfiguration
      ).toHaveBeenCalledWith(
        event.ownerKey,
        event.changedAttribute,
        event.updateType
      );
    });
  });

  describe('dismissModal', () => {
    it('should close dialog when dismissModal is called', () => {
      const reason = 'Close conflict solver dialog';
      component.ngOnInit();
      component.dismissModal(reason);
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(reason);
    });
  });
});
