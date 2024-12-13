import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
    selector: 'app-submissions',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container mx-auto p-6">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-4 bg-gray-100 flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">
            Submissions ({{ filteredSubmissions().length }})
          </h2>
          
          <div class="flex items-center space-x-4">
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

        <div *ngIf="filteredSubmissions().length; else noSubmissions">
          <table class="w-full">
            <thead class="bg-gray-200">
              <tr>
                <th class="p-3 text-left">Name</th>
                <th class="p-3 text-left">Email</th>
                <th class="p-3 text-left">Message</th>
                <th class="p-3 text-left">Submitted</th>
                <th class="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                *ngFor="let submission of filteredSubmissions()" 
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="p-3">{{ submission.name }}</td>
                <td class="p-3">{{ submission.email }}</td>
                <td class="p-3 truncate max-w-xs">{{ submission.message }}</td>
                <td class="p-3">{{ submission.createdAt }}</td>
                <td class="p-3 text-right">
                  <button 
                    (click)="removeSubmission(submission.id)"
                    class="text-red-500 hover:text-red-700 transition"
                    title="Remove Submission"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="p-4 bg-gray-100 flex justify-between items-center">
            <span class="text-gray-600">
              Showing {{ filteredSubmissions().length }} of {{ submissions().length }} submissions
            </span>
            <button 
              *ngIf="submissions().length"
              (click)="clearAllSubmissions()"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Clear All Submissions
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