import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsmConfig, AsmService, UserGroup } from '@spartacus/asm/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;
  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;
  modalIsOpen = false;
  loaded$: Observable<boolean>;
  selectedUserGroup: string;
  userGroups: Array<UserGroup> = [];

  constructor(
    protected modalService: ModalService,
    protected asmService: AsmService,
    protected config: AsmConfig
  ) {}

  ngOnInit(): void {
    // this.asmService.getCustomerLists();

    this.asmService
      .getCustomerLists2()
      .pipe(
        filter((queryState) => queryState.loading === false),
        map((queryState) => {
          if (queryState.data) {
            return queryState.data;
          } else {
            // TODO error ?????
          }
        })
      )
      .subscribe((customerListPage) => {
        this.userGroups = customerListPage?.userGroups ?? [];
      });
  }

  ngOnDestroy(): void {}

  onChangeCutomerLists(): void {}

  // dismissModal(reason?: any): void {
  //   this.modalService.dismissActiveModal(reason);
  // }
}
