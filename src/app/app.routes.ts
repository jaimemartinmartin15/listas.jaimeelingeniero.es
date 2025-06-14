import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { ListDetailsComponent } from '../list-details/list-details.component';
import { List } from '../models/list';
import { MyListsComponent } from '../my-lists/my-lists.component';
import { ToPathPipe } from '../pipes/to-path.pipe';
import { ListsService } from '../services/Lists.service';

function getList(listId: string | null): List | undefined {
  const listService = inject(ListsService);
  const toPathPipe = new ToPathPipe();
  return listService.allLists().find(l => toPathPipe.transform(l.name) === listId);
}

export const routes: Routes = [
  {
    path: '',
    component: MyListsComponent,
    pathMatch: 'full',
    title: 'Mis listas',
    data: { animation: 'MyLists' }
  },
  {
    path: ':listId',
    component: ListDetailsComponent,
    title: (route: ActivatedRouteSnapshot) => `${getList(route.paramMap.get('listId'))?.name} | Mis listas`,
    canActivate: [
      (route) => getList(route.paramMap.get('listId')) ? true : inject(Router).createUrlTree(['/'])
    ],
    data: { animation: 'ListDetails' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
