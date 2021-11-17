import { AbstractControl } from '@angular/forms';

export function createCodeForEntityName(
  name: AbstractControl,
  code: AbstractControl
): void {
  if (!code.value) {
    const codeFromName = name.value?.replace(/\s+/g, '-').toLowerCase();
    code.patchValue(codeFromName);
  }
}
