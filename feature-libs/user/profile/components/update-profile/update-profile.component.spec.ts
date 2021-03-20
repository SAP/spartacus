import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  StateUtils,
  Title,
  UrlCommands,
  User,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UserProfileService } from '../../core/facade/user-profile.service';
import { UpdateProfileComponent } from './update-profile.component';

@Component({
  selector: 'cx-update-profile-form',
  template: ` <div>update form</div> `,
})
class MockUpdateProfileFormComponent {
  @Input()
  user: User;

  @Input()
  titles: Title[];

  @Output()
  submited = new EventEmitter<{ uid: string; userUpdates: User }>();
}
@Component({
  selector: 'cx-spinner',
  template: ` <div>spinner</div> `,
})
class MockCxSpinnerComponent {}

class MockUserProfileService implements Partial<UserProfileService> {
  get(): Observable<User> {
    return of();
  }

  getTitles(): Observable<Title[]> {
    return of();
  }

  update(): Observable<StateUtils.LoaderState<User>> {
    return of();
  }

  close(): Observable<StateUtils.LoaderState<User>> {
    return;
  }
}
class RoutingServiceMock {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let el: DebugElement;

  let userProfileService: UserProfileService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          UpdateProfileComponent,
          MockUpdateProfileFormComponent,
          MockCxSpinnerComponent,
        ],
        providers: [
          {
            provide: UserProfileService,
            useClass: MockUserProfileService,
          },
          {
            provide: RoutingService,
            useClass: RoutingServiceMock,
          },
          {
            provide: GlobalMessageService,
            useClass: GlobalMessageServiceMock,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userProfileService = TestBed.inject(UserProfileService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show the spinner when updating', () => {
  //   spyOn(userService, 'getUpdatePersonalDetailsResultLoading').and.returnValue(
  //     of(true)
  //   );
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  // });

  it('should show spinner when loading = true', () => {
    spyOn(userProfileService, 'update').and.returnValue(of({ loading: true }));
    component.onSubmit({ userUpdates: { uid: 'what' } });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should not show spinner when loading = false', () => {
    spyOn(userProfileService, 'update').and.returnValue(of({ loading: false }));
    component.onSubmit({ userUpdates: { uid: 'what' } });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();

    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePersonalDetails on submit', () => {
    spyOn(userProfileService, 'update').and.callThrough();
    const userUpdates: User = {
      firstName: 'X',
    };
    component.onSubmit({ userUpdates });
    expect(userProfileService.update).toHaveBeenCalledWith(userUpdates);
  });

  describe('onSuccess', () => {
    describe('when the user was successfully updated', () => {
      it('should add a global message and navigate to a url ', () => {
        spyOn(globalMessageService, 'add').and.stub();
        spyOn(routingService, 'go').and.stub();

        component.onSuccess(true);
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'updateProfileForm.profileUpdateSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
      });
    });

    describe('when the user was NOT successfully updated', () => {
      it('should NOT add a global message and NOT navigate to a url ', () => {
        spyOn(globalMessageService, 'add').and.stub();
        spyOn(routingService, 'go').and.stub();

        component.onSuccess(false);
        expect(routingService.go).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
      });
    });
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
