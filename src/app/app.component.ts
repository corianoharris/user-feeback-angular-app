import { Component } from '@angular/core';
import { UserFormComponent } from './features/user-form/user-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UserFormComponent,
    CommonModule
  ],
  template: `
   <main class="min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-4">Hello, {{title}}!</h1>
  <div class="max-w-4xl mx-auto my-auto bg-white p-6 rounded-lg shadow-lg">
    <app-user-form title="User Feedback">
      <!-- If you want to pass content to the user form component -->
      <ng-container *ngIf="children">
        {{children}}
      </ng-container>
    </app-user-form>
  </div>
</main>

  `,
  styles: [`
    /* You can move the styles from the commented-out section here if needed */
    .main {
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    
    .content {
      display: flex;
      justify-content: space-around;
      width: 100%;
      max-width: 700px;
      margin-bottom: 3rem;
    }
  `]
})
export class AppComponent
{
  title = 'User Feedback';
  // Optional: if you want to pass children content
  children: string | undefined;
}
