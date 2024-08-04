import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MainStore } from 'app/main/store/main.store';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { InputValidationComponent } from 'app/shared/components/input-validation/input-validation.component';
import { InputComponent } from 'app/shared/components/input/input.component';
import { userValidators } from 'app/shared/data/user-validators';
import { TUserEditableField } from 'app/shared/types/user-editable-field.type';
import { TUser } from 'app/shared/types/user.type';
import { NgxMaskDirective } from 'ngx-mask';

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
    NgxMaskDirective,
  ],
})
export class TableCellComponent implements OnInit {
  @Input() field!: TUserEditableField;
  @Input() user!: TUser;
  @Input() mask?: string;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  store = inject(MainStore);
  control!: FormControl;
  initialValue!: string;

  ngOnInit(): void {
    this.initialValue = this.user[this.field];

    this.control = new FormControl(
      this.initialValue,
      userValidators[this.field]
    );
  }

  onEdit(): void {
    this.store.setUserIdToEdit(this.user.id);
    this.store.setUserFieldToEdit(this.field);
    this.control.setValue(this.user[this.field]);

    setTimeout(() => {
      if (this.input?.nativeElement) {
        this.input.nativeElement.focus();
      }
    });
  }

  onSubmit(): void {
    if (this.control.invalid) {
      return;
    }

    this.cancelCellEditing();
    this.store.updateUser({ ...this.user, [this.field]: this.control.value });
  }

  onCancel(): void {
    this.cancelCellEditing();
    this.control.setValue(this.user[this.field]);
  }

  isSubmitDisabled(): boolean {
    return this.control.invalid || this.control.value === this.initialValue;
  }

  private cancelCellEditing(): void {
    this.store.setUserIdToEdit(null);
    this.store.setUserFieldToEdit(null);
  }
}
