import { Injectable } from "@angular/core";
import { List } from "../models/list";

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  public allLists() {
    return JSON.parse(localStorage.getItem('lists') || '[]');
  }

  public createList(name: string) {
    const existingLists: List[] = JSON.parse(localStorage.getItem('lists') || '[]');
    existingLists.push({name, sections: []});
    localStorage.setItem('lists', JSON.stringify(existingLists));
  }

  public updateList(list: List) {
    const existingLists: List[] = JSON.parse(localStorage.getItem('lists') || '[]');
    const el: List = existingLists.find(l => l.name === list.name)!;
    existingLists[existingLists.indexOf(el)] = list;
    localStorage.setItem('lists', JSON.stringify(existingLists));
  }

  public deleteList(name: string) {
    const existingLists: List[] = JSON.parse(localStorage.getItem('lists') || '[]');
    localStorage.setItem('lists', JSON.stringify(existingLists.filter(l => l.name !== name)));
  }
}
