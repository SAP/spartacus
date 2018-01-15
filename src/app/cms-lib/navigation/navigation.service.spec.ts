import { Component, NgModule } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from '../../config.service';
import { NavigationService } from './navigation.service';

@Component({
  template: 'test'
})
export class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

export class MockConfigService {
  cmsComponentMapping = {
    CMSTestComponent: 'TestComponent'
  };
}

fdescribe('NavigationService', () => {
  let navigationService: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        NavigationService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    navigationService = TestBed.get(NavigationService);
  });

  it(
    'should inject NavigationService',
    inject([NavigationService], (service: NavigationService) => {
      expect(service).toBeTruthy();
    })
  );
});
