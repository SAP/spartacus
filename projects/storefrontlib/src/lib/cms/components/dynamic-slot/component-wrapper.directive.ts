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
import { AbstractCmsComponent } from '../abstract-cms-component';

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
    private componentMapper: ComponentMapperService
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
      const instance: AbstractCmsComponent = this.cmpRef.instance;
      if (instance.setUid) {
        instance.setUid(this.componentUid);
      }
      if (instance.setLoad) {
        instance.setLoad(this.componentLoad);
      }
      // pass parameters to dynamic component
      if (this.contextParameters && instance.setContextParameters) {
        instance.setContextParameters(this.contextParameters);
      }
      if (instance.bootstrap) {
        instance.bootstrap();
      }
      if (this.componentLoad) {
        this.cmpRef.changeDetectorRef.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
