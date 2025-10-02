import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { of } from 'rxjs';
import { DpConfirmationDialogComponent } from './dp-confirmation-dialog.component';

class MockLaunchDialogService {
  closeDialog(_x: any) {}
}

const mockActivatedRoute: ActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    }),
    url: [],
    params: {},
    queryParams: {},
    fragment: null,
    data: {},
    outlet: '',
    component: null,
    routeConfig: null,
    title: undefined,
    root: null as any,
    parent: null,
    firstChild: null,
    children: [],
    pathFromRoot: [],
    paramMap: {} as any,
  },
  outlet: '',
  component: null,
  title: of(undefined),
  url: of([]),
  params: of({}),
  queryParams: of({}),
  fragment: of(null),
  data: of({}),
  routeConfig: null,
  root: null as any,
  parent: null,
  firstChild: null,
  children: [],
  paramMap: of({} as any),
  queryParamMap: of({} as any),
  pathFromRoot: [],
};
class MockRouter {
  navigate(_x: any, _y: any) {}
}
describe('DpConfirmationDialogComponent', () => {
  let component: DpConfirmationDialogComponent;
  let fixture: ComponentFixture<DpConfirmationDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [I18nTestingModule, DpConfirmationDialogComponent, MockFeatureDirective],
    providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
        },
        {
            provide: Router,
            useClass: MockRouter,
        },
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpConfirmationDialogComponent);
    launchDialogService = TestBed.inject(LaunchDialogService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the dialog', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    component.dismissDialog();
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
    expect(component.cardSaveCancelled).toEqual(false);
    component.dismissDialog('unexpectedly closed');
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'unexpectedly closed'
    );
    expect(component.cardSaveCancelled).toEqual(false);
  });

  it('should close the dialog and continue with discarding the new card', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    const x = {};
    component.continue();
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: x,
      relativeTo: mockActivatedRoute,
    });
    expect(component.cardSaveCancelled).toEqual(true);
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'continue clicked'
    );
  });
});
