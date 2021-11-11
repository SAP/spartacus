import {
  Directive,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { CmsComponent, DynamicAttributeService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsComponentsService } from '../../services/cms-components.service';
import { CmsComponentData } from '../model/cms-component-data';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { InnerComponentsContext } from './inner-components-context.model';
import { CmsInjectorService } from './services/cms-injector.service';
import { ComponentHandlerService } from './services/component-handler.service';

@Directive({
  selector: '[cxInnerComponentsHost]',
  providers: [InnerComponentsContext],
})
export class InnerComponentsHostDirective implements OnInit, OnDestroy {
  @Input('cxInnerComponentsHost') context: any;

  protected innerComponents$ = this.data.data$.pipe(
    map((data) => data?.composition?.inner ?? [])
  );

  protected componentWrappers: any[] = [];
  protected subscription?: Subscription;

  constructor(
    protected data: CmsComponentData<CmsComponent>,
    protected vcr: ViewContainerRef,
    // dependencies required for ComponentWrapper directive
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected componentHandler: ComponentHandlerService,
    protected cmsInjector: CmsInjectorService,
    protected innerComponentsContext: InnerComponentsContext
  ) {}

  ngOnInit(): void {
    this.innerComponentsContext.context = this.context;
    this.subscription = this.innerComponents$.subscribe((x) => {
      this.renderComponents(x);
    });
  }

  protected renderComponents(components: string[]) {
    this.clearComponents();
    components.forEach((component) => this.renderComponent(component));
  }

  protected renderComponent(component: string) {
    const componentWrapper = new ComponentWrapperDirective(
      this.vcr,
      this.cmsComponentsService,
      this.injector,
      this.dynamicAttributeService,
      this.renderer,
      this.componentHandler,
      this.cmsInjector
    );
    componentWrapper.cxComponentWrapper = { flexType: component, uid: '' };
    componentWrapper.ngOnInit();
    this.componentWrappers.push(componentWrapper);
  }

  protected clearComponents() {
    this.componentWrappers.forEach((wrapper) => wrapper.ngOnDestroy());
    this.componentWrappers = [];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.clearComponents();
  }
}
