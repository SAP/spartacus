import { TestBed } from '@angular/core/testing';
import { DefaultComponentHandler } from './default-component.handler';
import { CmsComponentsService } from '../../../services/cms-components.service';
import { Priority } from '@spartacus/core';
import { Component, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';

const mockCmsMappingService = {
  getComponentMapping: () => ({ component: TestComponent }),
};

@Component({
  template: '',
})
class WrapperComponent {
  constructor(public vcr: ViewContainerRef) {}
}

@Component({
  template: 'testComponent',
})
class TestComponent {}

describe('DefaultComponentHandler', () => {
  let handler: DefaultComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsComponentsService,
          useValue: mockCmsMappingService,
        },
      ],
      declarations: [TestComponent, WrapperComponent],
    }).compileComponents();
    handler = TestBed.inject(DefaultComponentHandler);
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  describe('hasMatch', () => {
    it('should match component class', () => {
      expect(handler.hasMatch({ component: TestComponent })).toBeTruthy();
    });
  });

  it('getPriority should return fallback', () => {
    expect(handler.getPriority()).toEqual(Priority.FALLBACK);
  });

  it('should launch component', (done) => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    handler
      .launcher({ component: TestComponent }, fixture.componentInstance.vcr)
      .pipe(take(1))
      .subscribe(({ elementRef, componentRef }) => {
        expect(componentRef.componentType).toBe(TestComponent);
        expect(elementRef.nativeElement.innerText).toBe('testComponent');
        done();
      });
  });
});
