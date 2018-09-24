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
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CmsComponent } from '../cms.component';

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
    protected store: Store<fromStore.CmsState>
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

      if (instance.OnCmsComponentInit) {
        instance.OnCmsComponentInit(
          this.componentUid,
          this.getComponentData(this.componentUid, this.componentLoad),
          this.contextParameters
        );
      }
    }
  }

  getComponentData(uid: string, shouldLoad: boolean): Observable<any> {
    return this.store
      .select(fromStore.componentSelectorFactory(uid))
      .pipe(
        tap(componentData => {
          if (componentData === undefined && shouldLoad) {
            this.store.dispatch(new fromStore.LoadComponent(uid));
          }
        })
      );
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
