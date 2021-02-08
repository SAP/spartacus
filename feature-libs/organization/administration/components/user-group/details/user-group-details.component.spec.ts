import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of, Subject } from 'rxjs';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { ItemService } from '../../shared/item.service';
import { MessageService } from '../../shared/message/services/message.service';
import { UserGroupDetailsComponent } from './user-group-details.component';
import createSpy = jasmine.createSpy;
import { DeleteItemModule } from '@spartacus/organization/administration/components';

const mockCode = 'u1';

class MockUserGroupItemService implements Partial<ItemService<Budget>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
}

class MockMessageService {
  add() {
    return new Subject();
  }
  clear() {}
  close() {}
}

describe('UserGroupDetailsComponent', () => {
  let component: UserGroupDetailsComponent;
  let fixture: ComponentFixture<UserGroupDetailsComponent>;
  let itemService: ItemService<Budget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        CardTestingModule,
        DeleteItemModule,
      ],
      declarations: [UserGroupDetailsComponent],
      providers: [
        {
          provide: ItemService,
          useClass: MockUserGroupItemService,
        },
      ],
    })
      .overrideComponent(UserGroupDetailsComponent, {
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

    itemService = TestBed.inject(ItemService);

    fixture = TestBed.createComponent(UserGroupDetailsComponent);
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
