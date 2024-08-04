import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchInputComponent } from 'app/main/components/search-input/search-input.component';
import { UsersTableComponent } from 'app/main/components/users-table/users-table.component';
import { MainStore } from 'app/main/store/main.store';
import { AddEditUserModalComponent } from 'app/modal/components/modal-templates/add-edit-user-modal/add-edit-user-modal.component';
import { ModalService } from 'app/modal/services/modal/modal.service';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { TUser } from 'app/shared/types/user.type';
import { take } from 'rxjs';

@Component({
  selector: 'ul-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MainStore],
  imports: [UsersTableComponent, SearchInputComponent, IconComponent],
})
export class MainComponent {
  private modalService: ModalService = inject(ModalService);
  store = inject(MainStore);

  onAddUser(): void {
    const modelRef = this.modalService.openModal<TUser>(
      AddEditUserModalComponent,
      {
        isEdit: false,
      }
    );

    modelRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result.data) {
          this.store.createUser(result.data);
        }
      });
  }

  onSearchChange(value: string): void {
    this.store.setSearchQuery(value);
  }
}
