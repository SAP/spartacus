import { InnerComponentsHostDirective } from './inner-components-host.directive';
import {
  CmsComponentData,
  CmsComponentsService,
  CmsInjectorService,
  ComponentHandler,
  ComponentHandlerService,
  ComponentWrapperDirective,
  PageComponentModule,
} from '@spartacus/storefront';
import {
  Component,
  Injector,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {
  CmsComponent,
  CmsConfig,
  CmsService,
  ConfigInitializerService,
  DynamicAttributeService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WebComponentHandler } from './handlers/web-component.handler';
import { CxApiService } from './services/cx-api.service';

@Component({
  selector: 'cx-inner-a',
  template: `_A_`,
})
class InnerAComponent {}

@Component({
  selector: 'cx-inner-b',
  template: `_B_`,
})
class InnerBComponent {}

@Component({
  selector: 'cx-host',
  template: `<div [cxInnerComponentsHost]></div>`,
})
class HostComponent {}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    innerA: {
      component: InnerAComponent,
    },
    innerB: {
      component: InnerBComponent,
    },
  },
};

class MockCmsService implements Partial<CmsService> {
  getComponentData(): any {}
}

class MockDynamicAttributeService
  implements Partial<MockDynamicAttributeService> {
  addAttributesToComponent(): void {}
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService> {
  getStable = () => of(MockCmsModuleConfig);
}

const MockCmsComponentData: CmsComponentData<CmsComponent> = {
  data$: of({
    composition: {
      inner: ['innerA', 'innerB', 'innerA'],
    },
  }),
  uid: 'HostComponent',
};

describe('InnerComponentsHostDirective', () => {
  it('should create an instance', () => {
    const directive = new InnerComponentsHostDirective(
      {
        data$: of({}),
        uid: '',
      },
      {} as ViewContainerRef,
      {} as CmsComponentsService,
      {} as Injector,
      {} as DynamicAttributeService,
      {} as Renderer2,
      {} as ComponentHandlerService,
      {} as CmsInjectorService
    );
    expect(directive).toBeTruthy();
  });

  describe('UI tests', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [PageComponentModule],
          declarations: [
            HostComponent,
            InnerComponentsHostDirective,
            ComponentWrapperDirective,
          ],
          providers: [
            Renderer2,
            { provide: CmsConfig, useValue: MockCmsModuleConfig },
            { provide: CmsService, useClass: MockCmsService },
            {
              provide: DynamicAttributeService,
              useClass: MockDynamicAttributeService,
            },
            {
              provide: ComponentHandler,
              useExisting: WebComponentHandler,
              multi: true,
            },
            {
              provide: CxApiService,
              useValue: { cms: {}, auth: {}, routing: {} },
            },
            {
              provide: ConfigInitializerService,
              useClass: MockConfigInitializerService,
            },
            {
              provide: CmsComponentData,
              useValue: MockCmsComponentData,
            },
          ],
        }).compileComponents();
        fixture = TestBed.createComponent(HostComponent);
      })
    );

    it('should render inner components', () => {
      fixture.detectChanges();
      const content = fixture.debugElement.nativeElement.textContent;
      expect(content).toEqual('_A__B__A_');
    });

    it('directive should destroy child components on destroy', () => {
      fixture.detectChanges();
      const contentBefore = fixture.debugElement.nativeElement.textContent;
      expect(contentBefore).toEqual('_A__B__A_');
      const directive = fixture.debugElement.childNodes[0].injector.get(
        InnerComponentsHostDirective
      );
      directive.ngOnDestroy();
      const contentAfter = fixture.debugElement.nativeElement.textContent;
      expect(contentAfter).toEqual('');
    });
  });
});
