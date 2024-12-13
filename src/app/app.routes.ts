import { Routes } from '@angular/router';
import { UserFormComponent } from './features/user-form/user-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: UserFormComponent,
    title: 'User Feedback'
  },
  {
    path: 'submissions', 
    loadComponent: () => import('./features/submissions/submissions.component')
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
