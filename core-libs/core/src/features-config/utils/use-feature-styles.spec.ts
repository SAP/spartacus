import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureStylesService } from '../services/feature-styles.service';
import { useFeatureStyles } from './use-feature-styles';

class MockFeatureStylesService {
  registerUsage = jasmine.createSpy('registerUsage');
  unregisterUsage = jasmine.createSpy('unregisterUsage');
}

@Component({
  selector: 'cx-test',
  template: '',
})
class TestComponent {
  constructor() {
    useFeatureStyles('testFeatureFlag' as any);
  }
}

@Component({
  selector: 'cx-erronous-test',
  template: '',
})
class ErroneousTestComponent implements OnInit {
  ngOnInit() {
    useFeatureStyles('testFeatureFlag' as any);
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
      expect(service.registerUsage).not.toHaveBeenCalledWith('testFeatureFlag' as any);
      TestBed.createComponent(TestComponent);
      expect(service.registerUsage).toHaveBeenCalledWith('testFeatureFlag' as any);
    });

    it(`should unregister usage of feature flag's styles on component destroy`, () => {
      expect(service.unregisterUsage).not.toHaveBeenCalledWith(
        'testFeatureFlag' as any
      );
      const fixture = TestBed.createComponent(TestComponent);
      expect(service.unregisterUsage).not.toHaveBeenCalledWith(
        'testFeatureFlag' as any
      );
      fixture.destroy();
      expect(service.unregisterUsage).toHaveBeenCalledWith('testFeatureFlag' as any);
    });
  });

  describe('when called outside of constructor of component, in ngOnInit', () => {
    it('should throw an error', () => {
      const fixture = TestBed.createComponent(ErroneousTestComponent);
      expect(() => fixture.detectChanges()).toThrow();
    });
  });
});
