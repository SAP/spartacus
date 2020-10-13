import { FormBuilder, FormControl } from '@angular/forms';
import { FormUtils } from './form-utils';

describe('FormUtils', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
  });

  describe('deepUpdateValueAndValidity', () => {
    describe('for any form control', () => {
      it('should call #updateValueAndValidity', () => {
        const control = new FormControl();
        spyOn(control, 'updateValueAndValidity');

        FormUtils.deepUpdateValueAndValidity(control);

        expect(control.updateValueAndValidity).toHaveBeenCalledWith({
          onlySelf: true,
          emitEvent: undefined,
        });
      });

      it('should call #updateValueAndValidity with `emitEvent` false', () => {
        const control = new FormControl();
        spyOn(control, 'updateValueAndValidity');

        FormUtils.deepUpdateValueAndValidity(control, { emitEvent: false });

        expect(control.updateValueAndValidity).toHaveBeenCalledWith({
          onlySelf: true,
          emitEvent: false,
        });
      });
    });

    describe('for `FormGroup`', () => {
      it('should call #updateValueAndValidity for all descendants of `FormGroup`', () => {
        const control = fb.group({
          person: fb.group({ name: '', age: '' }),
        });
        spyOn(control, 'updateValueAndValidity');

        spyOn(control.get('person'), 'updateValueAndValidity');
        spyOn(control.get('person').get('name'), 'updateValueAndValidity');
        spyOn(control.get('person').get('age'), 'updateValueAndValidity');

        FormUtils.deepUpdateValueAndValidity(control);

        const expectedOptions = {
          onlySelf: true,
          emitEvent: undefined,
        };

        // root
        expect(control.updateValueAndValidity).toHaveBeenCalledWith(
          expectedOptions
        );

        // person
        expect(
          control.get('person').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);
        expect(
          control.get('person').get('name').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);
        expect(
          control.get('person').get('age').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);
      });

      it('should call #updateValueAndValidity for all descendants with `emitEvent` false', () => {
        const control = fb.group({
          person: fb.group({ name: '', age: '' }),
        });
        spyOn(control.get('person').get('age'), 'updateValueAndValidity');

        FormUtils.deepUpdateValueAndValidity(control, { emitEvent: false });

        expect(
          control.get('person').get('age').updateValueAndValidity
        ).toHaveBeenCalledWith({
          onlySelf: true,
          emitEvent: false,
        });
      });
    });

    describe('for `FormArray`', () => {
      it('should call #updateValueAndValidity for all descendants of `FormArray`', () => {
        const control = fb.array([
          fb.group({ name: '', age: '' }),
          fb.group({ name: '', age: '' }),
        ]);

        spyOn(control, 'updateValueAndValidity');

        spyOn(control.get('0'), 'updateValueAndValidity');
        spyOn(control.get('0').get('name'), 'updateValueAndValidity');
        spyOn(control.get('0').get('age'), 'updateValueAndValidity');

        spyOn(control.get('1'), 'updateValueAndValidity');
        spyOn(control.get('1').get('name'), 'updateValueAndValidity');
        spyOn(control.get('1').get('age'), 'updateValueAndValidity');

        FormUtils.deepUpdateValueAndValidity(control);

        const expectedOptions = {
          onlySelf: true,
          emitEvent: undefined,
        };

        // root
        expect(control.updateValueAndValidity).toHaveBeenCalledWith(
          expectedOptions
        );

        // 0
        expect(control.get('0').updateValueAndValidity).toHaveBeenCalledWith(
          expectedOptions
        );
        expect(
          control.get('0').get('name').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);
        expect(
          control.get('0').get('age').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);

        // 1
        expect(control.get('1').updateValueAndValidity).toHaveBeenCalledWith(
          expectedOptions
        );
        expect(
          control.get('1').get('name').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);
        expect(
          control.get('1').get('age').updateValueAndValidity
        ).toHaveBeenCalledWith(expectedOptions);
      });
    });

    it('should call #updateValueAndValidity for all descendants with `emitEvent` false', () => {
      const control = fb.array([
        fb.group({ name: '', age: '' }),
        fb.group({ name: '', age: '' }),
      ]);
      spyOn(control.get('0').get('age'), 'updateValueAndValidity');

      FormUtils.deepUpdateValueAndValidity(control, { emitEvent: false });

      expect(
        control.get('0').get('age').updateValueAndValidity
      ).toHaveBeenCalledWith({
        onlySelf: true,
        emitEvent: false,
      });
    });
  });
});
