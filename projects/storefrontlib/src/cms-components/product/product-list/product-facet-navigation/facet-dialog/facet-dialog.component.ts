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
import { FacetService } from '../facet.service';

@Component({
  selector: 'cx-facet-dialog',
  templateUrl: './facet-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetDialogComponent {
  /**
   * Indicates that the facet navigation is rendered in dialog, often a modal or sidenav.
   */
  @Input() dialogMode: DialogMode;

  /** Emits the FacetList when it's (re)loaded */
  @Output() load = new EventEmitter<FacetList>();

  /** Emits when the dialog must closed */
  @Output() close = new EventEmitter();

  /**
   * The list of all facet and values related to the products in the list.
   */
  facetList$: Observable<FacetList> = this.facetService
    .getFacetList(this.dialogMode === DialogMode.POP)
    .pipe(tap(result => this.load.emit(result)));

  iconTypes = ICON_TYPE;

  constructor(protected facetService: FacetService) {}

  get requiresDialog(): boolean {
    return this.dialogMode === DialogMode.POP;
  }

  /**
   * Collapse the facet group in case of an _unlock_ event.
   */
  collapseFacetGroup(unlockEvent: boolean, facet: Facet) {
    if (unlockEvent && !this.facetService.getState(facet).value.expanded) {
      this.facetService.toggleGroup(facet, true);
    }
  }
}
