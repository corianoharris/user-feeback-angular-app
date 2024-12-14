import { Component, inject } from '@angular/core';
import
{
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService, UserData } from '../../core/services/user-data.service';
import SubmissionsComponent from '../submissions/submissions.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SubmissionsComponent],
  template: `
    <div class="max-w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">User Feedback</h2>
      <div class="mb-4 max-w-full mx-auto mt-10 p-6 bg-white rounded-lg flex justify-between gap-10" [formGroup]="userForm">

          <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4 n flex-1">
            <div>
              <label class="block text-gray-700 font-bold mb-2" for="name">Name</label>
              <input 
                type="text" 
                id="name"
                formControlName="name"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              >
              <p *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched" 
                 class="text-red-500 text-sm mt-1">
                Name is required (min 2 characters)
              </p>
            </div>
    
            <div>
              <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
              <input 
                type="email" 
                id="email"
                formControlName="email"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              >
              <p *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" 
                 class="text-red-500 text-sm mt-1">
                Valid email is required
              </p>
            </div>
    
            <div>
              <label class="block text-gray-700 font-bold mb-2" for="message">Message</label>
              <textarea 
                id="message"
                formControlName="message"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter your message"
              ></textarea>
              <p *ngIf="userForm.get('message')?.invalid && userForm.get('message')?.touched" 
                 class="text-red-500 text-sm mt-1">
                Message is required (min 10 characters)
              </p>
            </div>
    
            <div class="flex space-x-4">
              <button 
                type="submit" 
                [disabled]="userForm.invalid || submissions().length > 5"
                class="flex-grow bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
              >
                Submit
              </button>
              <button 
                type="button"
                (click)="clearSubmissions()"
                *ngIf="submissions().length > 0 && submissions().length < 5"
                class="flex-grow bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
                [disabled]="submissions().length > 5"
                
              >
                Clear Submissions
              </button>
            </div>
          </form>

           <app-submissions></app-submissions>      
      </div>

    </div>
  `
})
export class UserFormComponent
{
  private userDataService = inject(UserDataService);
  private fb = inject(FormBuilder);

  userForm: FormGroup;
  submissions = this.userDataService.submissions;

  constructor()
  {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit()
  {
    if (this.userForm.valid)
    {
      this.userDataService.addSubmission(this.userForm.value);
      this.userForm.reset();
    }
  }

  removeSubmission(id: string)
  {
    this.userDataService.removeSubmission(id);
  }

  clearSubmissions()
  {
    this.userDataService.clearSubmissions();
  }
}

export default UserFormComponent;