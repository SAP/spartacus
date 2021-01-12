import { RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '../../window/window-ref';
import { SmartEditService } from '../services/smart-edit.service';
import { SmartEditHtmlBodyDecorator } from './smart-edit-html-body-decorator';

class MockSmartEditService {
  addSmartEditContract() {}
}

class MockRendererFactory2 {
  createRenderer() {
    return {};
  }
}
describe('SmartEditHtmlBodyDecorator', () => {
  let decorator: SmartEditHtmlBodyDecorator;
  let smartEditService: SmartEditService;
  let winRef: WindowRef;
  let rendererFactory: RendererFactory2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartEditHtmlBodyDecorator,
        WindowRef,
        {
          provide: SmartEditService,
          useClass: MockSmartEditService,
        },
        {
          provide: RendererFactory2,
          useClass: MockRendererFactory2,
        },
      ],
    });
    decorator = TestBed.inject(SmartEditHtmlBodyDecorator);
    smartEditService = TestBed.inject(SmartEditService);
    winRef = TestBed.inject(WindowRef);
    rendererFactory = TestBed.inject(RendererFactory2);
  });

  it('should be created', () => {
    expect(decorator).toBeTruthy();
  });

  it('should call addSmartEditContract', () => {
    const page = { properties: { smartedit: { uuid: 'test-id' } } };
    spyOn(smartEditService, 'addSmartEditContract');
    decorator.decorate(undefined, undefined, page);
    expect(smartEditService.addSmartEditContract).toHaveBeenCalledWith(
      winRef.document.body,
      rendererFactory.createRenderer(null, null),
      page.properties
    );
  });
});
