import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionService } from './intersection.service';

const MockLayoutConfig: LayoutConfig = {};

@Component({
  selector: 'cx-any',
  template: '<div id="any"></div>',
})
class MockAnyComponent {}

function beforeEachForPlatform(platformId: string) {
  TestBed.configureTestingModule({
    declarations: [MockAnyComponent],
    providers: [
      { provide: PLATFORM_ID, useValue: platformId },
      { provide: LayoutConfig, useValue: MockLayoutConfig },
    ],
  });
}

describe('IntersectionService', () => {
  describe('for browser platform', () => {
    let service: IntersectionService;
    beforeEach(() => {
      beforeEachForPlatform('browser');
      service = TestBed.get(IntersectionService);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('for no-browser platform', () => {
    let service: IntersectionService;
    let fixture: ComponentFixture<MockAnyComponent>;
    let el: DebugElement;
    beforeEach(() => {
      beforeEachForPlatform('server');
      service = TestBed.get(IntersectionService);
      fixture = TestBed.createComponent(MockAnyComponent);

      el = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should simulate intersection always on SSR', () => {
      let result;

      service
        .isIntersected(el.query(By.css('#any')).nativeElement)
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });
});
