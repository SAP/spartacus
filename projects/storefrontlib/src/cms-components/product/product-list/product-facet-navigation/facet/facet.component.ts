import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Facet, FacetValue } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacetCollapseState, FacetService } from '../facet.service';

@Component({
  selector: 'cx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetComponent {
  facet: Facet;

  state$: Observable<FacetCollapseState>;

  @HostBinding('tabIndex') tabIndex = 0;
  @HostBinding('class.expanded') isExpanded: boolean;
  @HostBinding('class.multi-select') isMultiSelect: boolean;

  @ViewChildren('facetValue') values: QueryList<ElementRef<HTMLElement>>;

  @ViewChildren('facetValue') set content(
    content: QueryList<ElementRef<HTMLElement>>
  ) {
    this.handleFocus();
    // console.log('focus?');
    // if (this.facetService.focussed && this.facetService.focussed.value) {
    //   const value = this.facetService.focussed.value;
    //   const index = content.toArray().findIndex(el => {
    //     return (el.nativeElement as HTMLElement).innerText.includes(value);
    //   });
    //   console.log('add focus for', index, value);
    //   if (index > -1 && content.toArray().length > 0) {
    //     content.toArray()[index].nativeElement.focus();
    //   }
    // }
  }

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  protected onEvent = () => {
    // order matters!

    // force the first value to be opened
    this.facetService.storeFocus(this.facet, this.facet.values[0]);
    this.facetService.toggleGroup(this.facet, true);

    // this.values.toArray()[0].nativeElement.focus();
  };

  @HostListener('focus')
  protected onFocus = () => this.facetService.clearFocus();

  @HostListener('keydown.escape', ['$event'])
  protected onEscape = (ev: MouseEvent) =>
    (ev.target as HTMLElement).parentElement.focus();

  @Input('facet') set facetFn(value: Facet) {
    this.isMultiSelect = value.multiSelect;
    this.facet = value;

    const state$ = this.facetService.getState(value, true);
    // should not be needed, but somehow tabbing into the observable below doesn't work first time...
    this.isExpanded = state$.value.expanded;

    this.state$ = state$.pipe(
      tap(state => {
        this.isExpanded = state.expanded;
        this.handleFocus();
      })
    );
  }

  constructor(private facetService: FacetService) {}

  increaseCount(): void {
    this.facetService.increaseVisible(this.facet);
  }

  decreaseCount(): void {
    this.facetService.decreaseVisible(this.facet);
  }

  getLinkParams(value: FacetValue) {
    return this.facetService.getLinkParams(value.query.query.value);
  }

  clickValueHandler(value: FacetValue, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.facetService.storeFocus(this.facet, value);
  }

  getIndex(state: FacetCollapseState): number {
    return state.focussed ? 0 : -1;
  }

  private handleFocus() {
    if (this.facetService.focussed && this.facetService.focussed.value) {
      console.log('focus now', this.facet.name, this.facetService.focussed);
      const values = this.values.toArray();
      const value = this.facetService.focussed.value;
      const index = values.findIndex(el => {
        return (el.nativeElement as HTMLElement).innerText.includes(value);
      });
      console.log('add focus for', index, value);
      if (index > -1 && values.length > 0) {
        values[index].nativeElement.focus();
      }
    }
  }
}
