import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from '../services/Lists.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
  imports: [],
})
export class ListDetailsComponent implements OnInit {
  @Input() listId!: string;

  constructor(private readonly listsService: ListsService) { }

  ngOnInit() {
    console.log(this.listId);
  }
}
