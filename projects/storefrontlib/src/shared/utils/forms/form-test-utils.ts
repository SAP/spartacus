import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function isCtrlShowingError(
  fixture: ComponentFixture<any>,
  formControlName: string
): boolean {
  const elementWithErrorMessage = fixture.debugElement.query(
    By.css(`input[formcontrolname="${formControlName}"] + div.invalid-feedback`)
  );

  if (!elementWithErrorMessage) {
    return false;
  }

  const errorMessage: string = elementWithErrorMessage.nativeElement.innerText;
  return errorMessage && errorMessage.trim().length > 0;
}

export function clickSubmit(fixture: ComponentFixture<any>) {
  const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]'));
  submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
}
