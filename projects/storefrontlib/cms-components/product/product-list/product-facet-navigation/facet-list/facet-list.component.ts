import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Facet } from '@spartacus/core';
import { Tab, TabConfig, TAB_MODE } from '../../../../content/tab/Tab';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FocusConfig } from '../../../../../layout/a11y/keyboard-focus/index';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetGroupCollapsedState, FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet-list',
  templateUrl: './facet-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetListComponent implements AfterViewInit {
  private _isDialog: boolean;
  /**
   * Indicates that the facet navigation is rendered in dialog.
   */
  @Input()
  set isDialog(value: boolean) {
    this._isDialog = value;
    if (value) {
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  get isDialog(): boolean {
    return this._isDialog;
  }

  @ViewChildren('facetsRef') facetsRef: QueryList<TemplateRef<any>>;

  /** Emits when the list must close */
  @Output() closeList = new EventEmitter();

  /** The list of all facet and values related to the products in the list */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  iconTypes = ICON_TYPE;

  dialogFocusConfig: FocusConfig = {
    trap: true,
    block: true,
    focusOnEscape: true,
    autofocus: 'cx-facet',
  };

  tabConfig: TabConfig = {
    label: 'Product Facets',
    mode: TAB_MODE.ACCORDIAN,
    openTabs: [0],
  };
  
  tabs$: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);

  @HostListener('click') handleClick() {
    this.close();
  }

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.renderFacets();
  }

  renderFacets(): void {
    combineLatest([this.facetsRef.changes, this.facetList$])
      .pipe(take(1))
      .subscribe(([templates, list]) => {
        const facets = list.facets;
        const tabs = [];
        for (let i = 0; i < facets?.length; i++) {
          tabs.push({
            header: facets[i].name ?? 'unnamed',
            content: templates?._results[i],
          });
        }

        this.tabs$.next(tabs);
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Toggles the facet group in case it is not expanded.
   */
  expandFacetGroup(facet: Facet, ref: FacetComponent) {
    if (!ref.isExpanded) {
      this.facetService.toggle(facet, ref.isExpanded);
    }
  }

  /**
   * Indicates that the facet group has been expanded.
   */
  isExpanded(facet: Facet): Observable<boolean> {
    return this.facetService
      .getState(facet)
      .pipe(
        map((value) => value.toggled === FacetGroupCollapsedState.EXPANDED)
      );
  }

  /**
   * Indicates that the facet group has been collapsed.
   */
  isCollapsed(facet: Facet): Observable<boolean> {
    return this.facetService
      .getState(facet)
      .pipe(
        map((value) => value.toggled === FacetGroupCollapsedState.COLLAPSED)
      );
  }

  close(event?: boolean): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.closeList.emit(event);
  }

  block(event?: MouseEvent) {
    event.stopPropagation();
  }
}
