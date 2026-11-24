import { TestBed } from '@angular/core/testing';
import { FeatureToggles } from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';
import { SmartEditComponentDecorator } from './smart-edit-component-decorator';

class MockSmartEditService {
  addSmartEditContract() {}
}

describe('SmartEditComponentDecorator', () => {
  let decorator: SmartEditComponentDecorator;
  let smartEditService: SmartEditService;

  describe('with enableSmartEditContractForDirectSlotChildrenOnly disabled (default)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          SmartEditComponentDecorator,
          { provide: SmartEditService, useClass: MockSmartEditService },
          {
            provide: FeatureToggles,
            useValue: {
              enableSmartEditContractForDirectSlotChildrenOnly: false,
            },
          },
        ],
      });
      decorator = TestBed.inject(SmartEditComponentDecorator);
      smartEditService = TestBed.inject(SmartEditService);
    });

    it('should be created', () => {
      expect(decorator).toBeTruthy();
    });

    it('should call addSmartEditContract', () => {
      const component = { properties: { smartedit: { uuid: 'test-id' } } };
      vi.spyOn(smartEditService, 'addSmartEditContract');
      decorator.decorate(null, null, component);
      expect(smartEditService.addSmartEditContract).toHaveBeenCalledWith(
        null,
        null,
        component.properties
      );
    });

    it('should call addSmartEditContract even for nested components when toggle is off', () => {
      const component = {
        nested: true,
        properties: { smartedit: { uuid: 'test-id' } },
      };
      vi.spyOn(smartEditService, 'addSmartEditContract');
      decorator.decorate(null, null, component);
      expect(smartEditService.addSmartEditContract).toHaveBeenCalledWith(
        null,
        null,
        component.properties
      );
    });
  });

  describe('with enableSmartEditContractForDirectSlotChildrenOnly enabled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          SmartEditComponentDecorator,
          { provide: SmartEditService, useClass: MockSmartEditService },
          {
            provide: FeatureToggles,
            useValue: {
              enableSmartEditContractForDirectSlotChildrenOnly: true,
            },
          },
        ],
      });
      decorator = TestBed.inject(SmartEditComponentDecorator);
      smartEditService = TestBed.inject(SmartEditService);
    });

    it('should not call addSmartEditContract for nested components', () => {
      const component = {
        nested: true,
        properties: { smartedit: { uuid: 'test-id' } },
      };
      vi.spyOn(smartEditService, 'addSmartEditContract');
      decorator.decorate(null, null, component);
      expect(smartEditService.addSmartEditContract).not.toHaveBeenCalled();
    });

    it('should call addSmartEditContract for non-nested components', () => {
      const component = { properties: { smartedit: { uuid: 'test-id' } } };
      vi.spyOn(smartEditService, 'addSmartEditContract');
      decorator.decorate(null, null, component);
      expect(smartEditService.addSmartEditContract).toHaveBeenCalledWith(
        null,
        null,
        component.properties
      );
    });
  });
});
