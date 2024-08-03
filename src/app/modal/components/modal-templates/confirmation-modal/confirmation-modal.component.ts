import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ModalRef } from '../../../data/modal-ref';
import { TConfirmationModalData } from './confirmation-modal-data.type';

@Component({
  selector: 'ul-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class ConfirmationModalComponent implements OnInit {
  private modalRef: ModalRef = inject(ModalRef);

  data!: TConfirmationModalData;

  ngOnInit(): void {
    this.data = this.modalRef?.data || null;
  }

  onSubmit(): void {
    this.modalRef?.close({ confirmed: true });
  }

  onCancel(): void {
    this.modalRef?.close({ confirmed: false });
  }

  closeModal(): void {
    this.modalRef?.close(null);
  }
}
