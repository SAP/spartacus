import { CommonModule } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  CardComponent,
  DeleteItemModule,
} from '@spartacus/organization/administration/components';
import { Budget } from '@spartacus/organization/administration/core';
import { FocusConfig, FocusDirective } from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { EMPTY, of, Subject } from 'rxjs';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { ItemService } from '../../shared/item.service';
import { MessageService } from '../../shared/message/services/message.service';
import { UserGroupDetailsComponent } from './user-group-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'u1';

class MockUserGroupItemService implements Partial<ItemService<Budget>> {
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

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('UserGroupDetailsComponent', () => {
  let component: UserGroupDetailsComponent;
  let fixture: ComponentFixture<UserGroupDetailsComponent>;
  let itemService: ItemService<Budget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DeleteItemModule,
        UserGroupDetailsComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [],
    })
      .overrideComponent(UserGroupDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            FocusDirective,
            CardComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockKeyboadFocusDirective,
            CardTestingModule,
          ],
          providers: [
            {
              provide: MessageService,
              useClass: MockMessageService,
            },
            {
              provide: ItemService,
              useClass: MockUserGroupItemService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserGroupDetailsComponent);
    itemService = fixture.componentRef.injector.get(ItemService);
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
