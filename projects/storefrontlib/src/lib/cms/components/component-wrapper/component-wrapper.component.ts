import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { AbstractCmsComponent } from '../abstract-cms-component';
import { ComponentMapperService } from '../../services/component-mapper.service';

@Component({
  selector: 'y-component-wrapper',
  templateUrl: './component-wrapper.component.html',
  styleUrls: ['./component-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentWrapperComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef })
  target;
  @Input() componentType: string;
  @Input() componentUid: string;
  @Input() contextParameters: any;
  // the component is loaded from server or extracted from cms page data
  // by default, component data is extracted from page data
  @Input() componentLoad = false;

  private isViewInitialized = false;
  cmpRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentMapper: ComponentMapperService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.launchComponent();
  }

  launchComponent() {
    if (!this.isViewInitialized) {
      return;
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const componentTypeClass = this.componentMapper.getComponentTypeByCode(
      this.componentType
    );

    if (componentTypeClass) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        componentTypeClass
      );
      this.cmpRef = this.target.createComponent(factory);
      const instance: AbstractCmsComponent = this.cmpRef.instance;
      if (instance.setUid) {
        instance.setUid(this.componentUid);
      }
      instance.setLoad(this.componentLoad);
      // pass parameters to dynamic component
      if (this.contextParameters && instance.setContextParameters) {
        instance.setContextParameters(this.contextParameters);
      }
      instance.bootstrap();
    }
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
