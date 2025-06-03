import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListsService } from '../services/Lists.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class MyListsComponent {
  public constructor(public readonly listsService: ListsService) {}
}
