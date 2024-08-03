import { Validators } from '@angular/forms';
import { TUserValidators } from 'app/shared/types/user-validators.type';
import { namePattern, numbersOnlyPattern } from './patterns';
import { PhoneNumberValidator } from 'app/shared/validators/phone-number.validator';

export const userValidators: TUserValidators = {
  firstName: [
    Validators.required,
    Validators.pattern(namePattern),
    Validators.minLength(2),
    Validators.maxLength(30),
  ],
  lastName: [
    Validators.required,
    Validators.pattern(namePattern),
    Validators.minLength(2),
    Validators.maxLength(30),
  ],
  email: [Validators.required, Validators.email],
  phone: [Validators.required, PhoneNumberValidator()],
  city: [Validators.required],
  street: [
    Validators.required,
    Validators.pattern(namePattern),
    Validators.minLength(2),
    Validators.maxLength(60),
  ],
  appartment: [
    Validators.pattern(numbersOnlyPattern),
    Validators.required,
    Validators.maxLength(5),
  ],
};
