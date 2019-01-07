import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent implements OnInit, AfterViewChecked {
  entry$: Observable<any>;
  cart$: Observable<any>;
  loaded$: Observable<boolean>;
  quantity = 0;
  previousLoadedState;
  finishedLoading;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.loaded$.subscribe(res => {
      if (this.previousLoadedState !== res) {
        this.finishedLoading = this.previousLoadedState === false;
        this.previousLoadedState = res;
      }
    });
  }

  ngAfterViewChecked() {
    if (this.finishedLoading) {
      this.finishedLoading = false;

      const elementToFocus = this.dialog.nativeElement
        ? (this.dialog.nativeElement.querySelector(
            `[ngbAutofocus]`
          ) as HTMLElement)
        : undefined;

      if (elementToFocus) {
        elementToFocus.focus();
      }
    }
  }
}
