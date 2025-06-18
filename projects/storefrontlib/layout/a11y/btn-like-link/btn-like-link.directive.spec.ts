import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BtnLikeLinkDirective } from './btn-like-link.directive';
import { BtnLikeLinkModule } from './btn-like-link.module';

export const Mock = {
  clickHandler: function (_value: string) {},
};

@Component({
  template: `
    <a class="btn affected-link" cxBtnLikeLink (click)="onClick('Affected')">
      Affected Link
    </a>
    <a class="unaffected-link" cxBtnLikeLink (click)="onClick('Unaffected')">
      Unaffected Link 1
    </a>
    <a class="btn unaffected-link" (click)="onClick('Unaffected')">
      Unaffected Link 2
    </a>
  `,
  standalone: false,
})
class TestContainerComponent {
  onClick(value: string) {
    Mock.clickHandler(value);
  }
}

describe('BtnLikeLinkDirective', () => {
  let fixture: ComponentFixture<TestContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BtnLikeLinkModule],
      declarations: [BtnLikeLinkDirective, TestContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContainerComponent);
  });

  it('should react on enter and spacebar clicks', () => {
    const onClickSpy = spyOn(
      fixture.componentInstance,
      'onClick'
    ).and.callThrough();
    const mockClickHandlerSpy = spyOn(Mock, 'clickHandler').and.callThrough();

    const affectedLink = fixture.debugElement.query(By.css('.affected-link'));
    const unaffectedLink1 = fixture.debugElement.query(
      By.css('.unaffected-link:not(.btn)')
    );
    const unaffectedLink2 = fixture.debugElement.query(
      By.css('.unaffected-link.btn')
    );

    const event = new KeyboardEvent('keydown', {
      key: ' ',
      code: 'Space',
      keyCode: 32, // deprecated but sometimes necessary for certain checks
      charCode: 32,
      bubbles: true,
    });

    affectedLink.nativeElement.dispatchEvent(event);
    unaffectedLink1.nativeElement.dispatchEvent(event);
    unaffectedLink2.nativeElement.dispatchEvent(event);

    fixture.detectChanges();

    // Verify role button existance!
    expect(affectedLink.attributes['role']).toBe('button');
    expect(unaffectedLink1.attributes['role']).toBe(undefined);
    expect(unaffectedLink2.attributes['role']).toBe(undefined);

    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenCalledWith('Affected');
    expect(mockClickHandlerSpy).toHaveBeenCalledTimes(1);
    expect(mockClickHandlerSpy).toHaveBeenCalledWith('Affected');
  });
});
