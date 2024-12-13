import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators
{
    // Example of a custom validator
    static noWhitespaceValidator(): ValidatorFn
    {
        return (control: AbstractControl): ValidationErrors | null =>
        {
            const isWhitespace = (control.value || '').trim().length === 0;
            const isValid = !isWhitespace;
            return isValid ? null : { 'whitespace': true };
        };
    }

    // More custom validators can be added here
    static matchPassword(passwordKey: string, confirmPasswordKey: string): ValidatorFn
    {
        return (form: AbstractControl): ValidationErrors | null =>
        {
            const password = form.get(passwordKey);
            const confirmPassword = form.get(confirmPasswordKey);

            if (password?.value !== confirmPassword?.value)
            {
                confirmPassword?.setErrors({ passwordMismatch: true });
                return { 'passwordMismatch': true };
            }

            return null;
        };
    }
}