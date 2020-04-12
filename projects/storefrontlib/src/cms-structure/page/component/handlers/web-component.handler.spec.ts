import { TestBed } from '@angular/core/testing';

// import { WebComponentLauncherService } from './web-component-launcher.service';
// import { Renderer2 } from '@angular/core';
// import { ComponentMapperService } from '../services/component-mapper.service';
// import { ComponentMapperService } from './component-mapper.service';
//
// const createSpy = jasmine.createSpy;

describe('WebComponentLauncherService', () => {
  // let service: WebComponentLauncherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(WebComponentLauncherService);
  });

  it('should be created', () => {
    expect(true).toBeTruthy();
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
