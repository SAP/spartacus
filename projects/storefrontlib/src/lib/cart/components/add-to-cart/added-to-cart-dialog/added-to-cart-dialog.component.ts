import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'y-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
  styleUrls: ['./added-to-cart-dialog.component.scss']
})
export class AddedToCartDialogComponent implements OnInit {
  entry$: Observable<any>;
  cart$: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<AddedToCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.entry$ = this.data.entry$;
    this.cart$ = this.data.cart$;

    this.cart$.subscribe(result => console.log('cart', result));
    this.entry$.subscribe(result => console.log('entry', result));
  }
}
