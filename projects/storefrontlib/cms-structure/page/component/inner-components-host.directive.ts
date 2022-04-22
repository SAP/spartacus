import {
  Directive,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import {
  CmsComponent,
  DynamicAttributeService,
  EventService,
} from '@spartacus/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CmsComponentsService } from '../../services/cms-components.service';
import { CmsComponentContextData } from '../model/cms-component-context';
import { CmsComponentData } from '../model/cms-component-data';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { CmsInjectorService } from './services/cms-injector.service';
import { ComponentHandlerService } from './services/component-handler.service';

@Directive({
  selector: '[cxInnerComponentsHost]',
})
export class InnerComponentsHostDirective<T = any>
  implements OnInit, OnDestroy, OnChanges
{
  /**
   * Context data to be provided to created inner components
   */
  @Input() cxInnerComponentsContext: T;

  /**
   * Observable with current context
   */
  private readonly innerComponentsContext$ = new ReplaySubject<T>(1);

  protected innerComponents$ = this.data.data$.pipe(
    map((data) => data?.composition?.inner ?? []),
    distinctUntilChanged()
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
    protected eventService: EventService
  ) {}

  ngOnInit(): void {
    this.subscription = this.innerComponents$.subscribe((x) => {
      this.renderComponents(x);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cxInnerComponentsContext) {
      this.innerComponentsContext$.next(this.cxInnerComponentsContext);
    }
  }

  protected renderComponents(components: string[]) {
    this.clearComponents();
    components.forEach((component) => this.renderComponent(component));
  }

  protected renderComponent(component: string) {
    const componentWrapper = new ComponentWrapperDirective(
      this.vcr,
      this.cmsComponentsService,
      this.getInjector(),
      this.dynamicAttributeService,
      this.renderer,
      this.componentHandler,
      this.cmsInjector,
      this.eventService
    );
    componentWrapper.cxComponentWrapper = { flexType: component, uid: '' };
    componentWrapper.ngOnInit();
    this.componentWrappers.push(componentWrapper);
  }

  protected clearComponents() {
    this.componentWrappers.forEach((wrapper) => wrapper.ngOnDestroy());
    this.componentWrappers = [];
  }

  /**
   * Returns injector with CmsComponentContextData that can be injected to the component
   */
  private getInjector(): Injector {
    const contextData: CmsComponentContextData<T> = {
      context$: this.innerComponentsContext$.asObservable(),
    };

    return Injector.create({
      providers: [
        {
          provide: CmsComponentContextData,
          useValue: contextData,
        },
      ],
      parent: this.injector,
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.innerComponentsContext$.complete();
    this.clearComponents();
  }
}
