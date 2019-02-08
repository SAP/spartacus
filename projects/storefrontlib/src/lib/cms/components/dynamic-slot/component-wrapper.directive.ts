import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import {
  CmsComponent,
  CmsConfig,
  CmsService,
  ComponentMapperService,
  CxApiService
} from '@spartacus/core';
import { CmsComponentData } from '../cms-component-data';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: '[cxComponentWrapper]'
})
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  @Input()
  componentType: string;
  @Input()
  componentUid: string;
  @Input()
  componentUuid: string;
  @Input()
  componentCatalogUuid: string;
  @Input()
  componentCssClass: string;
  @Input()
  contextParameters: any;

  cmpRef: ComponentRef<any>;
  webElement: any;

  constructor(
    private vcr: ViewContainerRef,
    private componentMapper: ComponentMapperService,
    private injector: Injector,
    private cmsService: CmsService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private config: CmsConfig,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!this.shouldRender) {
      return;
    }

    if (this.componentMapper.isWebComponent(this.componentType)) {
      this.launchWebComponent();
    } else {
      this.launchComponent();
    }
  }

  private get shouldRender(): boolean {
    const isSSR = isPlatformServer(this.platformId);
    const disableSSR = (this.config.cmsComponents[this.componentType] || {})
      .disableSSR;
    return !(isSSR && disableSSR);
  }

  private launchComponent() {
    const factory = this.componentMapper.getComponentFactoryByCode(
      this.componentType
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
      this.componentType,
      this.renderer
    );

    if (elementName) {
      this.webElement = this.renderer.createElement(elementName);

      this.webElement.cxApi = {
        ...this.injector.get(CxApiService),
        CmsComponentData: this.getCmsDataForComponent()
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
      uid: this.componentUid,
      contextParameters: this.contextParameters,
      data$: this.cmsService.getComponentData(this.componentUid)
    };
  }

  private getInjectorForComponent(): Injector {
    const configProviders =
      (this.config.cmsComponents[this.componentType] || {}).providers || [];
    return Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: this.getCmsDataForComponent()
        },
        ...configProviders
      ],
      parent: this.injector
    });
  }

  private addSmartEditContract(element: Element) {
    element.classList.add('smartEditComponent');
    this.renderer.setAttribute(
      element,
      'data-smartedit-component-id',
      this.componentUid
    );
    this.renderer.setAttribute(
      element,
      'data-smartedit-component-type',
      this.componentType
    );
    this.renderer.setAttribute(
      element,
      'data-smartedit-catalog-version-uuid',
      this.componentCatalogUuid
    );
    this.renderer.setAttribute(
      element,
      'data-smartedit-component-uuid',
      this.componentUuid
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
