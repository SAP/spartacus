import { Renderer2, RendererFactory2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { DynamicAttributeService } from './dynamic-attribute.service';

const mockProperties = {
  smartedit: {
    componentId: 'testId',
    catalogVersionUuid: 'test uuid',
    classes: 'some classes',
  },
  group: { prop1: 'groupProp1', prop2: 'groupProp2' },
};

describe('DynamicAttributeService', () => {
  let service: DynamicAttributeService;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicAttributeService],
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
      service.addDynamicAttributes(mockProperties, element, renderer);

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
});
