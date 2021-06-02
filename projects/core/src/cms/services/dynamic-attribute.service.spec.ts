import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { DynamicAttributeService } from './dynamic-attribute.service';
import createSpy = jasmine.createSpy;

const mockProperties = {
  smartedit: {
    componentId: 'testId',
    catalogVersionUuid: 'test uuid',
    classes: 'some classes',
  },
  group: { prop1: 'groupProp1', prop2: 'groupProp2' },
};

class MockSmartEditService {
  isLaunchedInSmartEdit(): boolean {
    return true;
  }
}

@Injectable()
class TestComponentDecorator extends ComponentDecorator {
  decorate = createSpy('decorate');
}

@Injectable()
class TestSlotDecorator extends ComponentDecorator {
  decorate = createSpy('decorate');
}

describe('DynamicAttributeService', () => {
  let service: DynamicAttributeService;
  let renderer: Renderer2;
  let testComponentDecorator: TestComponentDecorator;
  let testSlotDecorator: TestSlotDecorator;
  let smartEditService: SmartEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestComponentDecorator,
        TestSlotDecorator,
        { provide: SmartEditService, useClass: MockSmartEditService },
        {
          provide: ComponentDecorator,
          useExisting: TestComponentDecorator,
          multi: true,
        },
        {
          provide: SlotDecorator,
          useExisting: TestSlotDecorator,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(DynamicAttributeService);
    testComponentDecorator = TestBed.inject(TestComponentDecorator);
    testSlotDecorator = TestBed.inject(TestSlotDecorator);
    smartEditService = TestBed.inject(SmartEditService);
  });

  it('should DynamicAttributeService is injected', () => {
    expect(service).toBeTruthy();
  });

  it('should able to add dynamic attributes', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addDynamicAttributes(element, renderer, {
        componentData: { properties: mockProperties },
      });

      expect(element.getAttribute('data-smartedit-component-id')).toEqual(
        'testId'
      );
      expect(
        element.getAttribute('data-smartedit-catalog-version-uuid')
      ).toEqual('test uuid');
      expect(element.classList.contains('some')).toBeTruthy();
      expect(element.classList.contains('classes')).toBeTruthy();

      expect(element.getAttribute('data-group-prop1')).toEqual('groupProp1');
      expect(element.getAttribute('data-group-prop2')).toEqual('groupProp2');
    }
  ));

  it('should able to add dynamic attributes to component when deprecated SmartEditModule is imported', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      spyOn(service, 'addDynamicAttributes').and.callThrough();
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addAttributesToComponent(element, renderer, {
        uid: 'testComponent',
      });

      expect(service.addDynamicAttributes).toHaveBeenCalledWith(
        element,
        renderer,
        { componentData: { uid: 'testComponent' } }
      );
    }
  ));

  it('should able to add dynamic attributes to component', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      // deprecated SmartEditModule is not imported
      spyOn(smartEditService, 'isLaunchedInSmartEdit').and.returnValue(false);
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addAttributesToComponent(element, renderer, {
        uid: 'testComponent',
      });

      expect(testComponentDecorator.decorate).toHaveBeenCalledWith(
        element,
        renderer,
        { uid: 'testComponent' }
      );
    }
  ));

  it('should able to add dynamic attributes to slot when deprecated SmartEditModule is imported', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      spyOn(service, 'addDynamicAttributes').and.callThrough();
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addAttributesToSlot(element, renderer, {});

      expect(service.addDynamicAttributes).toHaveBeenCalledWith(
        element,
        renderer,
        { slotData: {} }
      );
    }
  ));

  it('should able to add dynamic attributes to slot', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      // deprecated SmartEditModule is not imported
      spyOn(smartEditService, 'isLaunchedInSmartEdit').and.returnValue(false);
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addAttributesToSlot(element, renderer, {});

      expect(testSlotDecorator.decorate).toHaveBeenCalledWith(
        element,
        renderer,
        {}
      );
    }
  ));
});
