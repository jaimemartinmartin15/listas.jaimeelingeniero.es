import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../models/list';
import { ToPathPipe } from '../pipes/to-path.pipe';
import { ListsService } from '../services/Lists.service';
import { IconsSvgModule } from '../svg-output/icons-svg.module';
import { ListSectionComponent } from './list-section/list-section.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  imports: [CommonModule, ListSectionComponent, IconsSvgModule],
})
export class ListDetailsComponent implements OnInit {
  @ViewChild('cleanChecksDialog') cleanChecksDialog: ElementRef<HTMLDialogElement>;

  @Input() listId!: string;

  public list: List;

  constructor(private readonly listsService: ListsService, private readonly router: Router) { }

  public ngOnInit() {
    const toPathPipe = new ToPathPipe();
    this.list = this.listsService.allLists().find(l => toPathPipe.transform(l.name) === this.listId)!;

    if (!this.list) {
      this.navigateHome()
      return;
    }
  }

  public navigateHome() {
    this.router.navigate(['']);
  }

  public deleteList() {
    this.listsService.deleteList(this.list);
    this.navigateHome();
  }

  public cleanChecks() {
    this.list.sections.forEach(section => section.items.forEach(item => item.completed = false))
    this.cleanChecksDialog.nativeElement.close();
    this.listsService.writeLists();
  }
}
