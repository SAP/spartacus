import { Injectable } from '@angular/core';

@Injectable()
export class OpfScriptIdentifierService {
  protected scriptIdentifiersArr: Array<number> = [];
  protected scriptIdentifier: string;

  public get newScriptIdentifier(): string {
    this.scriptIdentifiersArr.push(this.scriptIdentifiersArr.length + 1);
    this.scriptIdentifier = String(
      this.scriptIdentifiersArr[this.scriptIdentifiersArr.length - 1]
    ).padStart(4, '0');

    return this.scriptIdentifier;
  }

  public get currentScriptIdentifier(): string {
    return this.scriptIdentifier;
  }
}
