import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { SmartEditService } from '../../smart-edit/services/smart-edit.service';
import { Priority } from '../../util/applicable';
import { ComponentDecorator } from '../decorators/component-decorator';
import { HtmlBodyDecorator } from '../decorators/html-body-decorator';
import { SlotDecorator } from '../decorators/slot-decorator';
import { DynamicAttributeService } from './dynamic-attribute.service';
import createSpy = jasmine.createSpy;

class MockSmartEditService {}

@Injectable()
class TestComponentDecorator extends ComponentDecorator {
  decorate = createSpy('decorate');
  hasMatch(): boolean {
    return true;
  }
  getPriority() {
    return Priority.HIGH;
  }
}

@Injectable()
class TestSlotDecorator extends ComponentDecorator {
  decorate = createSpy('decorate');
  hasMatch(): boolean {
    return true;
  }
  getPriority() {
    return Priority.HIGH;
  }
}

@Injectable()
class TestHtmlBodyDecorator extends HtmlBodyDecorator {
  decorate = createSpy('decorate');
  hasMatch(): boolean {
    return true;
  }
  getPriority() {
    return Priority.HIGH;
  }
}

describe('DynamicAttributeService', () => {
  let service: DynamicAttributeService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestComponentDecorator,
        TestSlotDecorator,
        TestHtmlBodyDecorator,
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
        {
          provide: HtmlBodyDecorator,
          useExisting: TestHtmlBodyDecorator,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(DynamicAttributeService);
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
        componentData: { uid: 'testComponent' },
        slotData: {},
      });

      expect(
        service['componentDecorators'][0].decorate
      ).toHaveBeenCalledWith(element, renderer, { uid: 'testComponent' });
      expect(service['slotDecorators'][0].decorate).toHaveBeenCalledWith(
        element,
        renderer,
        {}
      );
    }
  ));

  it('should able to add dynamic attributes to component', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addAttributesToComponent(element, renderer, {
        uid: 'testComponent',
      });

      expect(
        service['componentDecorators'][0].decorate
      ).toHaveBeenCalledWith(element, renderer, { uid: 'testComponent' });
    }
  ));

  it('should able to add dynamic attributes to slot', inject(
    [RendererFactory2],
    (factory: RendererFactory2) => {
      renderer = factory.createRenderer(null, null);
      const element = renderer.createElement('div');
      service.addAttributesToSlot(element, renderer, {});

      expect(service['slotDecorators'][0].decorate).toHaveBeenCalledWith(
        element,
        renderer,
        {}
      );
    }
  ));

  it('should able to add dynamic attributes to Html body', () => {
    service.addAttributesToHtmlBody({ pageId: 'testPage' });

    expect(service['htmlBodyDecorators'][0].decorate).toHaveBeenCalledWith({
      pageId: 'testPage',
    });
  });
});
