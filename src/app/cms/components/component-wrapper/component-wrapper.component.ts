import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnChanges,
  ChangeDetectorRef,
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
  @Input() componentClass: string;

  private isViewInitialized = false;
  cmpRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private componentMapper: ComponentMapperService
  ) {}

  ngOnInit() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.launchComponent();
  }

  launchComponent() {
    if (!this.isViewInitialized) {
      return;
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
