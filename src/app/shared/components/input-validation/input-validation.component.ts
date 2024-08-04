import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IconComponent } from 'app/shared/components/icon/icon.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ul-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss',
  standalone: true,
  imports: [IconComponent],
})
export class InputValidationComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl | null = null;
  @Input() isShowAlways: boolean = false;

  private readonly ERROR_MESSAGES: Record<
    string,
    (opts: { [key: string]: string }) => string
  > = {
    required: () => 'This field is required',
    email: () => 'Invalid email',
    wrongPhone: () => 'Invalid phone number',
    minlength: (opts) =>
      `Minimal length is ${opts['requiredLength']} characters`,
    maxlength: (opts) =>
      `Maximal length is ${opts['requiredLength']} characters`,
  };
  private readonly defaultErrorMessage = 'Invalid value';
  private statusSubscription!: Subscription;

  errorMessage: string = '';

  ngOnInit(): void {
    if (!this.control) {
      return;
    }

    this.statusSubscription = this.control.statusChanges.subscribe(() => {
      this.setErrorMessage();
    });
    this.setErrorMessage();
  }

  setErrorMessage(): void {
    if (!this.control?.errors) {
      this.errorMessage = '';
      return;
    }

    const errorKey = Object.keys(this.control.errors).find(Boolean);

    if (!errorKey) {
      this.errorMessage = '';
      return;
    }

    this.errorMessage =
      this.ERROR_MESSAGES[errorKey]?.(this.control.errors[errorKey]) ||
      this.defaultErrorMessage;
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }
}
