import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { CommonQuoteTestUtilsService } from '../../testing/common-quote-test-utils.service';
import {
  EditCard,
  QuoteDetailsEditComponent,
} from './quote-details-edit.component';

const mockCard: EditCard = {
  title: 'Edit card title',
  paragraphs: [
    { title: 'name', text: 'text1' },
    {
      title: 'description',
      text: 'text2',
      isTextArea: true,
      charactersLimit: 255,
    },
  ],
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('QuoteDetailsEditComponent', () => {
  let fixture: ComponentFixture<QuoteDetailsEditComponent>;
  let component: QuoteDetailsEditComponent;
  let htmlElem: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [QuoteDetailsEditComponent, MockCxIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteDetailsEditComponent);
    htmlElem = fixture.nativeElement;
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.content = mockCard;
    fixture.detectChanges();

    spyOn(component.editCard, 'emit').and.callThrough();
    spyOn(component.cancelCard, 'emit').and.callThrough();
  });

  it('should create and render component accordingly', () => {
    expect(component).toBeTruthy();

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-card'
    );

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-card-edit'
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-card-title',
      mockCard.title
    );

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-card-container'
    );

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-card-label-container'
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-card-paragraph',
      mockCard.paragraphs.length
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-card-paragraph-title',
      mockCard.paragraphs.length
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.form-group',
      mockCard.paragraphs.length
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'input',
      1
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'textarea',
      1
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-card-paragraph-title',
      mockCard.paragraphs[1].title,
      1
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-card-paragraph-info-text',
      'quote.details.charactersLeft count:250'
    );

    CommonQuoteTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-card-button-container'
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.btn-tertiary',
      'common.cancel'
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.btn-secondary',
      'common.save'
    );
  });

  it('should handle cancel action', () => {
    const cancelButton = CommonQuoteTestUtilsService.getNativeElement(
      debugElement,
      'button.btn-tertiary'
    );
    cancelButton.click();
    expect(component.cancelCard.emit).toHaveBeenCalled();
    expect(component.cancelCard.emit).toHaveBeenCalledWith(false);
  });

  it('should handle edit action', () => {
    const newTextForTitle1: any = 'New title for name';
    const newTextForTitle2: any = 'Here could be found a long description';
    component.editForm.get('name')?.setValue(newTextForTitle1);
    component.editForm.get('name')?.markAsTouched();
    component.editForm.get('description')?.setValue(newTextForTitle2);
    component.editForm.get('description')?.markAsTouched();
    fixture.detectChanges();
    const saveButton = CommonQuoteTestUtilsService.getNativeElement(
      debugElement,
      'button.btn-secondary'
    );
    saveButton.click();
    expect(component.editCard.emit).toHaveBeenCalled();
    let arg: any = (component.editCard.emit as any).calls.mostRecent().args[0];
    expect(arg.editMode).toEqual(false);
    expect(arg.name).toEqual(newTextForTitle1);
    expect(arg.description).toEqual(newTextForTitle2);
  });

  describe('setFormControlName', () => {
    it('should return form control name converted to lower case', () => {
      let name = 'TeSt';
      let convertedName = name.toLocaleLowerCase();
      expect(component['setFormControlName'](name)).toBe(convertedName);

      name = 'TEST';
      convertedName = name.toLocaleLowerCase();
      expect(component['setFormControlName'](name)).toBe(convertedName);
    });
  });

  describe('getCharactersLeft', () => {
    function setValue(formControlName: string, value: any): void {
      component.editForm.get(formControlName)?.setValue(value);
      component.editForm.get(formControlName)?.markAsTouched();
      fixture.detectChanges();
    }

    it('should calculate left characters', () => {
      const formControlName = 'description';
      setValue(formControlName, 'New title for name');

      if (component.content.paragraphs[1].charactersLimit) {
        let charactersLeft =
          component.content.paragraphs[1].charactersLimit -
          component.editForm.get(formControlName)?.value?.length;
        expect(
          component['getCharactersLeft'](
            component.content.paragraphs[1].title,
            component.content.paragraphs[1].charactersLimit
          )
        ).toBe(charactersLeft);

        charactersLeft =
          component.content.paragraphs[1].charactersLimit -
          component.editForm.get(formControlName)?.value?.length;
        expect(
          component['getCharactersLeft'](
            component.content.paragraphs[1].title,
            component.content.paragraphs[1].charactersLimit
          )
        ).toBe(charactersLeft);

        setValue(formControlName, '');

        charactersLeft =
          component.content.paragraphs[1].charactersLimit -
          component.editForm.get(formControlName)?.value?.length;
        expect(
          component['getCharactersLeft'](
            component.content.paragraphs[1].title,
            component.content.paragraphs[1].charactersLimit
          )
        ).toBe(charactersLeft);
      }
    });
  });
});
