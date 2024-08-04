import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { TableCellSelectComponent } from 'app/main/components/table-cell-select/table-cell-select.component';
import { TableCellComponent } from 'app/main/components/table-cell/table-cell.component';
import { TableService } from 'app/main/services/table-service/table.service';
import { MainStore } from 'app/main/store/main.store';
import { TAddEditUserModalData } from 'app/modal/components/modal-templates/add-edit-user-modal/add-edit-user-modal-data.type';
import { AddEditUserModalComponent } from 'app/modal/components/modal-templates/add-edit-user-modal/add-edit-user-modal.component';
import { TConfirmationModalData } from 'app/modal/components/modal-templates/confirmation-modal/confirmation-modal-data.type';
import { ConfirmationModalComponent } from 'app/modal/components/modal-templates/confirmation-modal/confirmation-modal.component';
import { ModalService } from 'app/modal/services/modal/modal.service';
import { TModalConfirmationResult } from 'app/modal/types/modal-confirmation-result.type';
import { phoneMask } from 'app/shared/data/masks';
import { UkrainianCities } from 'app/shared/data/ukrainian-cities';
import { TUser } from 'app/shared/types/user.type';
import { take } from 'rxjs';

@Component({
  selector: 'ul-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableCellComponent, ScrollingModule, TableCellSelectComponent],
})
export class UsersTableComponent {
  @Input() users: TUser[] = [];

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  private modalService: ModalService = inject(ModalService);
  private tableService: TableService = inject(TableService);

  store = inject(MainStore);
  currentSearchQuery: string = '';
  cities: string[] = UkrainianCities;
  phoneMask: string = phoneMask;

  constructor() {
    effect(
      () => {
        if (this.currentSearchQuery !== this.store.searchQuery()) {
          this.currentSearchQuery = this.store.searchQuery();
          this.tableService.onCancelEdit();
        }
      },
      { allowSignalWrites: true }
    );
  }

  onEditUser(user: TUser): void {
    const data: TAddEditUserModalData = {
      isEdit: true,
      user,
    };

    const modalRef = this.modalService.openModal<TUser>(
      AddEditUserModalComponent,
      data
    );

    modalRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result.data) {
          this.store.updateUser(result.data);
        }
      });
  }

  onDeleteUser(id: string): void {
    const data: TConfirmationModalData = {
      message: 'Are you sure you want to delete this user?',
    };
    const modalRef = this.modalService.openModal<TModalConfirmationResult>(
      ConfirmationModalComponent,
      data
    );

    modalRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result.data?.confirmed) {
          this.store.deleteUser(id);
        }
      });
  }

  trackByUserId(index: number, user: TUser): string {
    return user.id;
  }

  inverseOfTranslation(): string {
    if (!this.viewport) {
      return '-0px';
    }
    const offset = this.viewport.getOffsetToRenderedContentStart();

    return `-${offset}px`;
  }
}
