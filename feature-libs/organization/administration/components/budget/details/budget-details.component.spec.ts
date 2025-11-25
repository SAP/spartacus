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
import { Budget } from '@spartacus/organization/administration/core';
import { MockUrlPipe } from 'projects/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { EMPTY, of, Subject } from 'rxjs';
import { CardComponent, MessageComponent, MessageService } from '../../shared';
import { CardTestingModule } from '../../shared/card/card.testing.module';
import { ItemService } from '../../shared/item.service';
import { MessageTestingModule } from '../../shared/message/message.testing.module';
import { BudgetDetailsComponent } from './budget-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'b1';

class MockBudgetItemService implements Partial<ItemService<Budget>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(EMPTY);
  error$ = of(false);
  current$ = of({});
}

class MockMessageService {
  add() {
    return new Subject();
  }
  clear() {}
  close() {}
}

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;
  let itemService: ItemService<Budget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterModule.forRoot([])],
    })
      .overrideComponent(BudgetDetailsComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            CardComponent,
            MessageComponent,
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
            { provide: ItemService, useClass: MockBudgetItemService },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BudgetDetailsComponent);
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
