import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  ICON_TYPE,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { CloseAccountComponent } from './close-account.component';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          CloseAccountComponent,
          MockUrlPipe,
          MockCxIconComponent,
          MockFeatureDirective,
        ],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          { provide: RoutingService, useClass: MockRoutingService },
        ],
      }).compileComponents();
    })
  );

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
