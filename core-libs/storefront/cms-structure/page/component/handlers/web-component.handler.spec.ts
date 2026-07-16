import { Component, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Priority } from '@spartacus/core';
import { firstValueFrom } from 'rxjs';
import { CmsComponentsService } from '../../../services/cms-components.service';
import { CxApiService } from '../services/cx-api.service';
import { WebComponentHandler } from './web-component.handler';

const mockCmsMappingService = { getComponentMapping: vi.fn() };

@Component({
  template: '',
})
class WrapperComponent {
  constructor(public vcr: ViewContainerRef) {}
}

describe('WebComponentHandler', () => {
  let handler: WebComponentHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsComponentsService,
          useValue: mockCmsMappingService,
        },
        {
          provide: CxApiService,
          useValue: {},
        },
      ],
    });
    handler = TestBed.inject(WebComponentHandler);
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  describe('hasMatch', () => {
    it('should match component class', () => {
      expect(handler.hasMatch({ component: '#my-webcomponent' })).toBeTruthy();
    });
  });

  it('getPriority should return low', () => {
    expect(handler.getPriority()).toEqual(Priority.LOW);
  });

  it('should launch component', async () => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    const { elementRef } = await firstValueFrom(
      handler.launcher(
        { component: '#my-webcomponent' },
        fixture.componentInstance.vcr
      )
    );
    expect(elementRef.nativeElement.tagName).toBe('MY-WEBCOMPONENT');
  });

  it('should load script for component', () => {
    const fixture = TestBed.createComponent(WrapperComponent);
    fixture.detectChanges();

    handler
      .launcher(
        { component: 'test.js#my-webcomponent' },
        fixture.componentInstance.vcr
      )
      .subscribe()
      .unsubscribe();

    // get last added script
    const scripts =
      fixture.debugElement.nativeElement.parentElement.querySelectorAll(
        'script'
      );
    const script = scripts[scripts.length - 1];
    expect(script.src).toContain('test.js');
  });
});
