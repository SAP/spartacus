import {
  Directive,
  ViewContainerRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  ComponentFactoryResolver
} from '@angular/core';
import { ComponentMapperService } from '../../services/component-mapper.service';
import { CmsComponent } from '../cms.component';
import { CmsService } from '../../facade/cms.service';

@Directive({
  selector: '[yComponentWrapper]'
})
export class ComponentWrapperDirective implements AfterViewInit, OnDestroy {
  @Input() componentType: string;
  @Input() componentUid: string;
  @Input() componentCssClass: string;
  @Input() contextParameters: any;
  @Input() componentLoad = false;

  cmpRef: ComponentRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentMapper: ComponentMapperService,
    protected cmsService: CmsService
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

      this.cmpRef = this.vcr.createComponent(factory);
      const instance: CmsComponent = this.cmpRef.instance;

      if (instance.onCmsComponentInit) {
        instance.onCmsComponentInit(
          this.componentUid,
          this.cmsService.getComponentData(this.componentUid, this.componentLoad),
          this.contextParameters
        );
      }
    }
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
