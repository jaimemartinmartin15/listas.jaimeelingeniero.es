import { Routes } from '@angular/router';
import { MyListsComponent } from '../my-lists/my-lists.component';

export const routes: Routes = [
  {
    path: 'mis-listas',
    component: MyListsComponent,
  },
  {
    path: '**',
    redirectTo: 'mis-listas',
  },
];
