import { Component, OnDestroy, OnInit } from '@angular/core';
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
    this.modalRef = this.modalService?.open(AsmCustomer360Component, {
      size: 'xl',
    });
    this.modalRef.componentInstance.customer = this.customer;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
