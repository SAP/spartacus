import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
  UrlCommands,
  User,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UpdateProfileComponent } from './update-profile.component';

@Component({
  selector: 'cx-update-profile-form',
  template: `
    <div>update form</div>
  `,
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
  template: `
    <div>spinner</div>
  `,
})
class MockCxSpinnerComponent {}

class UserServiceMock {
  get(): Observable<User> {
    return of();
  }

  getTitles(): Observable<Title[]> {
    return of();
  }

  loadTitles(): void {}

  updatePersonalDetails(): void {}

  resetUpdatePersonalDetailsProcessingState(): void {}

  getUpdatePersonalDetailsResultLoading(): Observable<boolean> {
    return of(true);
  }

  getUpdatePersonalDetailsResultSuccess(): Observable<boolean> {
    return of();
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

  let userService: UserService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpdateProfileComponent,
        MockUpdateProfileFormComponent,
        MockCxSpinnerComponent,
      ],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.inject(UserService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the loading state when the component is initialized', () => {
    spyOn(userService, 'resetUpdatePersonalDetailsProcessingState').and.stub();

    component.ngOnInit();
    expect(
      userService.resetUpdatePersonalDetailsProcessingState
    ).toHaveBeenCalled();
  });

  it('should show the spinner when updating', () => {
    spyOn(userService, 'getUpdatePersonalDetailsResultLoading').and.returnValue(
      of(true)
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
  });

  it('should navigate to home when cancelled', () => {
    spyOn(routingService, 'go').and.stub();

    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePersonalDetails on submit', () => {
    spyOn(userService, 'updatePersonalDetails').and.stub();

    const userUpdates: User = {
      firstName: 'X',
    };

    component.onSubmit({ userUpdates });
    expect(userService.updatePersonalDetails).toHaveBeenCalledWith(userUpdates);
  });

  it('should call the internal onSuccess() method when the user was successfully updated', () => {
    spyOn(component, 'onSuccess').and.stub();
    spyOn(userService, 'getUpdatePersonalDetailsResultSuccess').and.returnValue(
      of(true)
    );

    component.ngOnInit();

    expect(component.onSuccess).toHaveBeenCalled();
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
