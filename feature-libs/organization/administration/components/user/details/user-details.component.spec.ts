import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of, Subject } from 'rxjs';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { ToggleStatusModule } from '../../shared/organization-detail/toggle-status-action/toggle-status.module';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { MessageTestingModule } from '../../shared/organization-message/message.testing.module';
import { MessageService } from '../../shared/organization-message/services/message.service';
import { ItemExistsDirective } from '../../shared/item-exists.directive';
import { UserDetailsComponent } from './user-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'c1';

class MockUserItemService implements Partial<OrganizationItemService<Budget>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
}

class MockMessageService {
  add() {
    return new Subject();
  }
  clear() {}
  close() {}
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let itemService: OrganizationItemService<Budget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        CardTestingModule,
        MessageTestingModule,
        ToggleStatusModule,
      ],
      declarations: [UserDetailsComponent, ItemExistsDirective],
      providers: [
        { provide: OrganizationItemService, useClass: MockUserItemService },
      ],
    })
      .overrideComponent(UserDetailsComponent, {
        set: {
          providers: [
            {
              provide: MessageService,
              useClass: MockMessageService,
            },
          ],
        },
      })
      .compileComponents();

    itemService = TestBed.inject(OrganizationItemService);

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger reload of model on each code change', () => {
    expect(itemService.load).toHaveBeenCalledWith(mockCode);
  });
});
