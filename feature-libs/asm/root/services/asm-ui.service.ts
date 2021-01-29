import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsmUi } from '../models/asm.models';

@Injectable({
  providedIn: 'root',
})
export class AsmUiService {
  protected asmUiState$: BehaviorSubject<AsmUi> = new BehaviorSubject<AsmUi>({
    collapsed: false,
  });
  /**
   * Updates the state of the ASM UI
   */
  updateAsmUiState(asmUi: AsmUi): void {
    this.asmUiState$.next(asmUi);
  }

  /**
   * Get the state of the ASM UI
   */
  getAsmUiState(): Observable<AsmUi> {
    return this.asmUiState$.asObservable();
  }
}
