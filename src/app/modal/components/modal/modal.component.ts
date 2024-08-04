import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  HostListener,
  InjectionToken,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ModalRef } from 'app/modal/data/modal-ref';
import { ModalService } from 'app/modal/services/modal/modal.service';
import { Subject, takeUntil } from 'rxjs';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

@Component({
  selector: 'ul-modal',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  modalState: ModalRef<any>[] = [];
  modalInjectors: Injector[] = [];

  private $destroy = new Subject<void>();

  constructor(private modalService: ModalService, private injector: Injector) {}

  ngOnInit(): void {
    this.modalService
      .getModalState()
      .pipe(takeUntil(this.$destroy))
      .subscribe((modalState) => {
        if (modalState?.length) {
          this.modalInjectors = [];
          modalState.forEach((modal) => {
            this.modalInjectors.push(
              Injector.create({
                providers: [
                  {
                    provide: ModalRef,
                    useValue: modal,
                  },
                ],
                parent: this.injector,
              })
            );
          });
        }

        this.modalState = modalState;
      });
  }

  @HostListener('document:keydown.escape')
  closeModal() {
    this.modalService.closeLastModal();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
