import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ScriptReadyNotificationService {
  private scriptReadySource = new Subject<void>();
  public scriptReady$ = this.scriptReadySource.asObservable();

  public notifyScriptReady(): void {
    this.scriptReadySource.next();
  }
}
