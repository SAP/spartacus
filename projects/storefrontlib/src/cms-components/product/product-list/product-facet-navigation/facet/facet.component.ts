import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';
import { Facet, FacetValue } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetComponent {
  protected _facet: Facet;

  state$: Observable<FacetCollapseState>;

  /** configurable icon that is used to collapse the facet group  */
  @Input() expandIcon: ICON_TYPE = ICON_TYPE.EXPAND;
  @Input() collapseIcon: ICON_TYPE = ICON_TYPE.COLLAPSE;

  @HostBinding('class.expanded') isExpanded: boolean;
  @HostBinding('class.multi-select') isMultiSelect: boolean;

  @Input()
  set facet(value: Facet) {
    this._facet = value;
    this.isMultiSelect = !!value.multiSelect;

    const state$ = this.facetService.getState(value);
    // the initial observed state doesn't work without this...
    this.isExpanded = state$.value.expanded; // ?? state$.value.expandByDefault;
    this.state$ = state$.pipe(
      tap(state => (this.isExpanded = state.expanded)) // ?? state.expandByDefault))
    );
  }

  get facet(): Facet {
    return this._facet;
  }

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef<HTMLElement>
  ) {}

  /**
   * Handles clicking the heading of the facet group, which means toggling the visibility
   * of the group (collapse / expand) and optionally focusing the group.
   */
  toggleGroup(event: UIEvent) {
    const host: HTMLElement = this.elementRef.nativeElement;
    const isLocked = host.classList.contains('is-locked');

    if (!isLocked || this.isExpanded) {
      this.facetService.toggleExpand(this.facet);
      host.focus();
      // we stop propagating the event as otherwise the focus on the host will trigger
      // an unlock event from the LockFocus directive.
      event.stopPropagation();
    } else {
      this.facetService.toggleExpand(this.facet, true);
    }
  }

  increaseVisibleValues(): void {
    this.facetService.increaseVisibleValues(this.facet);
  }

  decreaseVisibleValues(): void {
    this.facetService.decreaseVisibleValues(this.facet);
  }

  getLinkParams(value: FacetValue) {
    return this.facetService.getLinkParams(value.query.query.value);
  }
}
