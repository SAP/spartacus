import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CloseAccountComponent } from './close-account.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog() {
    return of({});
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('CloseAccountComponent', () => {
  let component: CloseAccountComponent;
  let fixture: ComponentFixture<CloseAccountComponent>;
  let launchDialogService: LaunchDialogService;
  let routingService: RoutingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CloseAccountComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    })
      .overrideComponent(CloseAccountComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAccountComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    spyOn(launchDialogService, 'openDialog');

    component.openModal();

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CLOSE_ACCOUNT,
      component['element'],
      component['vcr']
    );
  });

  it('should navigate to home on cancel', () => {
    spyOn(routingService, 'go');
    fixture.detectChanges();
    const cancelBtn = fixture.debugElement.query(
      By.css('button.btn-secondary')
    );
    cancelBtn.triggerEventHandler('click');
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });
});
