import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  CmsService,
  CMSTabParagraphContainer,
  EventService,
  WindowRef,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
} from 'rxjs/operators';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { ComponentCreateEvent } from '../../../cms-structure/page/component/events/component.event';
import { CmsComponentData } from '../../../cms-structure/page/model/index';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../layout/config/layout-config';

@Component({
  selector: 'cx-tab-paragraph-container',
  templateUrl: './tab-paragraph-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabParagraphContainerComponent
  implements AfterViewInit, OnInit, OnDestroy {
  activeTabNum = 0;

  @ViewChildren(ComponentWrapperDirective)
  children!: QueryList<ComponentWrapperDirective>;

  tabTitleParams: Observable<any>[] = [];

  subscription: Subscription;

  /**
   * @deprecated since version 4.1
   * Use the following constructor instead:
   * ```
   * constructor(
   * public componentData: CmsComponentData<CMSTabParagraphContainer>,
   * protected cmsService: CmsService,
   * protected winRef: WindowRef,
   * protected breakpointService: BreakpointService,
   * protected eventService: EventService) {}
   * ```
   */
  constructor(
    componentData: CmsComponentData<CMSTabParagraphContainer>,
    cmsService: CmsService,
    winRef: WindowRef,
    breakpointService: BreakpointService
  );
  constructor(
    public componentData: CmsComponentData<CMSTabParagraphContainer>,
    protected cmsService: CmsService,
    protected winRef: WindowRef,
    protected breakpointService: BreakpointService,
    @Optional() protected eventService?: EventService
  ) {}

  components$: Observable<any[]> = this.componentData.data$.pipe(
    distinctUntilChanged((x, y) => x?.components === y?.components),
    switchMap((data) =>
      combineLatest(
        (data?.components ?? '').split(' ').map((component) =>
          this.cmsService.getComponentData<any>(component).pipe(
            distinctUntilChanged(),
            map((tab) => {
              if (!tab) {
                return undefined;
              }

              if (!tab.flexType) {
                tab = {
                  ...tab,
                  flexType: tab.typeCode,
                };
              }

              return {
                ...tab,
                title: `${data.uid}.tabs.${tab.uid}`,
              };
            })
          )
        )
      )
    )
  );

  select(tabNum: number, event?: MouseEvent): void {
    this.breakpointService
      ?.isDown(BREAKPOINT.sm)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.activeTabNum = this.activeTabNum === tabNum ? -1 : tabNum;
          if (event && event?.target) {
            const target = event.target as HTMLElement;
            const parentNode = target.parentNode as HTMLElement;
            this.winRef?.nativeWindow?.scrollTo(0, parentNode.offsetTop);
          }
        } else {
          this.activeTabNum = tabNum;
        }
      });
  }

  ngOnInit(): void {
    this.activeTabNum =
      this.winRef?.nativeWindow?.history?.state?.activeTab ?? this.activeTabNum;
  }

  ngAfterViewInit(): void {
    // If the sub cms components data exist, the components created before ngAfterViewInit are called.
    // In this case, the title parameters are directly pulled from them.
    // If the sub cms components data does not exist, it should be loaded first.
    // In this case, listen to the changes to wait for them to be created.
    if (this.children.length > 0) {
      this.getTitleParams(this.children);
    } else {
      this.subscription = this.children.changes.subscribe(
        (tabComps: QueryList<ComponentWrapperDirective>) =>
          tabComps.forEach((child) => {
            if (child.cmpRef) {
              this.getTitleParams([child]);
            } else {
              // if tab component is not initialized, then wait for it being created
              this.eventService
                ?.get(ComponentCreateEvent)
                .pipe(
                  filter((event) => event.id === child.cxComponentWrapper.uid),
                  take(1)
                )
                .subscribe((_) => this.getTitleParams([child]));
            }
          })
      );
    }
  }

  private getTitleParams(
    children: QueryList<ComponentWrapperDirective> | ComponentWrapperDirective[]
  ) {
    children.forEach((comp) => {
      if (comp.cmpRef && comp.cmpRef.instance.tabTitleParam$) {
        this.tabTitleParams.push(comp.cmpRef.instance.tabTitleParam$);
      } else {
        this.tabTitleParams.push(null);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
