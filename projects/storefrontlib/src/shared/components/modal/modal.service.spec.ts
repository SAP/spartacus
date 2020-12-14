import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let modalService: ModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });
    modalService = TestBed.inject(ModalService);
  });

  it('should ModalService is injected', () => {
    expect(modalService).toBeTruthy();
  });

  it('should have active modal after opening it', () => {
    modalService.open('a');
    expect(modalService.getActiveModal()).toBeDefined();
  });

  it('should not have active modal after dismissing it', (done) => {
    const modal = modalService.open('a');
    modal.result.catch((reason) => {
      expect(reason).toEqual('dismiss_reason');
      expect(modalService.getActiveModal()).toBeNull();
      done();
    });
    modalService.dismissActiveModal('dismiss_reason');
  });

  it('should not have active modal after closing it', (done) => {
    const modal = modalService.open('a');
    modal.result.then((reason) => {
      expect(reason).toEqual('close_reason');
      expect(modalService.getActiveModal()).toBeNull();
      done();
    });
    modalService.closeActiveModal('close_reason');
  });

  it('should not have active modal when it is closed by backdrop click or esc key', (done) => {
    const modal = modalService.open('a');
    modal.result.catch((reason) => {
      expect(reason).toEqual('backdrop_click');
      expect(modalService.getActiveModal()).toBeNull();
      done();
    });
    modal.dismiss('backdrop_click');
  });
});
