import { CommonModule } from '@angular/common';
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
import { Permission } from '@spartacus/organization/administration/core';
import { FocusDirective } from '@spartacus/storefront';
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
import { PermissionDetailsComponent } from './permission-details.component';

import createSpy = jasmine.createSpy;

const mockCode = 'p1';

class MockPermissionItemService implements Partial<ItemService<Permission>> {
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

describe('PermissionDetailsComponent', () => {
  let component: PermissionDetailsComponent;
  let fixture: ComponentFixture<PermissionDetailsComponent>;
  let itemService: ItemService<Permission>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ToggleStatusModule,
        DisableInfoModule,
        PermissionDetailsComponent,
        ItemExistsDirective,
        FocusDirective,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
      providers: [],
    })
      .overrideComponent(PermissionDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            MessageComponent,
            CardComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            CardTestingModule,
            MessageTestingModule,
          ],
          providers: [
            {
              provide: MessageService,
              useClass: MockMessageService,
            },
            {
              provide: ItemService,
              useClass: MockPermissionItemService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PermissionDetailsComponent);
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
