import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsmDialogActionEvent } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { AsmCustomer360Component } from '../asm-customer-360/asm-customer-360.component';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  isCustomerEmulationSessionInProgress$: Observable<boolean>;
  protected subscription = new Subscription();
  protected modalRef: ModalRef | undefined;

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userAccountFacade: UserAccountFacade,
    protected modalService: ModalService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userAccountFacade.get().subscribe((user) => {
        if (user) this.customer = user;
      })
    );
    this.isCustomerEmulationSessionInProgress$ =
      this.asmComponentService.isCustomerEmulationSessionInProgress();
  }

  logoutCustomer() {
    this.asmComponentService.logoutCustomer();
  }

  openCustomer360() {
    this.modalRef = this.modalService?.open(AsmCustomer360Component);
    this.modalRef.componentInstance.customer = this.customer;
    this.modalRef?.result
    .then((event: AsmDialogActionEvent) => {
      this.asmComponentService.handleAsmDialogAction(event);
      this.modalRef = undefined;
    })
    .catch(() => {
      // this  callback is called when modal is closed with Esc key or clicking backdrop
      this.modalRef = undefined;
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
