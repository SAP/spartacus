import {
  Component,
  DebugElement,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NavigationExtras } from '@angular/router';
import {
  RoutingService,
  Title,
  TranslateUrlOptions,
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
  submited = new EventEmitter<{ uid: string; form: FormGroup }>();
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
    _pathOrTranslateUrlOptions: any[] | TranslateUrlOptions,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

fdescribe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let el: DebugElement;

  let userService: UserService;
  let routingService: RoutingService;

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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    userService = TestBed.get(UserService);
    routingService = TestBed.get(RoutingService);

    // TODO:#1146 - why are changes being detected here? this is a generated file, btw.
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
    expect(routingService.go).toHaveBeenCalledWith({ route: ['/home'] });
  });

  it('should call updatePersonalDetails on submit', () => {
    spyOn(userService, 'updatePersonalDetails').and.stub();

    const uid = 'xxx@xxx.xxx';
    const form = new FormGroup({
      firstName: new FormControl('X'),
    });

    component.onSubmit({ uid, form });
    expect(userService.updatePersonalDetails).toHaveBeenCalledWith(
      uid,
      form.value
    );
  });

  it('should go to a url if update was successful', () => {
    spyOn(userService, 'getUpdatePersonalDetailsResultSuccess').and.returnValue(
      of(true)
    );
    spyOn(routingService, 'go').and.stub();

    component.ngOnInit();
    fixture.detectChanges();

    expect(routingService.go).toHaveBeenCalledWith({ route: ['/home'] });
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    component.ngOnInit();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
