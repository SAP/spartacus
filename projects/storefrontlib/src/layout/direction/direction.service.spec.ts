import { TestBed } from '@angular/core/testing';
import { LanguageService, WindowRef } from '@spartacus/core';
import { LayoutConfig } from '../config/layout-config';
import { DirectionService } from './direction.service';

class MockWindowRef {}

const mockLanguageService = {
  getActive: () => {},
};

xdescribe('DirectionService', () => {
  let service: DirectionService;
  //   let config: LayoutConfig;
  //   let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: LayoutConfig, useValue: {} },
        { provide: LanguageService, useClass: mockLanguageService },
        DirectionService,
      ],
    });
    service = TestBed.inject(DirectionService);
    // config = TestBed.inject(LayoutConfig);
    // windowRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the service', () => {
    // const spy = spyOn(service as any, 'initialize');
    // expect(spy).toHaveBeenCalled();
  });

  //   it('should detect a rtl language', () => {
  //     //
  //   });

  //   it('should detect a ltr language', () => {
  //     //
  //   });

  //   it('should fallback to the default direction mode', () => {
  //     //
  //   });

  //   it('should add the direction attribute', () => {
  //     //
  //   });
});
