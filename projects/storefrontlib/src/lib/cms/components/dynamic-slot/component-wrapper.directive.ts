import {
  Directive,
  ViewContainerRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  Injector,
  Renderer2
} from '@angular/core';
import { ComponentMapperService } from '../../services/component-mapper.service';
import { CmsService } from '../../facade/cms.service';
import { CmsComponentData } from '../cms-component-data';
import { AbstractCmsComponent } from '../abstract-cms-component';

@Directive({
  selector: '[yComponentWrapper]'
})
export class ComponentWrapperDirective implements AfterViewInit, OnDestroy {
  @Input()
  componentType: string;
  @Input()
  componentUid: string;
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
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    if (this.componentMapper.isWebComponent(this.componentType)) {
      this.launchWebComponent();
    } else {
      this.launchComponent();
    }
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

      // TODO: Remove after AbstractCmsComponent will be removed
      const instance: AbstractCmsComponent = this.cmpRef.instance;
      if (instance.onCmsComponentInit) {
        instance.onCmsComponentInit(this.componentUid, this.contextParameters);
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
      this.webElement.injector = this.injector;
      this.renderer.appendChild(
        this.vcr.element.nativeElement.parentElement,
        this.webElement
      );
    }
  }

  private getInjectorForComponent() {
    const componentData: CmsComponentData = {
      uid: this.componentUid,
      contextParameters: this.contextParameters,
      data$: this.cmsService.getComponentData(this.componentUid)
    };

    return Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: componentData
        }
      ],
      parent: this.injector
    });
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
