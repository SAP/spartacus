import {
  ComponentFactory,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { OutletService } from '../../../../../cms-structure/outlet/outlet.service';
import { ConfigRouterExtractorService } from '../../../generic/service/config-router-extractor.service';
import { ConfigMessageEnablerService } from './config-message-enabler.service';

let isOverview = false;
let isConfigurator = false;

class MockRouterExtractor {
  isOverview() {
    return of({ isOverview });
  }

  isConfigurator() {
    return of({ isConfigurator });
  }
}

class MockRoutingService {}
class MockComponentFactoryResolver {
  resolveComponentFactory() {}
}

describe('ConfigMessageEnablerService', () => {
  let serviceUnderTest: ConfigMessageEnablerService;
  let outletService: OutletService<ComponentFactory<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        OutletService,

        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
        {
          provide: ConfigRouterExtractorService,
          useClass: MockRouterExtractor,
        },
      ],
    });
  }));

  beforeEach(() => {
    serviceUnderTest = TestBed.inject(
      ConfigMessageEnablerService as Type<ConfigMessageEnablerService>
    );
    outletService = TestBed.inject(
      OutletService as Type<OutletService<ComponentFactory<any>>>
    );

    spyOn(outletService, 'add').and.stub();
  });

  it('On a non configurator Page', () => {
    serviceUnderTest.load();
    expect(outletService.add).toHaveBeenCalledTimes(0);
  });

  it('On configurator Page', () => {
    isConfigurator = true;
    isOverview = false;
    serviceUnderTest.load();
    expect(outletService.add).toHaveBeenCalled();
  });

  it('On overview Page', () => {
    isConfigurator = false;
    isOverview = true;
    serviceUnderTest.load();
    expect(outletService.add).toHaveBeenCalled();
  });
});
