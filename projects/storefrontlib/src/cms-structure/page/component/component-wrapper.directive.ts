import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {
  CmsComponent,
  CmsConfig,
  CmsService,
  ContentSlotComponentData,
  CxApiService,
  DynamicAttributeService,
} from '@spartacus/core';
import { CmsComponentData } from '../model/cms-component-data';
import { ComponentMapperService } from './component-mapper.service';

@Directive({
  selector: '[cxComponentWrapper]',
})
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  @Input() cxComponentWrapper: ContentSlotComponentData;

  cmpRef: ComponentRef<any>;
  webElement: any;

  constructor(
    private vcr: ViewContainerRef,
    private componentMapper: ComponentMapperService,
    private injector: Injector,
    private cmsService: CmsService,
    private dynamicAttributeService: DynamicAttributeService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private config: CmsConfig,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!this.shouldRenderComponent()) {
      return;
    }

    if (this.componentMapper.isWebComponent(this.cxComponentWrapper.flexType)) {
      this.launchWebComponent();
    } else {
      this.launchComponent();
    }
  }

  private shouldRenderComponent(): boolean {
    const isSSR = isPlatformServer(this.platformId);
    const isComponentDisabledInSSR = (
      this.config.cmsComponents[this.cxComponentWrapper.flexType] || {}
    ).disableSSR;
    return !(isSSR && isComponentDisabledInSSR);
  }

  private launchComponent() {
    const factory = this.componentMapper.getComponentFactoryByCode(
      this.cxComponentWrapper.flexType
    );

    if (factory) {
      this.cmpRef = this.vcr.createComponent(
        factory,
        undefined,
        this.getInjectorForComponent()
      );

      this.cd.detectChanges();

      if (this.cmsService.isLaunchInSmartEdit()) {
        this.addSmartEditContract(this.cmpRef.location.nativeElement);
      }
    }
  }

  private async launchWebComponent() {
    const elementName = await this.componentMapper.initWebComponent(
      this.cxComponentWrapper.flexType,
      this.renderer
    );

    if (elementName) {
      this.webElement = this.renderer.createElement(elementName);

      this.webElement.cxApi = {
        ...this.injector.get(CxApiService),
        CmsComponentData: this.getCmsDataForComponent(),
      };

      this.renderer.appendChild(
        this.vcr.element.nativeElement.parentElement,
        this.webElement
      );
    }
  }

  private getCmsDataForComponent<T extends CmsComponent>(): CmsComponentData<
    T
  > {
    return {
      uid: this.cxComponentWrapper.uid,
      data$: this.cmsService.getComponentData(this.cxComponentWrapper.uid),
    };
  }

  private getInjectorForComponent(): Injector {
    const configProviders =
      (this.config.cmsComponents[this.cxComponentWrapper.flexType] || {})
        .providers || [];
    return Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: this.getCmsDataForComponent(),
        },
        ...configProviders,
      ],
      parent: this.injector,
    });
  }

  private addSmartEditContract(element: Element) {
    this.dynamicAttributeService.addDynamicAttributes(
      this.cxComponentWrapper.properties,
      element,
      this.renderer
    );
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    if (this.webElement) {
      this.renderer.removeChild(
        this.vcr.element.nativeElement.parentElement,
        this.webElement
      );
    }
  }
}
