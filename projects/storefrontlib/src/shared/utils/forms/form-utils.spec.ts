import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from './form-utils';

describe('FormUtils', () => {
  describe('isNotValidField', () => {
    describe('when a form control name is NOT valid', () => {
      describe('and when the form was submitted', () => {
        it('should return true', () => {
          const form = new FormGroup({
            name: new FormControl('', Validators.required),
          });

          const result = FormUtils.isNotValidField(form, 'name', true);
          expect(result).toEqual(true);
        });
      });

      describe('and when the form was NOT submitted', () => {
        it('should return false regardless if the form control is touched', () => {
          const form = new FormGroup({
            name: new FormControl('', Validators.required),
          });
          form.get('name').markAsTouched();

          const result = FormUtils.isNotValidField(form, 'name', false);
          expect(result).toEqual(false);
        });
        it('should return false regardless if the form control is dirty', () => {
          const form = new FormGroup({
            name: new FormControl('', Validators.required),
          });
          form.get('name').markAsDirty();

          const result = FormUtils.isNotValidField(form, 'name', false);
          expect(result).toEqual(false);
        });

        it('should return false if the form control is neither touched nor dirty', () => {
          const form = new FormGroup({
            name: new FormControl('', Validators.required),
          });

          const result = FormUtils.isNotValidField(form, 'name', false);
          expect(result).toEqual(false);
        });
      });
    });

    describe('when a form control name is valid', () => {
      it('should return false', () => {
        const form = new FormGroup({
          name: new FormControl('xxx', Validators.required),
        });

        const result = FormUtils.isNotValidField(form, 'name', true);
        expect(result).toEqual(false);
      });

      describe('and when the form is submitted', () => {
        it('should return false', () => {
          const form = new FormGroup({
            name: new FormControl('xxx', Validators.required),
          });

          const result = FormUtils.isNotValidField(form, 'name', false);
          expect(result).toEqual(false);
        });
      });

      describe('and when the field is dirty', () => {
        it('should return false', () => {
          const form = new FormGroup({
            name: new FormControl('xxx', Validators.required),
          });
          form.get('name').markAsDirty();

          const result = FormUtils.isNotValidField(form, 'name', true);
          expect(result).toEqual(false);
        });
      });

      describe('and when the field is touched', () => {
        it('should return false', () => {
          const form = new FormGroup({
            name: new FormControl('xxx', Validators.required),
          });
          form.get('name').markAsTouched();

          const result = FormUtils.isNotValidField(form, 'name', true);
          expect(result).toEqual(false);
        });
      });
    });
  });
});
