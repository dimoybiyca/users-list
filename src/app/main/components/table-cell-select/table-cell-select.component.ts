import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MainStore } from 'app/main/store/main.store';
import { InputValidationComponent } from 'app/shared/components/input-validation/input-validation.component';
import { TUserEditableField } from 'app/shared/types/user-editable-field.type';
import { TUser } from 'app/shared/types/user.type';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ul-table-cell-select',
  standalone: true,
  imports: [InputValidationComponent, ReactiveFormsModule],
  templateUrl: './table-cell-select.component.html',
  styleUrl: './table-cell-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellSelectComponent implements OnDestroy, OnChanges {
  @Input() field!: TUserEditableField;
  @Input() user!: TUser;
  @Input() options!: string[];

  private store = inject(MainStore);
  private $destroy = new Subject<void>();

  control!: FormControl;

  ngOnInit(): void {
    this.control = new FormControl(this.user[this.field]);

    this.control.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.store.updateUser({ ...this.user, [this.field]: this.control.value });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['user']) {
      this.control?.setValue(this.user[this.field], { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
