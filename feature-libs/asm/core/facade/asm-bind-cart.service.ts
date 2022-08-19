import { Injectable } from '@angular/core';
import { AsmBindCartFacade, BindCartParams } from '@spartacus/asm/root';
import { Command, CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AsmConnector } from '../connectors';

@Injectable()
export class AsmBindCartService implements AsmBindCartFacade {
  constructor(
    protected commandService: CommandService,
    protected asmConnector: AsmConnector
  ) {}

  protected bindCartCommand$: Command<BindCartParams> =
    this.commandService.create((options: BindCartParams) =>
      this.asmConnector.bindCart(options)
    );

  bindCart(options: BindCartParams): Observable<unknown> {
    return this.bindCartCommand$.execute(options);
  }
}
