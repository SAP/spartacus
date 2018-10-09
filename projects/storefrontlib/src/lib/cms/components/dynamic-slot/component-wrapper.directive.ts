import {
  Directive,
  ViewContainerRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  ComponentFactoryResolver,
  Injector
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

  constructor(
    private vcr: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentMapper: ComponentMapperService,
    private injector: Injector,
    private cmsService: CmsService
  ) {}

  ngAfterViewInit() {
    this.launchComponent();
  }

  private launchComponent() {
    const componentTypeClass = this.componentMapper.getComponentTypeByCode(
      this.componentType
    );

    if (componentTypeClass) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        componentTypeClass
      );

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
  }
}
