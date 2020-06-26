import { TestBed } from '@angular/core/testing';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { FormsPersistenceService } from './forms-persistence.service';

class FormBuilderMock {
  group(
    _controlsConfig: {
      [key: string]: any;
    },
    _options?:
      | AbstractControlOptions
      | {
          [key: string]: any;
        }
      | null
  ): FormGroup {
    return null;
  }
}

fdescribe('FormsPersistenceService', () => {
  let fb: FormBuilder;
  let service: FormsPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FormBuilder, useClass: FormBuilderMock }],
    });

    service = TestBed.inject(FormsPersistenceService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    describe('when the key is not provided', () => {
      it('should create the form group', () => {
        spyOn(fb, 'group').and.stub();

        const formConfiguration = {
          firstName: '',
          lastName: '',
        };
        service.get(undefined, formConfiguration);
        expect(fb.group).toHaveBeenCalledWith(formConfiguration);
      });
    });
    describe('when the form is already persisted under the given key', () => {
      it('should just return it', () => {
        // TODO:
      });
    });
    describe('when the form does not exist under the given key', () => {
      it('should create and return it', () => {
        // TODO:
      });
      describe('and when the defaultValue is provided', () => {
        it('should patch and return it', () => {
          // TODO:
        });
      });
    });
  });

  describe('remove', () => {
    it('should remove the value for the given key', () => {
      // TODO:
    });
  });

  describe('has', () => {
    it('should return true if the value is present', () => {
      // TODO:
    });
    it('should return false if the value is not present', () => {
      // TODO:
    });
  });
});
