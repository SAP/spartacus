import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';
import { ConfiguratorPlaceOrderService } from './configurator-place-order.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

describe('ConfiguratorPlaceOrderService', () => {
  let classUnderTest: ConfiguratorPlaceOrderService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          ConfiguratorGroupsService,
          ConfiguratorCommonsService,
          ConfiguratorGroupStatusService,
          ConfiguratorUtilsService,
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorPlaceOrderService as Type<ConfiguratorPlaceOrderService>
    );
  });

  describe('init', () => {
    it('should do something', () => {
      classUnderTest.init();
    });
  });
});
