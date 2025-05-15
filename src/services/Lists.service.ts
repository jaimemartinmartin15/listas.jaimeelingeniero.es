import { Injectable } from "@angular/core";
import { List } from "../models/list";

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  public createList(name: string) {
    localStorage.setItem(name, JSON.stringify([]));
  }

  public updateList(list: List) {
    localStorage.setItem(list.name, JSON.stringify(list));
  }

  public deleteList(name: string) {
    localStorage.removeItem(name);
  }
}
