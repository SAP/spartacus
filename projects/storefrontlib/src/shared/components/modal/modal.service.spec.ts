import { inject, TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

// @todo: add more test after removing NgbModal-related dependencies

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });
  });

  it('should ModalService is injected', inject(
    [ModalService],
    (modalService: ModalService) => {
      expect(modalService).toBeTruthy();
    }
  ));
});
