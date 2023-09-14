import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { MessageService } from '@spartacus/organization/administration/components';
import { FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { UserItemService } from '../services/user-item.service';
import { UserChangePasswordFormComponent } from './user-change-password-form.component';
import { UserChangePasswordFormService } from './user-change-password-form.service';

const mockForm = new UntypedFormGroup({
  password: new UntypedFormControl(),
  confirmPassword: new UntypedFormControl(),
});

class MockUserItemService {
  current$ = of('mock');
}
class MockUserChangePasswordFormService {
  getForm() {}
}

describe('UserChangePasswordFormComponent', () => {
  let component: UserChangePasswordFormComponent;
  let fixture: ComponentFixture<UserChangePasswordFormComponent>;
  let formService: UserChangePasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        CardTestingModule,
      ],
      declarations: [UserChangePasswordFormComponent, FormErrorsComponent],
      providers: [
        {
          provide: UserItemService,
          useClass: MockUserItemService,
        },
        {
          provide: UserChangePasswordFormService,
          useClass: MockUserChangePasswordFormService,
        },
        MessageService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    formService = TestBed.inject(UserChangePasswordFormService);

    fixture = TestBed.createComponent(UserChangePasswordFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form', () => {
    spyOn(formService, 'getForm').and.returnValue(mockForm);
    fixture.detectChanges();
    const form = fixture.debugElement.queryAll(By.css('form input'));
    expect(form.length).toEqual(2);
  });

  it('should not render any form groups if the form is falsy', () => {
    spyOn(formService, 'getForm').and.returnValue(undefined);
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeNull();
  });
});
