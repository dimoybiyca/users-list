import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableService } from 'app/main/services/table-service/table.service';
import { MainStore } from 'app/main/store/main.store';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { InputValidationComponent } from 'app/shared/components/input-validation/input-validation.component';
import { InputComponent } from 'app/shared/components/input/input.component';
import { userValidators } from 'app/shared/data/user-validators';
import { TUserEditableField } from 'app/shared/types/user-editable-field.type';
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
  @Input() field!: TUserEditableField;
  @Input() user!: TUser;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  private tableService: TableService = inject(TableService);

  store = inject(MainStore);
  control!: FormControl;
  initialValue!: string;
  isEditing = signal(false);

  ngOnInit(): void {
    this.initialValue = this.user[this.field];

    this.control = new FormControl(
      this.initialValue,
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

    setTimeout(() => {
      if (this.input.nativeElement) {
        this.input.nativeElement.focus();
      }
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

  isSubmitDisabled(): boolean {
    return this.control.invalid || this.control.value === this.initialValue;
  }
}
