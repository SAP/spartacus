import { Injectable } from '@angular/core';
import { AsmFacadeService, BindCartOptions } from '@spartacus/asm/root';
import { Command, CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors/asm.connector';

@Injectable()
export class AsmQueryService implements AsmFacadeService {
  protected bindCartCommand$: Command<BindCartOptions> =
    this.commandService.create((options: BindCartOptions) =>
      this.asmConnector.bindCart(options)
    );

  constructor(
    protected commandService: CommandService,
    protected asmConnector: AsmConnector
  ) {}

  bindCart(options: BindCartOptions): Observable<unknown> {
    return this.bindCartCommand$.execute(options);
  }
}
