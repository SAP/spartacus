import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { FocusConfig, FormErrorsComponent } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { UserItemService } from '../services/user-item.service';
import { UserChangePasswordFormComponent } from './user-change-password-form.component';
import { UserChangePasswordFormService } from './user-change-password-form.service';
import { MessageService } from '@spartacus/organization/administration/components';
import { Directive, Input } from '@angular/core';

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

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
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
      declarations: [
        UserChangePasswordFormComponent,
        FormErrorsComponent,
        MockKeyboadFocusDirective,
      ],
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
