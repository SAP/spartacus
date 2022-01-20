import {
  Component,
  Inject,
  NgModule,
  PLATFORM_ID,
  Renderer2,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CmsComponent,
  CmsConfig,
  CmsService,
  ConfigInitializerService,
  ContentSlotComponentData,
  DynamicAttributeService,
  EventService,
} from '@spartacus/core';
import {
  ComponentCreateEvent,
  ComponentDestroyEvent,
  ComponentEvent,
  ComponentHandler,
  PageComponentModule,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { CmsComponentData } from '../model/cms-component-data';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { WebComponentHandler } from './handlers/web-component.handler';
import { CxApiService } from './services/cx-api.service';

const testText = 'test text';

@Component({
  selector: 'cx-test',
  template: ` <div id="debugEl1">${testText}</div> `,
})
class TestComponent {
  constructor(
    public cmsData: CmsComponentData<CmsComponent>,
    @Inject('testService') public testService
  ) {}
}

@NgModule({
  declarations: [TestComponent],
  exports: [TestComponent],
})
class TestModule {}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: {
      component: TestComponent,
      providers: [
        {
          provide: 'testService',
          useValue: 'testValue',
        },
      ],
    },
  },
};

class MockCmsService {
  getComponentData(): any {}
}

class MockDynamicAttributeService {
  addAttributesToComponent(): void {}
}

@Component({
  template: `<ng-container
    [cxComponentWrapper]="component"
    (cxComponentRef)="testComponentRef($event)"
  >
    +
  </ng-container>`,
})
class TestWrapperComponent {
  component: ContentSlotComponentData = {
    typeCode: 'cms_typeCode',
    flexType: 'CMSTestComponent',
    uid: 'test_uid',
    properties: {
      smartedit: {
        test: 'test',
      },
    },
  };

  testComponentRef(_componentRef: any): void {}
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(MockCmsModuleConfig);
}

describe('ComponentWrapperDirective', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let dynamicAttributeService: DynamicAttributeService;
  let renderer: Renderer2;
  let eventService: EventService;
  let testBedConfig: TestModuleMetadata;

  beforeEach(() => {
    testBedConfig = {
      imports: [PageComponentModule.forRoot(), TestModule],
      declarations: [TestWrapperComponent, ComponentWrapperDirective],
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
        { provide: CxApiService, useValue: { cms: {}, auth: {}, routing: {} } },
        EventService,
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
      ],
    };
  });

  describe('in SSR', () => {
    let cmsConfig: CmsConfig;

    beforeEach(
      waitForAsync(() => {
        testBedConfig.providers.push({
          provide: PLATFORM_ID,
          useValue: 'server',
        });
        TestBed.configureTestingModule(testBedConfig).compileComponents();
      })
    );

    describe('with angular component', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(
          TestWrapperComponent as Type<TestWrapperComponent>
        );
        cmsConfig = TestBed.inject(CmsConfig);
      });

      it('should instantiate the found component if it was enabled for SSR', () => {
        cmsConfig.cmsComponents.CMSTestComponent.disableSSR = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#debugEl1').textContent).toContain(
          testText
        );
      });

      it('should NOT instantiate the found component if it was disabled for SSR', () => {
        cmsConfig.cmsComponents.CMSTestComponent.disableSSR = true;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#debugEl1')).toBe(null);
      });
    });
  });

  describe('in non-SSR', () => {
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule(testBedConfig).compileComponents();
      })
    );

    describe('with angular component', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        dynamicAttributeService = TestBed.inject(DynamicAttributeService);
        eventService = TestBed.inject(EventService);
        renderer = fixture.componentRef.injector.get<Renderer2>(
          Renderer2 as any
        );
        component = fixture.componentInstance;
      });

      it('should instantiate the found component correctly', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#debugEl1').textContent).toContain(
          testText
        );
      });

      describe('events', () => {
        it('should dispatch ComponentCreateEvent on creation', () => {
          spyOn(eventService, 'dispatch').and.callThrough();
          fixture.detectChanges();

          const el = fixture.debugElement;
          const compEl = el.query(By.css('cx-test')).nativeElement;

          expect(eventService.dispatch).toHaveBeenCalledWith(
            {
              typeCode: 'cms_typeCode',
              id: 'test_uid',
              host: compEl,
            } as ComponentEvent,
            ComponentCreateEvent
          );
        });

        it('should dispatch ComponentDestroyEvent on creation', () => {
          spyOn(eventService, 'dispatch').and.callThrough();
          fixture.detectChanges();
          fixture.destroy();
          expect(eventService.dispatch).toHaveBeenCalledWith(
            {
              typeCode: 'cms_typeCode',
              id: 'test_uid',
            } as ComponentEvent,
            ComponentDestroyEvent
          );
        });
      });

      it('should add SmartEdit contract if app launch in SmartEdit', () => {
        spyOn(
          dynamicAttributeService,
          'addAttributesToComponent'
        ).and.callThrough();

        fixture.detectChanges();
        const el = fixture.debugElement;
        const compEl = el.query(By.css('cx-test')).nativeElement;
        expect(
          dynamicAttributeService.addAttributesToComponent
        ).toHaveBeenCalledWith(compEl, renderer, {
          typeCode: 'cms_typeCode',
          flexType: 'CMSTestComponent',
          uid: 'test_uid',
          properties: {
            smartedit: {
              test: 'test',
            },
          },
        });
      });

      it('should inject cms component data', () => {
        fixture.detectChanges();
        const testComponentInstance = <TestComponent>(
          fixture.debugElement.children[0].componentInstance
        );
        expect(testComponentInstance.cmsData.uid).toContain('test_uid');
        expect((testComponentInstance as any).testKey).not.toContain(
          'testValue'
        );
      });

      it('should provide configurable cms component providers', () => {
        fixture.detectChanges();
        const testComponentInstance = <TestComponent>(
          fixture.debugElement.children[0].componentInstance
        );
        expect(testComponentInstance.testService).toEqual('testValue');
        expect((testComponentInstance as any).testKey).not.toContain(
          'testValue'
        );
      });

      it('should emit component ref', () => {
        spyOn(component, 'testComponentRef').and.callThrough();

        fixture.detectChanges();

        expect(component.testComponentRef).toHaveBeenCalled();
      });
    });

    describe('with web component', () => {
      let scriptEl;

      beforeEach(() => {
        const cmsMapping = TestBed.inject(CmsConfig);
        cmsMapping.cmsComponents.CMSTestComponent.component =
          'path/to/file.js#cms-component';
        fixture = TestBed.createComponent(TestWrapperComponent);
        fixture.detectChanges();
        scriptEl = fixture.debugElement.nativeNode.nextSibling;
      });

      it('should load web component script', () => {
        expect(scriptEl.src).toContain('path/to/file.js');
      });

      it('should instantiate web component', (done) => {
        scriptEl.onload(); // invoke load callbacks

        // run in next runloop (to process async tasks)
        setTimeout(() => {
          const cmsComponentElement =
            fixture.debugElement.nativeElement.querySelector('cms-component');
          expect(cmsComponentElement).toBeTruthy();
          const componentData = cmsComponentElement.cxApi.cmsComponentData;
          expect(componentData.uid).toEqual('test_uid');
          done();
        });
      });

      it('should pass cxApi to web component', (done) => {
        scriptEl.onload(); // invoke load callbacks

        // run in next runloop (to process async tasks)
        setTimeout(() => {
          const cmsComponentElement =
            fixture.debugElement.nativeElement.querySelector('cms-component');
          const cxApi = cmsComponentElement.cxApi as CxApiService;
          expect(cxApi.cms).toBeTruthy();
          expect(cxApi.auth).toBeTruthy();
          expect(cxApi.routing).toBeTruthy();
          expect(cxApi.cmsComponentData).toBeTruthy();
          done();
        });
      });
    });
  });
});
