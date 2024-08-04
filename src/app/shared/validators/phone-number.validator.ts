import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function PhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    let isValidNumber: boolean = false;
    try {
      const phoneNumber: libphonenumber.PhoneNumber = phoneNumberUtil.parse(
        control.value.toString()[0] === '+'
          ? control.value.toString()
          : `+${control.value.toString()}`
      );
      isValidNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) {
      return { wrongPhone: { value: control.value } };
    }

    return isValidNumber ? null : { wrongPhone: { value: control.value } };
  };
}
