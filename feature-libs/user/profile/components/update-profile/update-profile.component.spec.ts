import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Title,
  User,
} from '@spartacus/core';
import { of, Subject, throwError } from 'rxjs';
import { UpdateProfileComponent } from './update-profile.component';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

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

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = createSpy('UserProfileFacade.get').and.returnValue(of());
  getTitles = createSpy('UserProfileFacade.getTitles').and.returnValue(of());
  update = createSpy('UserProfileFacade.update').and.returnValue(of(null));
  close = createSpy('UserProfileFacade.close').and.returnValue(of());
}
class RoutingServiceMock {
  go = createSpy();
}

class GlobalMessageServiceMock {
  add = createSpy();
}

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let el: DebugElement;

  let userProfileFacade: UserProfileFacade;
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
            provide: UserProfileFacade,
            useClass: MockUserProfileFacade,
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

    userProfileFacade = TestBed.inject(UserProfileFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show spinner when loading = true', () => {
    const updating = new Subject();
    (userProfileFacade.update as Spy).and.returnValue(updating);
    component.onSubmit({ userUpdates: { uid: 'what' } });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeTruthy();
    updating.complete();
  });

  it('should not show spinner when loading = false', () => {
    component.onSubmit({ userUpdates: { uid: 'what' } });
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner'))).toBeFalsy();
  });

  it('should navigate to home when cancelled', () => {
    component.onCancel();
    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it('should call updatePersonalDetails on submit', () => {
    const userUpdates: User = {
      firstName: 'X',
    };
    component.onSubmit({ userUpdates });
    expect(userProfileFacade.update).toHaveBeenCalledWith(userUpdates);
  });

  describe('onSuccess', () => {
    describe('when the user was successfully updated', () => {
      it('should add a global message and navigate to a url ', () => {
        component.onSubmit({ userUpdates: {} });
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'updateProfileForm.profileUpdateSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
      });
    });

    describe('when the user was NOT successfully updated', () => {
      it('should NOT add a global message and NOT navigate to a url ', () => {
        (userProfileFacade.update as Spy).and.returnValue(
          throwError(undefined)
        );
        component.onSubmit({ userUpdates: {} });
        expect(routingService.go).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
      });
    });
  });
});
