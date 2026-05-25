import { CommonModule } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  B2BUser,
  B2BUserRight,
  B2BUserRole,
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  B2BUserService,
  Budget,
} from '@spartacus/organization/administration/core';
import { FocusConfig, FocusDirective } from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { EMPTY, of, Subject } from 'rxjs';
import {
  CardComponent,
  DisableInfoModule,
  MessageComponent,
} from '../../shared';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { ItemService } from '../../shared/item.service';
import { MessageTestingModule } from '../../shared/message/message.testing.module';
import { MessageService } from '../../shared/message/services/message.service';
import { UserDetailsComponent } from './user-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'c1';

const mockB2BUser: B2BUser = {
  roles: [B2BUserRole.CUSTOMER, B2BUserRight.UNITORDERVIEWER],
};

const mockB2BUserWithoutRight: B2BUser = {
  roles: [B2BUserRole.CUSTOMER],
};

class MockUserItemService implements Partial<ItemService<Budget>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(EMPTY);
  error$ = of(false);
}

class MockMessageService {
  add() {
    return new Subject();
  }
  clear() {}
  close() {}
}

class MockB2BUserService implements Partial<B2BUserService> {
  getAllRoles() {
    return [
      B2BUserRole.CUSTOMER,
      B2BUserRole.MANAGER,
      B2BUserRole.APPROVER,
      B2BUserRole.ADMIN,
    ];
  }
  getAllRights() {
    return [B2BUserRight.UNITORDERVIEWER];
  }
  isUpdatingUserAllowed() {
    return true;
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let itemService: ItemService<Budget>;
  let b2bUserService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ToggleStatusModule,
        DisableInfoModule,
        UserDetailsComponent,
        ItemExistsDirective,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [{ provide: B2BUserService, useClass: MockB2BUserService }],
    })
      .overrideComponent(UserDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            FocusDirective,
            CardComponent,
            MessageComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockKeyboadFocusDirective,
            CardTestingModule,
            MessageTestingModule,
          ],
          providers: [
            {
              provide: MessageService,
              useClass: MockMessageService,
            },
            { provide: ItemService, useClass: MockUserItemService },
          ],
        },
      })
      .compileComponents();

    b2bUserService = TestBed.inject(B2BUserService);

    spyOn(b2bUserService, 'getAllRights').and.callThrough();
    spyOn(b2bUserService, 'getAllRoles').and.callThrough();
    spyOn(b2bUserService, 'isUpdatingUserAllowed').and.callThrough();

    fixture = TestBed.createComponent(UserDetailsComponent);
    itemService = fixture.componentRef.injector.get(ItemService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if updating user details is allowed', () => {
    expect(b2bUserService.isUpdatingUserAllowed).toHaveBeenCalled();
  });

  it('should load list of rights', () => {
    expect(b2bUserService.getAllRights).toHaveBeenCalled();
  });

  it('should load list of roles', () => {
    expect(b2bUserService.getAllRoles).toHaveBeenCalled();
  });

  it('should find right', () => {
    expect(component.hasRight(mockB2BUser)).toBeTruthy();
  });

  it('should not find right', () => {
    expect(component.hasRight(mockB2BUserWithoutRight)).toBeFalsy();
  });

  it('should trigger reload of model on each code change', () => {
    expect(itemService.load).toHaveBeenCalledWith(mockCode);
  });
});
