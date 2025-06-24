import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { filter, first } from 'rxjs';
import { ToPathPipe } from '../pipes/to-path.pipe';
import { ListsService } from '../services/Lists.service';
import { routeTransition } from './app.animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div [@routeTransition]="transition">
      <router-outlet  (activate)="onChangePath()"/>
    </div>
    `,
  styles: [':host { display: block; margin: auto; max-width: var(--app-max-width); }'],
  animations: [routeTransition],
})
export class AppComponent implements OnInit {
  public transition: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly listsService: ListsService,
  ) { }

  public ngOnInit() {
    this.importTravelListFromOldRepo();
  }

  public importTravelListFromOldRepo() {
    // import list from https://jaimeelingeniero.es/lista-de-viaje
    // if the query param is present, it contains the list from old app
    // convert it to the new format, and save it

    const TRAVEL_LIST_NAME = 'Lista de viaje';
    const toPathPipe = new ToPathPipe();
    const travelListPath = toPathPipe.transform(TRAVEL_LIST_NAME);

    this.activatedRoute.queryParams.pipe(
      filter(params => params[travelListPath] !== undefined),
      first(),
    ).subscribe(params => {
      let travelList = params[travelListPath];
      // if no query param, or the list already exists, do nothing
      if (!travelList || this.listsService.allLists().find(l => toPathPipe.transform(l.name) === travelListPath)) return;

      try {
        travelList = JSON.parse(travelList);
        this.listsService.createList(TRAVEL_LIST_NAME);
        const newTravelList = this.listsService.allLists().find(l => toPathPipe.transform(l.name) === travelListPath)!;
        newTravelList.sections = travelList.map(({ name, items }: any) => ({
          name,
          isExpanded: true,
          items: items.map(({ name, checked }: any) => ({ description: name, completed: checked }))
        }));
        this.listsService.writeLists();
        this.router.navigate([travelListPath]);
      } catch {
        // ignore any error
      }
    });
  }

  public onChangePath() {
    const route = this.activatedRoute.firstChild;
    this.transition = route?.snapshot.data?.['animation'];
  }
}
