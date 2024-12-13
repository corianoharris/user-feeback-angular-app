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

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
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
                [disabled]="userForm.invalid"
                class="flex-grow bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
              >
                Submit
              </button>
              <button 
                type="button"
                (click)="clearSubmissions()"
                *ngIf="submissions().length"
                class="flex-grow bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Clear Submissions
              </button>
            </div>
          </form>

          <div *ngIf="submissions().length" class="mt-8 flex-1 snap-y overflow-y-scroll max-h-[400px]">
            <div class="mb-4 flex justify-between align-middle">
            <div>
            <h3 class="text-xl font-bold">Recent Submissions</h3>
            <p class="text-sm text-gray-500 mb-2">Maximum of 5 submissions</p>
            </div>
             <h5 class="text-sm text-gray-500 font-bold">{{ submissions().length }} / {{''}} 5 </h5>
            </div>
           
            
            <div 
              *ngFor="let submission of submissions()" 
              class="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center shadow-md"
            >
              <div>
                <p><strong>Name:</strong> {{ submission.name }}</p>
                <p><strong>Email:</strong> {{ submission.email }}</p>
                <p><strong>Message:</strong> {{ submission.message }}</p>
                <p class="text-sm text-gray-500 hover:text-gray-700">
                  Submitted: {{ submission.createdAt }}
                </p>
              </div>
              <button 
                (click)="removeSubmission(submission.id)"
                class="text-red-500 hover:text-red-700"
                title="Remove Submission"
              >
                ❌
              </button>
            </div>
          </div>
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