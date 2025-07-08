import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { List, Section } from '../models/list';
import { ToPathPipe } from '../pipes/to-path.pipe';
import { ListsService } from '../services/Lists.service';
import { IconsSvgModule } from '../svg-output/icons-svg.module';
import { ListSectionComponent } from './list-section/list-section.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  imports: [CommonModule, ListSectionComponent, IconsSvgModule, CdkDrag, CdkDropList],
})
export class ListDetailsComponent implements OnInit {
  @ViewChild('changeListNameDialog') changeListNameDialog: ElementRef<HTMLDialogElement>;
  @ViewChild('deleteListDialog') deleteListDialog: ElementRef<HTMLDialogElement>;
  @ViewChild('cleanChecksDialog') cleanChecksDialog: ElementRef<HTMLDialogElement>;

  @Input() listId!: string;

  private toPathPipe = new ToPathPipe();

  public list: List;

  public isNameValid: boolean = true;
  public name: string = '';

  constructor(private readonly listsService: ListsService, private readonly router: Router, private readonly elRef: ElementRef<HTMLElement>) { }

  public ngOnInit() {
    this.list = this.listsService.allLists().find(l => this.toPathPipe.transform(l.name) === this.listId)!;
  }

  public navigateHome() {
    this.router.navigate(['']);
  }

  public onChangeName(e: Event) {
    const input = e.target as HTMLInputElement;
    this.name = input.value.trim();

    this.isNameValid = this.name.length > 0
      && this.name.length < 30
      && !this.listsService.allLists().find(list => this.toPathPipe.transform(list.name) === this.toPathPipe.transform(this.name));
  }

  public updateListName() {
    if (this.name.length === 0) return;
    
    this.changeListNameDialog.nativeElement.close();
    this.list.name = this.name;
    this.listsService.writeLists();
    this.router.navigate(['/', this.toPathPipe.transform(this.name)])
  }

  public deleteList() {
    this.listsService.deleteList(this.list);
    this.deleteListDialog.nativeElement.close();
    this.navigateHome();
  }

  public cleanChecks() {
    this.list.sections.forEach(section => section.items.forEach(item => item.completed = false))
    this.cleanChecksDialog.nativeElement.close();
    this.listsService.writeLists();
  }

  public toggleSections() {
    this.list.sections.forEach(section => section.isExpanded = !this.list.isExpanded)
    this.list.isExpanded = !this.list.isExpanded;
    this.listsService.writeLists();
  }

  public addNewSection() {
    this.list.sections.push({
      name: '',
      isExpanded: true,
      items: [{
        description: '',
        completed: false,
      }]
    });
    this.listsService.writeLists();
    setTimeout(() => {
      // set the focus on the added section to show the keyboard on mobile
      const inputsEl = this.elRef.nativeElement.querySelectorAll('input[type="text"].header__name');
      (inputsEl[inputsEl.length - 1] as HTMLInputElement).focus();
    })
  }

  public onOrderSections(event: CdkDragDrop<Section[]>) {
    moveItemInArray(this.list.sections, event.previousIndex, event.currentIndex);
    this.listsService.writeLists();
  }
}
