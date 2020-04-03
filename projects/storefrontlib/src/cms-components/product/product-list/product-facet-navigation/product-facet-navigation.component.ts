import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout/config/layout-config';
import { DialogMode, FacetList } from './facet.model';

@Component({
  selector: 'cx-product-facet-navigation',
  templateUrl: './product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFacetNavigationComponent {
  facetList: FacetList;

  iconTypes = ICON_TYPE;

  @ViewChild('dialogTrigger') dialogTrigger: ElementRef;

  /**
   * Indicates that the navigation dialog is opened, typically used in mobile.
   */
  activeDialog: boolean;

  /**
   * Indicates that the facet navigation is rendered in dialog, often a modal or sidenav.
   */
  dialogMode$: Observable<DialogMode> = this.breakpointService
    .isDown(BREAKPOINT.md)
    .pipe(map(dialogMode => (dialogMode ? DialogMode.POP : DialogMode.INLINE)));

  constructor(protected breakpointService: BreakpointService) {}

  /**
   * The FacetList is not loaded directly in this component, so that it will
   * not be loaded regardless in the mobile experience. It's loaded in the
   * `FacetDialogComponent`, which will output the FacetList when there's an update.
   */
  updateFacetList(facetList: FacetList) {
    this.facetList = facetList;
  }

  /**
   * Indicates whether the dialog is used inline.
   */
  isInline(dialogMode): boolean {
    return dialogMode === DialogMode.INLINE;
  }

  /**
   * Opens or closes the facet dialog. This is only used in the mobile experience
   * where facets are shown in a dialog.
   *
   * If the dialog is closed, we re-focus the trigger element so that the keyboard
   * user can continue from the original location.
   */
  toggleDialog() {
    this.activeDialog = !this.activeDialog;
    if (!this.activeDialog) {
      this.dialogTrigger.nativeElement.focus();
    }
  }
}
