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
  name: 'Quote name',
  description: 'Here you could enter a long description for the current quote',
  charactersLimit: 255,
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
      'quote.details.information'
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
      2
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.cx-card-paragraph-title',
      2
    );

    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      '.form-group',
      2
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
      'quote.details.description',
      1
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-info-text',
      'quote.details.charactersLeft count:194'
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

  describe('handle action events', () => {
    it('should emit cancel event', () => {
      const cancelButton = CommonQuoteTestUtilsService.getNativeElement(
        debugElement,
        'button.btn-tertiary'
      );
      cancelButton.click();
      expect(component.cancelCard.emit).toHaveBeenCalled();
    });

    it('should not emit edit event', () => {
      const saveButton = CommonQuoteTestUtilsService.getNativeElement(
        debugElement,
        'button.btn-secondary'
      );
      saveButton.click();
      expect(component.editCard.emit).not.toHaveBeenCalled();
    });

    it('should emit edit event', () => {
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
      let arg: any = (component.editCard.emit as any).calls.mostRecent()
        .args[0];
      expect(arg.editMode).toEqual(false);
      expect(arg.name).toEqual(newTextForTitle1);
      expect(arg.description).toEqual(newTextForTitle2);
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

      if (component.content.charactersLimit) {
        let charactersLeft =
          component.content.charactersLimit -
          component.editForm.get(formControlName)?.value?.length;
        expect(
          component['getCharactersLeft'](
            formControlName,
            component.content.charactersLimit
          )
        ).toBe(charactersLeft);

        charactersLeft =
          component.content.charactersLimit -
          component.editForm.get(formControlName)?.value?.length;
        expect(
          component['getCharactersLeft'](
            formControlName,
            component.content.charactersLimit
          )
        ).toBe(charactersLeft);

        setValue(formControlName, '');

        charactersLeft =
          component.content.charactersLimit -
          component.editForm.get(formControlName)?.value?.length;
        expect(
          component['getCharactersLeft'](
            formControlName,
            component.content.charactersLimit
          )
        ).toBe(charactersLeft);
      }
    });
  });
});
