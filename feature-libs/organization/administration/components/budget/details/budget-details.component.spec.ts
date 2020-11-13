import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import {
  ItemExistsDirective,
  MessageService,
  ToggleStatusModule,
} from '../../shared';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { MessageTestingModule } from '../../shared/organization-message/message.testing.module';
import { BudgetDetailsComponent } from './budget-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'b1';

class MockBudgetItemService
  implements Partial<OrganizationItemService<Budget>> {
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

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;
  let itemService: OrganizationItemService<Budget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        OrganizationCardTestingModule,
        MessageTestingModule,
        ToggleStatusModule,
      ],
      declarations: [BudgetDetailsComponent, ItemExistsDirective],
      providers: [
        { provide: OrganizationItemService, useClass: MockBudgetItemService },
      ],
    })
      .overrideComponent(BudgetDetailsComponent, {
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
    fixture = TestBed.createComponent(BudgetDetailsComponent);
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
