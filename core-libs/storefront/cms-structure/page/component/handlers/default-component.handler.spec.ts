import { Component, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Priority } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { CmsComponentsService } from '../../../services/cms-components.service';
import { DefaultComponentHandler } from './default-component.handler';

const mockCmsMappingService = {
  getComponentMapping: () => ({ component: TestComponent }),
};

@Component({ template: '' })
class WrapperComponent {
  constructor(public vcr: ViewContainerRef) {}
}

@Component({ template: 'testComponent' })
class TestComponent {}

describe('DefaultComponentHandler', () => {
  let handler: DefaultComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, WrapperComponent],
      providers: [
        {
          provide: CmsComponentsService,
          useValue: mockCmsMappingService,
        },
      ],
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

  it('should launch component', async () => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    const { elementRef, componentRef } = await firstValueFrom(
      handler.launcher({ component: TestComponent }, fixture.componentInstance.vcr)
    );
    expect(componentRef.componentType).toBe(TestComponent);
    expect(elementRef.nativeElement.innerText).toBe('testComponent');
  });
});
