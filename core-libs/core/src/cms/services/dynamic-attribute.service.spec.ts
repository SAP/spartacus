import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { ComponentDecorator } from '../decorators/component-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { DynamicAttributeService } from './dynamic-attribute.service';
import createSpy = jasmine.createSpy;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestComponentDecorator,
        TestSlotDecorator,
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
  });

  it('should DynamicAttributeService is injected', () => {
    expect(service).toBeTruthy();
  });

  it('should able to add dynamic attributes to component', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
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

  it('should able to add dynamic attributes to slot', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
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
