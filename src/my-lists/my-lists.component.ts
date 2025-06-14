import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { List } from '../models/list';
import { ToPathPipe } from '../pipes/to-path.pipe';
import { ListsService } from '../services/Lists.service';
import { IconsSvgModule } from '../svg-output/icons-svg.module';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  imports: [CommonModule, RouterLink, ToPathPipe, IconsSvgModule, CdkDrag, CdkDropList],
})
export class MyListsComponent {
  @ViewChild('addNewListDialog') addNewListDialog: ElementRef<HTMLDialogElement>;

  private toPathPipe = new ToPathPipe();

  public isNameValid: boolean = true;
  public name: string = '';

  public constructor(public readonly listsService: ListsService, private readonly router: Router) { }

  public completedItems(list: List) {
    return list.sections.flatMap(section => section.items).filter(item => item.completed).length;
  }

  public totalItems(list: List) {
    return list.sections.flatMap(section => section.items).length;
  }

  public onChangeName(e: Event) {
    const input = e.target as HTMLInputElement;
    this.name = input.value.trim();

    this.isNameValid = this.name.length > 0
      && this.name.length < 30
      && !this.listsService.allLists().find(list => this.toPathPipe.transform(list.name) === this.toPathPipe.transform(this.name));
  }

  public createNewList() {
    if (this.name.length === 0) return;

    this.addNewListDialog.nativeElement.close();
    this.listsService.createList(this.name);
    this.router.navigate([this.toPathPipe.transform(this.name)]);
  }

  public onOrderList(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.listsService.allLists(), event.previousIndex, event.currentIndex);
    this.listsService.writeLists();
  }
}
