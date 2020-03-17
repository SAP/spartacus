import {
  Component,
  ComponentFactoryResolver,
  TemplateRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  OutletPosition,
  OutletService,
} from '../../../../cms-structure/outlet/index';
import { TriggerConfig, TRIGGER_CALLER } from '../config/trigger-config';
import { TriggerService } from './trigger.service';

const mockTriggerConfig: TriggerConfig = {
  trigger: {
    TEST_INLINE: {
      inline: true,
      position: OutletPosition.BEFORE,
    },
    TEST_OUTLET: {
      outlet: 'cx-outlet-test',
      position: OutletPosition.AFTER,
    },
    TEST_MULTI: {
      outlet: 'cx-outlet1',
      multi: true,
    },
    TEST_URL: {
      url: 'my-url',
    },
  },
};

const testTemplate = {} as TemplateRef<any>;

class MockOutletService {
  add() {}
}

class MockComponentFactoryResolver {
  resolveComponentFactory() {
    return testTemplate;
  }
}

@Component({
  template: '',
})
class TestContainerComponent {}

fdescribe('TriggerService', () => {
  let service: TriggerService;
  let outletService: OutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TriggerService,
        { provide: OutletService, useClass: MockOutletService },
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
        { provide: TriggerConfig, useValue: mockTriggerConfig },
      ],
    });

    service = TestBed.inject(TriggerService);
    outletService = TestBed.inject(OutletService);

    spyOn(outletService, 'add');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('render outlet', () => {
    it('should render in specified outlet and position', () => {
      service.render('TEST_OUTLET' as TRIGGER_CALLER, TestContainerComponent);

      expect(outletService.add).toHaveBeenCalledWith(
        'cx-outlet-test',
        testTemplate,
        OutletPosition.AFTER
      );
    });

    it('should render only once by default', () => {
      service.render('TEST_OUTLET' as TRIGGER_CALLER, TestContainerComponent);

      service.render('TEST_OUTLET' as TRIGGER_CALLER, TestContainerComponent);

      expect(outletService.add).toHaveBeenCalledTimes(1);
    });

    it('should render multiple times if multi=true', () => {
      service.render('TEST_MULTI' as TRIGGER_CALLER, TestContainerComponent);

      service.render('TEST_MULTI' as TRIGGER_CALLER, TestContainerComponent);

      service.render('TEST_MULTI' as TRIGGER_CALLER, TestContainerComponent);

      expect(outletService.add).toHaveBeenCalledTimes(3);
    });
  });

  describe('render inline', () => {});

  describe('render url', () => {
    it('should return url', () => {
      const result = service.render('TEST_URL' as TRIGGER_CALLER);
      expect(result).toEqual('my-url');
    });
  });
  describe('removeElement', () => {});
});
