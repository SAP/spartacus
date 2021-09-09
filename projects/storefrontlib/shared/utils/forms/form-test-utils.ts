import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function clickSubmit(fixture: ComponentFixture<any>) {
  const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]'));
  submitBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
}
