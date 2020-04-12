import { TestBed } from '@angular/core/testing';

// import { CmsComponentLauncherService } from './cms-component-launcher.service';

describe('CmsComponentLauncherService', () => {
  // let service: CmsComponentLauncherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(CmsComponentLauncherService);
  });

  it('should be created', () => {
    expect(true).toBeTruthy();
  });

  // describe('getComponentFactoryByCode', () => {
  //   beforeEach(() => {
  //     service = TestBed.inject(ComponentMapperService);
  //   });
  //
  //   it('should return component factory', () => {
  //     const factory = service.getComponentFactoryByCode('CMSTestComponent');
  //     console.log(factory);
  //     expect(factory instanceof ComponentFactory).toBeTruthy();
  //   });
  //
  //   it('should return null when mapping is not configured', () => {
  //     const factory = service.getComponentFactoryByCode('Unknown');
  //     expect(factory).toBeNull();
  //   });
  // });
});
