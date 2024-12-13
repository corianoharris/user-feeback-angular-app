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
    <main class="main">
      <div class="content">
        <app-user-form>
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
export class AppComponent {
  title(title: string)
  {
    throw new Error('Method not implemented.');
  }
  // Optional: if you want to pass children content
  children: string | undefined;
}
