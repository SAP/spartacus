import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CostCenter,
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
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
import { ItemService } from '../../shared/item.service';
import { MessageTestingModule } from '../../shared/message/message.testing.module';
import { MessageService } from '../../shared/message/services/message.service';
import { CostCenterDetailsComponent } from './cost-center-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'c1';

class MockItemService implements Partial<ItemService<CostCenter>> {
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

describe('CostCenterDetailsComponent', () => {
  let component: CostCenterDetailsComponent;
  let fixture: ComponentFixture<CostCenterDetailsComponent>;
  let itemService: ItemService<CostCenter>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ToggleStatusModule,
        DisableInfoModule,
        CostCenterDetailsComponent,
        FocusDirective,
        I18nTestingModule,
        RouterModule.forRoot([]),
      ],
    })
      .overrideComponent(CostCenterDetailsComponent, {
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
            { provide: ItemService, useClass: MockItemService },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CostCenterDetailsComponent);
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
