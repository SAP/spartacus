import { TestBed } from '@angular/core/testing';
import { WebComponentHandler } from './web-component.handler';
import { CmsMappingService } from '../../../services/cms-mapping.service';

const mockCmsMappingService = jasmine.createSpyObj('CmsMappingService', [
  'getComponentMapping',
]);

fdescribe('WebComponentHandler', () => {
  let handler: WebComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsMappingService,
          useValue: mockCmsMappingService,
        },
      ],
    });
    handler = TestBed.inject(WebComponentHandler);
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  // describe('initWebComponent', () => {
  //   let mockRenderer: Renderer2;
  //   let mockScriptElement;
  //
  //   beforeEach(() => {
  //     mockScriptElement = { setAttribute: createSpy(), onload: undefined };
  //
  //     mockRenderer = {
  //       createElement: createSpy().and.returnValue(mockScriptElement),
  //       appendChild: createSpy(),
  //     } as any;
  //   });
  //
  //   it('should return selector and initialize scripts', async () => {
  //     const selector = await mapperService.initWebComponent(
  //       'CMSWebComponent',
  //       mockRenderer
  //     );
  //     expect(selector).toEqual('cms-component');
  //     expect(mockRenderer.createElement).toHaveBeenCalledWith('script');
  //     expect(mockRenderer.appendChild).toHaveBeenCalled();
  //     expect(mockScriptElement.setAttribute).toHaveBeenCalledWith(
  //       'src',
  //       'path/to/file.js'
  //     );
  //   });
  //
  //   it('should return selector for eagerly loaded web components', async () => {
  //     const selector = await mapperService.initWebComponent(
  //       'CMSEagerWebComponent',
  //       mockRenderer
  //     );
  //     expect(selector).toEqual('cms-eager-component');
  //     expect(mockRenderer.createElement).not.toHaveBeenCalled();
  //     expect(mockRenderer.appendChild).not.toHaveBeenCalled();
  //     expect(mockScriptElement.setAttribute).not.toHaveBeenCalled();
  //   });
  //
  //   it('should return true to web component', inject(
  //     [ComponentMapperService],
  //     (service: ComponentMapperService) => {
  //       expect(service.isWebComponent('CMSWebComponent')).toBeTruthy();
  //     }
  //   ));
  // });
});
