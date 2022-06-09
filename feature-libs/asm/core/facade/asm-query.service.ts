import { Injectable } from '@angular/core';
import { AsmFacade, BindCartParams } from '@spartacus/asm/root';
import { Command, CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';

@Injectable()
export class AsmQueryService implements AsmFacade {
  protected bindCartCommand$: Command<BindCartParams> =
    this.commandService.create((options: BindCartParams) =>
      this.asmConnector.bindCart(options)
    );

  constructor(
    protected commandService: CommandService,
    protected asmConnector: AsmConnector
  ) {}

  bindCart(options: BindCartParams): Observable<unknown> {
    return this.bindCartCommand$.execute(options);
  }
}
