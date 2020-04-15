import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DeferLoadingStrategy } from '@spartacus/core';
import { of } from 'rxjs';
import { LayoutConfig } from '../config/layout-config';
import { DeferLoaderService } from './defer-loader.service';
import { IntersectionService } from './intersection.service';

const MockInstantLayoutConfig: LayoutConfig = {
  deferredLoading: {
    strategy: DeferLoadingStrategy.INSTANT,
  },
};
const MockDeferLayoutConfig: LayoutConfig = {
  deferredLoading: {
    strategy: DeferLoadingStrategy.DEFER,
  },
};

@Component({
  selector: 'cx-any',
  template: '<div id="any"></div>',
})
class MockAnyComponent {}

class MockIntersectionService {
  isIntersected() {
    return of(false);
  }
}

function getModule(platformId: string, layoutConfig: LayoutConfig) {
  return {
    declarations: [MockAnyComponent],
    providers: [
      { provide: PLATFORM_ID, useValue: platformId },
      { provide: LayoutConfig, useValue: layoutConfig },
      { provide: IntersectionService, useClass: MockIntersectionService },
    ],
  };
}

describe('DeferLoaderService', () => {
  let service: DeferLoaderService;
  let fixture: ComponentFixture<MockAnyComponent>;
  let el: HTMLElement;

  describe('SSR', () => {
    describe('without global loading strategy', () => {
      beforeEach(() => {
        TestBed.configureTestingModule(getModule('browser', {}));
        service = TestBed.inject(DeferLoaderService);
        fixture = TestBed.createComponent(MockAnyComponent);
        el = fixture.debugElement.query(By.css('#any')).nativeElement;
        fixture.detectChanges();
      });

      it('should load instantly', () => {
        let result: boolean;
        service
          .load(el)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });
    });

    describe('global INSTANT strategy', () => {
      beforeEach(() => {
        TestBed.configureTestingModule(
          getModule('server', MockInstantLayoutConfig)
        );
        service = TestBed.inject(DeferLoaderService);
        fixture = TestBed.createComponent(MockAnyComponent);
        el = fixture.debugElement.query(By.css('#any')).nativeElement;
        fixture.detectChanges();
      });

      it('should load instantly on server', () => {
        let result: boolean;
        service
          .load(el)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });
    });

    describe('global DEFER strategy', () => {
      beforeEach(() => {
        TestBed.configureTestingModule(
          getModule('server', MockDeferLayoutConfig)
        );
        service = TestBed.inject(DeferLoaderService);
        fixture = TestBed.createComponent(MockAnyComponent);
        el = fixture.debugElement.query(By.css('#any')).nativeElement;
        fixture.detectChanges();
      });

      it('should load instantly on server', () => {
        let result: boolean;
        service
          .load(el)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });

      it('should load instantly on server, even with DEFER config argument', () => {
        let result;
        service
          .load(el, {
            deferLoading: DeferLoadingStrategy.DEFER,
          })
          .subscribe((value) => (result = value))
          .unsubscribe();

        expect(result).toEqual(true);
      });
    });
  });

  describe('browser', () => {
    describe('without global loading strategy', () => {
      beforeEach(() => {
        TestBed.configureTestingModule(getModule('browser', {}));
        service = TestBed.inject(DeferLoaderService);
        fixture = TestBed.createComponent(MockAnyComponent);
        el = fixture.debugElement.query(By.css('#any')).nativeElement;
        fixture.detectChanges();
      });

      it('should load instantly', () => {
        let result: boolean;
        service
          .load(el)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });

      it('should defer loading with DEFER config argument', () => {
        let result: boolean;
        service
          .load(el, { deferLoading: DeferLoadingStrategy.DEFER })
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(false);
      });
    });

    describe('global INSTANT strategy', () => {
      beforeEach(() => {
        TestBed.configureTestingModule(
          getModule('browser', MockInstantLayoutConfig)
        );
        service = TestBed.inject(DeferLoaderService);
        fixture = TestBed.createComponent(MockAnyComponent);
        el = fixture.debugElement.query(By.css('#any')).nativeElement;
        fixture.detectChanges();
      });

      it('should load instantly', () => {
        let result: boolean;
        service
          .load(el)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });

      it('should defer loading with DEFER config argument', () => {
        let result: boolean;
        service
          .load(el, { deferLoading: DeferLoadingStrategy.DEFER })
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(false);
      });
    });

    describe('global DEFER strategy', () => {
      beforeEach(() => {
        TestBed.configureTestingModule(
          getModule('browser', MockDeferLayoutConfig)
        );
        service = TestBed.inject(DeferLoaderService);
        fixture = TestBed.createComponent(MockAnyComponent);
        el = fixture.debugElement.query(By.css('#any')).nativeElement;
        fixture.detectChanges();
      });
      it('should defer loading', () => {
        let result: boolean;
        service
          .load(el)
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBeFalsy();
      });

      it('should load instantly with INSTANT strategy argument', () => {
        let result: boolean;
        service
          .load(el, { deferLoading: DeferLoadingStrategy.INSTANT })
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(true);
      });
    });
  });
});
