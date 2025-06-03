import { Routes } from '@angular/router';
import { ListDetailsComponent } from '../list-details/list-details.component';
import { MyListsComponent } from '../my-lists/my-lists.component';

export const routes: Routes = [
  {
    path: '',
    component: MyListsComponent,
    pathMatch: 'full',
  },
  {
    path: ':listId',
    component: ListDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
