import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBookService } from './address-book.service';

@Component({
  selector: 'cx-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  addresses$: Observable<any>;
  isAddressFormOpen: boolean;

  @Output()
  addAddress = new EventEmitter<any>();

  constructor(private service: AddressBookService) {}

  ngOnInit() {
    this.addresses$ = this.service.loadUserAddresses();
  }

  showAddressForm() {
    this.isAddressFormOpen = true;
  }

  hideAddressForm() {
    this.isAddressFormOpen = false;
  }

  addNewAddress(address) {
    alert('x');
    this.addAddress.emit({ address: address, newAddress: true });
  }
}
