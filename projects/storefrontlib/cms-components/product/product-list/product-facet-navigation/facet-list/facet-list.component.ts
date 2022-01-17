import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Tab, TabConfig, TAB_MODE } from '../../../../content/tab/Tab';
import { BehaviorSubject, Observable } from 'rxjs';
import { FacetList } from '../facet.model';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { FacetService } from '../services/facet.service';
import { filter, take } from 'rxjs/operators';

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
      this.renderFacets();
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

  tabConfig: TabConfig = {
    label: 'Product Facets',
    mode: TAB_MODE.ACCORDIAN,
    openTabs: [0],
  };

  tabs$: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>([]);

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.renderFacets();

    // Renders facets on first PLP load on desktop
    this.facetsRef.changes
      .pipe(
        take(1),
        filter((changes) => !!changes)
      )
      .subscribe(() => this.renderFacets());
  }

  renderFacets(): void {
    this.facetList$.pipe(take(1)).subscribe((list) => {
      const facets = list.facets;
      const tabs = [];

      for (let i = 0; i < facets?.length; i++) {
        tabs.push({
          header: facets[i].name ?? 'unnamed',
          content: this.facetsRef?.get(i),
        });
      }

      this.tabs$.next(tabs);
      this.changeDetectorRef.detectChanges();
    });
  }

  close(event?: boolean): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.closeList.emit(event);
  }

  block(event?: MouseEvent) {
    event.stopPropagation();
  }
}
