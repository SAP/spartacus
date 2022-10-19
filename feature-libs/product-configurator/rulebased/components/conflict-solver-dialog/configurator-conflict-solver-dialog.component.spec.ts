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
import { ConfiguratorCommonsService } from '@spartacus/product-configurator/rulebased';
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
    spyOn(launchDialogService, 'closeDialog').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
