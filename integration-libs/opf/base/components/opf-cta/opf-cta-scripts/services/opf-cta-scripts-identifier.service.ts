import { Injectable } from '@angular/core';

@Injectable()
export class OpfScriptIdentifierService {
  protected sequenceOfIdentifiers: Array<number> = [];
  protected scriptIdentifiers: Array<string> = [];

  public get newScriptIdentifier(): string {
    const scriptIdentifier = this.generateNewScriptIdentifier();
    this.scriptIdentifiers.push(scriptIdentifier);

    return scriptIdentifier;
  }

  public get allScriptIdentifiers(): Array<string> {
    return this.scriptIdentifiers;
  }

  protected generateNewScriptIdentifier(): string {
    this.sequenceOfIdentifiers.push(this.sequenceOfIdentifiers.length + 1);

    return String(
      this.sequenceOfIdentifiers[this.sequenceOfIdentifiers.length - 1]
    ).padStart(4, '0');
  }
}
