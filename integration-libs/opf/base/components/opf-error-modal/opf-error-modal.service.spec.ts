import { TestBed } from '@angular/core/testing';
import { TranslationService } from '@spartacus/core';
import {
  ErrorDialogOptions,
  defaultErrorDialogOptions,
} from '@spartacus/opf/base/root';
import { Observable, of } from 'rxjs';
import { OpfErrorModalService } from './opf-error-modal.service';

class MockTranslationService {
  translate(key: string, replacement?: any): Observable<string> {
    if (key.includes('fail')) {
      return of('');
    } else {
      return of(replacement ? `${key} and ${replacement}` : key);
    }
  }
}

let mockDialogOptionsWithKeys: ErrorDialogOptions = {
  messageKey: 'opf.test.message',
  confirmKey: 'opf.test.confirm.fail',
  messageReplacements: '',
  confirmReplacements: '',
};

let mockDialogOptionsEmpty: ErrorDialogOptions = {
  messageKey: '',
  confirmKey: '',
  messageReplacements: 'rep1',
  confirmReplacements: '',
};

let mockDialogOptionsWithKeysAndReplacements: ErrorDialogOptions = {
  messageKey: 'opf.test.message',
  confirmKey: 'opf.test.confirm.fail',
  messageReplacements: 'rep1',
  confirmReplacements: 'rep2',
};

let mockDialogOptionsWithStrings: ErrorDialogOptions = {
  messageString: 'Opf Test Message',
  confirmString: 'Opf Test Confirm',
};

describe('OpfErrorModalService', () => {
  let service: OpfErrorModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    });
    service = TestBed.inject(OpfErrorModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMessageAndConfirmTranslations', () => {
    it('should translate from strings', (done) => {
      service
        .getMessageAndConfirmTranslations(mockDialogOptionsWithStrings)
        .subscribe((translation) => {
          expect(translation.message).toEqual('Opf Test Message');
          expect(translation.confirm).toEqual('Opf Test Confirm');
          done();
        });
    });

    it('should translate from keys and fallback to default when failing', (done) => {
      service
        .getMessageAndConfirmTranslations(mockDialogOptionsWithKeys)
        .subscribe((translation) => {
          expect(translation.message).toEqual('opf.test.message');
          expect(translation.confirm).toEqual(
            defaultErrorDialogOptions.confirmKey
          );
          done();
        });
    });

    it('should translate with default key when empty labels provided', (done) => {
      service
        .getMessageAndConfirmTranslations(mockDialogOptionsEmpty)
        .subscribe((translation) => {
          expect(translation.message).toEqual(
            defaultErrorDialogOptions.messageKey
          );
          expect(translation.confirm).toEqual(
            defaultErrorDialogOptions.confirmKey
          );
          done();
        });
    });

    it('should translate with replacement and fallback to default when fail', (done) => {
      service
        .getMessageAndConfirmTranslations(
          mockDialogOptionsWithKeysAndReplacements
        )
        .subscribe((translation) => {
          expect(translation.message).toEqual('opf.test.message and rep1');
          expect(translation.confirm).toEqual(
            defaultErrorDialogOptions.confirmKey
          );
        });
      done();
    });
  });
});
