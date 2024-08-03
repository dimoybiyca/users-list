import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableService } from 'app/main/services/table-service/table.service';
import { MainStore } from 'app/main/store/main.store';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { InputValidationComponent } from 'app/shared/components/input-validation/input-validation.component';
import { InputComponent } from 'app/shared/components/input/input.component';
import { userValidators } from 'app/shared/data/user-validators';
import { TUser } from 'app/shared/types/user.type';
import { take } from 'rxjs';

@Component({
  selector: 'ul-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    InputValidationComponent,
    NgClass,
    IconComponent,
  ],
})
export class TableCellComponent implements OnInit {
  @Input() field!: Exclude<keyof TUser, 'id'>;
  @Input() user!: TUser;

  private tableService: TableService = inject(TableService);

  store = inject(MainStore);
  control!: FormControl;
  isEditing = signal(false);

  ngOnInit(): void {
    this.control = new FormControl(
      this.user[this.field],
      userValidators[this.field]
    );
  }

  onEdit(): void {
    this.isEditing.set(true);

    this.tableService
      .onEditCell()
      .pipe(take(1))
      .subscribe(() => {
        this.onCancel();
      });
  }

  onSubmit(): void {
    if (this.control.invalid) {
      return;
    }

    this.isEditing.set(false);
    this.store.updateUser({ ...this.user, [this.field]: this.control.value });
  }

  onCancel(): void {
    this.isEditing.set(false);
    this.tableService.onCancelEdit();
    this.control.setValue(this.user[this.field]);
  }
}
