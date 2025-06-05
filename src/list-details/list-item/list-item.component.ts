import { Component, Input } from '@angular/core';
import { Item } from '../../models/list';
import { ListsService } from '../../services/Lists.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() item: Item;

  public constructor(private readonly listsService: ListsService) { }

  public onCheckItem(e: Event) {
    const input = e.target as HTMLInputElement;
    this.item.completed = input.checked;
    this.listsService.writeLists();
  }

  public onChangeName(e: Event) {
    const input = e.target as HTMLInputElement;
    this.item.description = input.value;
    this.listsService.writeLists();
  }
}
