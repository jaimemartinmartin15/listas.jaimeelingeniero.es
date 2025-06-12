import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CollapsibleModule } from '@jaimemartinmartin15/jei-devkit-angular-shared';
import { Item, Section } from '../../models/list';
import { ListsService } from '../../services/Lists.service';
import { IconsSvgModule } from '../../svg-output/icons-svg.module';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list-section',
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.scss'],
  imports: [CommonModule, ListItemComponent, IconsSvgModule, CollapsibleModule, CdkDrag, CdkDropList],
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

  public deleteSection() {
    const list = this.listsService.allLists().find(l => l.sections.includes(this.section));
    list?.sections.splice(list.sections.indexOf(this.section), 1);
    this.listsService.writeLists();
  }

  public toggleSection() {
    this.section.isExpanded = !this.section.isExpanded;
    this.listsService.writeLists();
  }

  public addNewItem() {
    this.section.items.push({ description: '', completed: false });
    this.listsService.writeLists();
  }

  public onOrderItems(event: CdkDragDrop<Item[]>) {
    moveItemInArray(this.section.items, event.previousIndex, event.currentIndex);
    this.listsService.writeLists();
  }
}
