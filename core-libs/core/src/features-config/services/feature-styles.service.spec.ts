import { Component, ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureToggles } from '../feature-toggles';
import { FeatureStylesService } from './feature-styles.service';

@Component({
  selector: 'cx-test-root',
  template: '',
  host: { class: 'originalHostClass' },
})
class TestRootComponent {}

function getCssClasses(componentRef: ComponentRef<any>): string[] {
  return (
    componentRef.location.nativeElement as HTMLElement
  ).classList.value.split(' ');
}

describe('FeatureStylesService', () => {
  let service: FeatureStylesService;
  let testComponentRef: ComponentRef<any>;
  let featureToggles: FeatureToggles;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FeatureToggles,
          // Use a fresh object each test so mutating it in one test
          // doesn't bleed into the next.
          useValue: { featureFlag: undefined } as unknown as FeatureToggles,
        },
      ],
    });
    service = TestBed.inject(FeatureStylesService);
    featureToggles = TestBed.inject(FeatureToggles);
    const fixture = TestBed.createComponent(TestRootComponent);
    testComponentRef = fixture.componentRef;
  });

  describe('init()', () => {
    describe('when registerUsage() was not called before', () => {
      it('should leave CSS classes of root element untouched', () => {
        (featureToggles as any).featureFlag = true;

        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);

        service.init(testComponentRef);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
      });
    });

    describe('when registerUsage() was called before', () => {
      it('should add CSS class to root element for feature that is enabled', () => {
        (featureToggles as any).featureFlag = true;

        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);

        service.init(testComponentRef);
        expect(getCssClasses(testComponentRef)).toEqual([
          'originalHostClass',
          'cxFeat_featureFlag',
        ]);
      });

      it('should NOT add CSS class to root element for feature that is DISABLED', () => {
        (featureToggles as any).featureFlag = false;

        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);

        service.init(testComponentRef);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
      });

      it('should NOT add CSS class to root element for feature that is undefined', () => {
        delete (featureToggles as any).featureFlag;

        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);

        service.init(testComponentRef);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
      });

      describe('...and when unregisterUsage() was called before too', () => {
        it('should leave root element given element untouched', () => {
          (featureToggles as any).featureFlag = true;

          service.registerUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);

          service.init(testComponentRef);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
        });
      });
    });
  });

  describe('registerUsage()', () => {
    describe('when init() was not called before', () => {
      beforeEach(() => {
        // not calling `service.init(testComponentRef)`
      });

      it('should NOT add CSS class to root element for feature that is enabled', () => {
        (featureToggles as any).featureFlag = true;

        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
      });

      it('should NOT add CSS class to root element for feature that is DISABLED', () => {
        (featureToggles as any).featureFlag = false;

        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
      });
    });

    describe('when init() was called before', () => {
      beforeEach(() => {
        service.init(testComponentRef);
      });

      it('should add CSS class to root element for feature that is enabled', () => {
        (featureToggles as any).featureFlag = true;

        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual([
          'originalHostClass',
          'cxFeat_featureFlag',
        ]);
      });

      it('should NOT add CSS class to root element for feature that is DISABLED', () => {
        (featureToggles as any).featureFlag = false;

        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
      });

      describe('when registerUsage() was called two times', () => {
        it('should add CSS class to root element for feature that is enabled', () => {
          (featureToggles as any).featureFlag = true;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.registerUsage('featureFlag' as any);
          service.registerUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
            'cxFeat_featureFlag',
          ]);
        });

        it('should NOT add CSS class to root element for feature that is DISABLED', () => {
          (featureToggles as any).featureFlag = false;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.registerUsage('featureFlag' as any);
          service.registerUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
        });
      });

      describe('and when unregisterUsage() was called once', () => {
        it('should add CSS class to root element for feature that is enabled', () => {
          (featureToggles as any).featureFlag = true;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.registerUsage('featureFlag' as any);
          service.registerUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
            'cxFeat_featureFlag',
          ]);
        });

        it('should NOT add CSS class to root element for feature that is DISABLED', () => {
          (featureToggles as any).featureFlag = false;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.registerUsage('featureFlag' as any);
          service.registerUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
        });
      });

      describe('and when unregisterUsage() was called twice', () => {
        it('should NOT add CSS class to root element for feature that is enabled', () => {
          (featureToggles as any).featureFlag = true;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.registerUsage('featureFlag' as any);
          service.registerUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
        });

        it('should NOT add CSS class to root element for feature that is DISABLED', () => {
          (featureToggles as any).featureFlag = false;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.registerUsage('featureFlag' as any);
          service.registerUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          service.unregisterUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
        });
      });
    });
  });

  describe('unregisterUsage()', () => {
    beforeEach(() => {
      service.init(testComponentRef);
    });

    describe('and when registerUsage() is called later too', () => {
      it('should add CSS class to root element for feature that is enabled', () => {
        (featureToggles as any).featureFlag = true;

        expect(getCssClasses(testComponentRef)).toEqual(['originalHostClass']);
        service.unregisterUsage('featureFlag' as any); // note: this one is ignored, because the counter is already 0
        service.registerUsage('featureFlag' as any);
        expect(getCssClasses(testComponentRef)).toEqual([
          'originalHostClass',
          'cxFeat_featureFlag',
        ]);
      });
    });

    describe('when called twice', () => {
      describe('and when registerUsage() is called later once too', () => {
        it('should add CSS class to root element for feature that is enabled', () => {
          (featureToggles as any).featureFlag = true;

          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
          ]);
          service.unregisterUsage('featureFlag' as any); // note: this one is ignored, because the counter is already 0
          service.unregisterUsage('featureFlag' as any); // note: this one is ignored, because the counter is already 0
          service.registerUsage('featureFlag' as any);
          expect(getCssClasses(testComponentRef)).toEqual([
            'originalHostClass',
            'cxFeat_featureFlag',
          ]);
        });
      });
    });
  });
});
