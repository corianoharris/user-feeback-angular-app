import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

<div class="container flex-1  gap-10 mx-auto p-1 max-w-4xl"  *ngIf="submissions().length > 0; else null">
<div class="mb-4 flex-1 justify-between align-middle">
            <h3 class="text-xl font-bold">Recent Submissions</h3>

        
            

    <div class="container mx-auto p-1 max-w-4xl">
    
    <p class="text-gray-600 text-right">
      Showing {{ filteredSubmissions().length }} of {{ submissions().length }} submissions
    </p>
    <p class="text-sm text-gray-500 mb-2 text-right">Maximum of 5 submissions</p>
   
    
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-4 bg-gray-100 flex justify-between items-center gap-10">
       
          
          <div class="flex flex-direction-row items-center space-x-4">
            <input 
              type="text" 
              [(ngModel)]="searchTerm"
              placeholder="Search submissions..."
              class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select 
              [(ngModel)]="sortOption"
              class="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <div  class="flex flex-col gap-4 p-4 snap-y overflow-y-scroll max-h-[350px]" *ngIf="filteredSubmissions().length; else noSubmissions">
          
              <div 
                *ngFor="let submission of filteredSubmissions()" 
                class="border-b hover:bg-gray-50 transition rounded-sm shadow-md p-4"
              >
              <div class="flex flex-col gap-2">
                <p><strong>Name:</strong> {{ submission.name }}</p>
                <p><strong>Email:</strong> {{ submission.email }}</p>
                <p><strong>Message:</strong> {{ submission.message }}</p>
                <p class="text-sm text-gray-500 hover:text-gray-700">
                  Submitted: {{ submission.createdAt }}
                </p>
              </div>
              <div class="flex justify-end">
              <button 
                (click)="removeSubmission(submission.id)"
                class="text-red-500 hover:text-red-700"
                title="Remove Submission"
              >
                    🗑️ Trash
                  </button>
              </div>
          
         
        </div>
      </div>
    </div>

    <ng-template #noSubmissions>
      <div class="p-6 text-center text-gray-500">
        <p>No submissions found.</p>
        <p *ngIf="searchTerm">Try a different search term.</p>
      </div>
    </ng-template>
    </div>
  `,
  styles: [`
    .truncate {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class SubmissionsComponent
{
  private userDataService = inject(UserDataService);

  // Signals for managing submissions and filtering
  submissions = this.userDataService.submissions;
  searchTerm = signal('');
  sortOption = signal<'newest' | 'oldest' | 'name'>('newest');

  // Computed signal for filtered and sorted submissions
  filteredSubmissions = computed(() =>
  {
    let result = this.submissions();

    // Filter by search term
    if (this.searchTerm())
    {
      const searchLower = this.searchTerm().toLowerCase();
      result = result.filter(submission =>
        submission.name.toLowerCase().includes(searchLower) ||
        submission.email.toLowerCase().includes(searchLower) ||
        submission.message.toLowerCase().includes(searchLower)
      );
    }

    // Sort submissions
    switch (this.sortOption())
    {
      case 'newest':
        result = result.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        result = result.sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'name':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  });

  // Method to remove a specific submission
  removeSubmission(id: string)
  {
    const confirmed = window.confirm('Are you sure you want to remove this submission?');
    if (!confirmed)
    {
      return;
    }
    this.userDataService.removeSubmission(id);
  }

  // Method to clear all submissions
  clearAllSubmissions()
  {
    const confirmed = window.confirm('Are you sure you want to clear all submissions?');
    if (confirmed)
    {
      this.userDataService.clearSubmissions();
    }
  }
}

export default SubmissionsComponent;