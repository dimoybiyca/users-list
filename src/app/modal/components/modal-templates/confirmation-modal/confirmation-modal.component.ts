import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TModalConfirmationResult } from 'app/modal/types/modal-confirmation-result.type';
import { TConfirmationModalData } from 'app/modal/components/modal-templates/confirmation-modal/confirmation-modal-data.type';
import { ModalRef } from 'app/modal/data/modal-ref';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'ul-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class ConfirmationModalComponent implements OnInit {
  private modalRef: ModalRef<TModalConfirmationResult> = inject(ModalRef);

  data!: TConfirmationModalData;

  ngOnInit(): void {
    this.data = this.modalRef?.data || null;
  }

  onSubmit(): void {
    this.modalRef?.close({ confirmed: true });
  }

  onCancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.modalRef?.close({ confirmed: false });
  }
}
