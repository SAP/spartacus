import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of, Subject } from 'rxjs';
import { DisableInfoModule } from '../../shared';
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

describe('CostCenterDetailsComponent', () => {
  let component: CostCenterDetailsComponent;
  let fixture: ComponentFixture<CostCenterDetailsComponent>;
  let itemService: ItemService<CostCenter>;

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
        DisableInfoModule,
      ],
      declarations: [CostCenterDetailsComponent],
      providers: [{ provide: ItemService, useClass: MockItemService }],
    })
      .overrideComponent(CostCenterDetailsComponent, {
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

    fixture = TestBed.createComponent(CostCenterDetailsComponent);
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
