import { Injectable } from "@angular/core";
import { List } from "../models/list";

const LOCAL_STORAGE_KEY = 'lists';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private readonly lists: List[];

  public constructor() {
    this.lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }

  public allLists(): List[] {
    return this.lists;
  }

  public createList(name: string) {
    this.lists.push({ name, sections: [{ name: '', items: [{ description: '', completed: false }] }] });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.lists));
  }

  public writeLists() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.lists));
  }

  public deleteList(list: List) {
    const index = this.lists.indexOf(list);
    this.lists.splice(index, 1);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.lists));
  }
}
