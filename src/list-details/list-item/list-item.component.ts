import { Component, Input } from '@angular/core';
import { Item, List, Section } from '../../models/list';
import { ListsService } from '../../services/Lists.service';
import { IconsSvgModule } from '../../svg-output/icons-svg.module';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  imports: [IconsSvgModule]
})
export class ListItemComponent {
  @Input() list: List;
  @Input() section: Section;
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

  public deleteItem() {
    this.section.items.splice(this.section.items.indexOf(this.item), 1);
    this.listsService.writeLists();
  }
}
