import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Facet } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { DialogMode, FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet-dialog',
  templateUrl: './facet-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetDialogComponent {
  /**
   * Indicates that the facet navigation is rendered in dialog
   * often a modal or sidenav.
   */
  protected _dialogMode: DialogMode;
  @Input()
  set dialogMode(dialogMode: DialogMode) {
    this._dialogMode = dialogMode;
    this.facetList$ = this.facetService
      .getFacetList(dialogMode)
      .pipe(tap(facetList => this.load.emit(facetList)));
  }

  get dialogMode() {
    return this._dialogMode;
  }

  /** Emits the FacetList when it's (re)loaded */
  @Output() load = new EventEmitter<FacetList>();

  /** Emits when the dialog must close */
  @Output() close = new EventEmitter();

  /** The list of all facet and values related to the products in the list */
  facetList$: Observable<FacetList>;

  iconTypes = ICON_TYPE;

  constructor(protected facetService: FacetService) {}

  get requiresDialog(): boolean {
    return this.dialogMode === DialogMode.POP;
  }

  /**
   * Expands the facet group in case it is not expanded.
   */
  expandFacetGroup(facet: Facet) {
    if (!this.facetService.getState(facet).value.expanded) {
      this.facetService.toggleExpand(facet, true);
    }
  }
}
