import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureStylesService } from '../services/feature-styles.service';
import { useFeatureStyles } from './use-feature-styles';

class MockFeatureStylesService {
  registerUsage = jasmine.createSpy('registerUsage');
  unregisterUsage = jasmine.createSpy('unregisterUsage');
}

@Component({ selector: 'cx-test', template: '' })
class TestComponent {
  constructor() {
    useFeatureStyles('testFeatureFlag');
  }
}

@Component({ selector: 'cx-erronous-test', template: '' })
class ErroneousTestComponent implements OnInit {
  ngOnInit() {
    useFeatureStyles('testFeatureFlag');
  }
}

describe('useFeatureStyles', () => {
  let service: FeatureStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FeatureStylesService, useClass: MockFeatureStylesService },
      ],
    });
    service = TestBed.inject(FeatureStylesService);
  });

  describe('when called in constructor of component', () => {
    it(`should register usage of feature flag's styles`, () => {
      expect(service.registerUsage).not.toHaveBeenCalledWith('testFeatureFlag');
      TestBed.createComponent(TestComponent);
      expect(service.registerUsage).toHaveBeenCalledWith('testFeatureFlag');
    });

    it(`should unregister usage of feature flag's styles on component destroy`, () => {
      expect(service.unregisterUsage).not.toHaveBeenCalledWith(
        'testFeatureFlag'
      );
      const fixture = TestBed.createComponent(TestComponent);
      expect(service.unregisterUsage).not.toHaveBeenCalledWith(
        'testFeatureFlag'
      );
      fixture.destroy();
      expect(service.unregisterUsage).toHaveBeenCalledWith('testFeatureFlag');
    });
  });

  describe('when called outside of constructor of component, in ngOnInit', () => {
    it('should throw an error', () => {
      const fixture = TestBed.createComponent(ErroneousTestComponent);
      expect(() => fixture.detectChanges()).toThrow();
    });
  });
});
