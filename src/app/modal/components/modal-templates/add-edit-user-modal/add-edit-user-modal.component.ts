import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { UkrainianCities } from '../../../../shared/data/ukrainian-cities';
import { userValidators } from '../../../../shared/data/user-validators';
import { ModalRef } from '../../../data/modal-ref';
import { TAddEditUserModalData } from './add-edit-user-modal-data.type';

@Component({
  selector: 'ul-add-edit-user-modal',
  templateUrl: './add-edit-user-modal.component.html',
  styleUrl: './add-edit-user-modal.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgClass,
    IconComponent,
    InputComponent,
    SelectComponent,
  ],
})
export class AddEditUserModalComponent implements OnInit {
  private modalRef: ModalRef = inject(ModalRef);
  private fb: FormBuilder = inject(FormBuilder);

  data!: TAddEditUserModalData;
  userForm!: FormGroup;
  cities: string[] = UkrainianCities;

  get firstName(): FormControl<string> {
    return this.userForm.get('firstName') as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.userForm.get('lastName') as FormControl<string>;
  }

  get email(): FormControl<string> {
    return this.userForm.get('email') as FormControl<string>;
  }

  get phone(): FormControl<string> {
    return this.userForm.get('phone') as FormControl<string>;
  }

  get city(): FormControl<string> {
    return this.userForm.get('city') as FormControl<string>;
  }

  get street(): FormControl<string> {
    return this.userForm.get('street') as FormControl<string>;
  }

  get appartment(): FormControl<string> {
    return this.userForm.get('appartment') as FormControl<string>;
  }

  ngOnInit(): void {
    this.data = this.modalRef?.data || null;

    this.initForm();

    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl<string>('Test', userValidators.firstName),
      lastName: new FormControl<string>('Test', userValidators.lastName),
      email: new FormControl<string>('test@gmail.com', userValidators.email),
      phone: new FormControl<string>('380633173619', userValidators.phone),
      city: new FormControl<string>('', userValidators.city),
      street: new FormControl<string>('aa', userValidators.street),
      appartment: new FormControl<string>('12', userValidators.appartment),
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.modalRef?.close({ ...this.userForm.value, id: this.data.user?.id });
  }

  onCancel(): void {
    this.closeModal();
  }

  closeModal(): void {
    this.modalRef?.close(null);
  }
}
