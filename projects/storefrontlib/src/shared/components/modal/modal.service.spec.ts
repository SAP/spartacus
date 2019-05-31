import { ModalService } from './modal.service';
import { TestBed, inject } from '@angular/core/testing';

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
