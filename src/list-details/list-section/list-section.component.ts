import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Section } from '../../models/list';
import { ListsService } from '../../services/Lists.service';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.scss'],
  imports: [CommonModule, ListItemComponent],
})
export class ListSectionComponent {
  @Input() section: Section;

  public constructor(private readonly listsService: ListsService) { }

  public updateSectionName(e: Event) {
    const input = e.target as HTMLInputElement;
    this.section.name = input.value;
    this.listsService.writeLists();
  }

  get numberOfCompletedItems(): number {
    return this.section.items.filter(i => i.completed).length;
  }

  public addNewItem() {
    this.section.items.push({ description: '', completed: false });
    this.listsService.writeLists();
  }
}
