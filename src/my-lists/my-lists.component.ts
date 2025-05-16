import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListsService } from '../services/Lists.service';

@Component({
  selector: 'app-my-lists',
  imports: [CommonModule],
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {

  constructor(public readonly listsService: ListsService) {}

  public ngOnInit() {

  }

}
