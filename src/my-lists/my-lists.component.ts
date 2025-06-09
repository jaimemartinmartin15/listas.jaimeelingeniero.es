import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { List } from '../models/list';
import { ToPathPipe } from '../pipes/to-path.pipe';
import { ListsService } from '../services/Lists.service';
import { IconsSvgModule } from '../svg-output/icons-svg.module';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  imports: [CommonModule, RouterLink, ToPathPipe, IconsSvgModule],
})
export class MyListsComponent {
  public constructor(public readonly listsService: ListsService) { }

  public completedItems(list: List) {
    return list.sections.flatMap(section => section.items).filter(item => item.completed).length;
  }

  public totalItems(list: List) {
    return list.sections.flatMap(section => section.items).length;
  }
}
