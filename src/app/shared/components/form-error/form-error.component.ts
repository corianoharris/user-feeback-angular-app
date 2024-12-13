// src/app/shared/components/form-error/form-error.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-form-error',
    standalone: true,
    imports: [CommonModule],
    template: `
    <ng-container *ngIf="control && control.invalid && (control.dirty || control.touched)">
      <p class="text-red-500 text-sm mt-1">
        <ng-container *ngIf="control.errors?.['required']">
          {{ label }} is required.
        </ng-container>
        <ng-container *ngIf="control.errors?.['email']">
          Please enter a valid email address.
        </ng-container>
        <ng-container *ngIf="control.errors?.['minlength']">
          {{ label }} must be at least {{ control.errors?.['minlength'].requiredLength }} characters long.
        </ng-container>
      </p>
    </ng-container>
  `
})
export class FormErrorComponent
{
    @Input() control!: AbstractControl | null;
    @Input() label: string = 'Field';
}