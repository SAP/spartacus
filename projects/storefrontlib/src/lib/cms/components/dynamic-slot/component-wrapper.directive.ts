import {
  Directive,
  ViewContainerRef,
  Input,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  ComponentFactoryResolver, Injector, ReflectiveInjector
} from '@angular/core';
import { ComponentMapperService } from '../../services/component-mapper.service';
import { CmsComponentData } from '../cms-component-data';
import { CmsService } from '../../facade/cms.service';
import { AbstractCmsComponent } from '@spartacus/storefront';
import { SearchBoxComponentService } from '../../../cms-lib/search-box/search-box-component.service';

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

      this.cmpRef = this.vcr.createComponent(factory, undefined, this.getInjectorForComponent());

      // TODO: Remove after AbstractCmsComponent will be removed
      const instance = this.cmpRef.instance as AbstractCmsComponent;
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

    const providers = [
      {
        provide: CmsComponentData,
        useValue: componentData
      }
    ];

    const componentProvider = this.componentMapper.getComponentProviders(this.componentType);
    if (componentProvider) {
      providers.push(componentProvider);
    }

    return ReflectiveInjector.resolveAndCreate(providers, this.injector);

    // return Injector.create({
    //   providers: [
    //     {
    //       provide: CmsComponentData,
    //       useValue: componentData
    //     }
    //   ],
    //   parent: this.injector
    // });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
