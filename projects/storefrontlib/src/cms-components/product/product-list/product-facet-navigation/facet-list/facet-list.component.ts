import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Facet } from '@spartacus/core';
import { FocusConfig } from 'projects/storefrontlib/src/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../misc/icon/icon.model';
import { DialogMode, FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';

@Component({
  selector: 'cx-facet-list',
  templateUrl: './facet-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetListComponent {
  /**
   * Indicates that the facet navigation is rendered in dialog.
   */
  @Input() dialogMode: DialogMode;

  /** Emits when the dialog must close */
  @Output() closeDialog = new EventEmitter();

  /** The list of all facet and values related to the products in the list */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  iconTypes = ICON_TYPE;

  dialogFocusConfig: FocusConfig = {
    trap: true,
    block: true,
    focusOnEscape: true,
    autofocus: 'cx-facet'
  };

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef
  ) {}

  /**
   * Toggles the facet group in case it is not expanded.
   */
  expandFacetGroup(facet: Facet, ref: FacetComponent) {
    if (!ref.isExpanded) {
      this.facetService.toggleExpand(facet);
    }
  }

  /**
   * Indicates that the facet group has been toggled, which means
   * that it's either collapsed or expanded.
   *
   * The actual expanded/collapsed experience is driven by the CSS and
   * could vary for different media queries.
   *
   */
  isToggled(facet: Facet): Observable<boolean> {
    return this.facetService.getState(facet).pipe(map(value => value.toggled));
  }

  /**
   * indicates whether this dialog is popped upo inline.
   */
  get isDialog(): boolean {
    return this.dialogMode === DialogMode.POP;
  }
}
