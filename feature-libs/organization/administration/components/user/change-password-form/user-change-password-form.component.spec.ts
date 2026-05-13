import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  CardComponent,
  MessageService,
} from '@spartacus/organization/administration/components';
import {
  FocusConfig,
  FocusDirective,
  FormErrorsComponent,
} from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { MockFeatureDirective } from 'core-libs/storefrontlib/shared/test/mock-feature-directive';
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
        ReactiveFormsModule,
        NgSelectModule,
        UserChangePasswordFormComponent,
        FormErrorsComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: UserChangePasswordFormService,
          useClass: MockUserChangePasswordFormService,
        },
        MessageService,
      ],
    })
      .overrideComponent(UserChangePasswordFormComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            FocusDirective,
            FeatureDirective,
            CardComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockKeyboadFocusDirective,
            MockFeatureDirective,
            CardTestingModule,
          ],
          providers: [
            {
              provide: UserItemService,
              useClass: MockUserItemService,
            },
          ],
        },
      })
      .compileComponents();
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
