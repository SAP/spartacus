import { CustomerListsPage } from "@spartacus/asm/root";
import { Command, CommandService, CommandStrategy } from "@spartacus/core";
import { AsmQueryService } from "./asm-query.service";


export class CustomerCommandService {

  customerListsCommand$: Command<void, CustomerListsPage> = this.commandService.create(
    () => this.asmQueryService.getCustomerLists(),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(protected asmQueryService: AsmQueryService, protected commandService: CommandService) {
  }

  getCustomerLists() {
    return this.customerListsCommand$.execute();
  }
}
