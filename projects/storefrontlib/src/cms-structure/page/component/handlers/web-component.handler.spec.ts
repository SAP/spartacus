import { TestBed } from '@angular/core/testing';
import { WebComponentHandler } from './web-component.handler';
import { CmsMappingService } from '../../../services/cms-mapping.service';
import { Component, ViewContainerRef } from '@angular/core';
import { Priority } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { CxApiService } from '../services/cx-api.service';

const mockCmsMappingService = jasmine.createSpyObj('CmsMappingService', [
  'getComponentMapping',
]);

@Component({
  template: '',
})
class WrapperComponent {
  constructor(public vcr: ViewContainerRef) {}
}

describe('WebComponentHandler', () => {
  let handler: WebComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsMappingService,
          useValue: mockCmsMappingService,
        },
        {
          provide: CxApiService,
          useValue: {},
        },
      ],
    });
    handler = TestBed.inject(WebComponentHandler);
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  describe('hasMatch', () => {
    it('should match component class', () => {
      expect(handler.hasMatch({ component: '#my-webcomponent' })).toBeTruthy();
    });
  });

  it('getPriority should return low', () => {
    expect(handler.getPriority()).toEqual(Priority.LOW);
  });

  it('should launch component', (done) => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    handler
      .launcher(
        { component: '#my-webcomponent' },
        fixture.componentInstance.vcr
      )
      .pipe(take(1))
      .subscribe(([elRef]) => {
        expect(elRef.nativeElement.tagName).toBe('MY-WEBCOMPONENT');
        done();
      });
  });

  it('should load script for component', () => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    handler
      .launcher(
        { component: 'test.js#my-webcomponent' },
        fixture.componentInstance.vcr
      )
      .pipe(take(1))
      .subscribe()
      .unsubscribe();

    // get last added script
    const scripts = fixture.debugElement.nativeElement.parentElement.querySelectorAll(
      'script'
    );
    const script = scripts[scripts.length - 1];
    expect(script.src).toContain('test.js');
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
