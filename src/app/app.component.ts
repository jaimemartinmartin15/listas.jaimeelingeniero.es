import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { routeTransition } from './app.animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div [@routeTransition]="transition">
      <router-outlet  (activate)="onChangePath()"/>
    </div>
    `,
  styles: [':host { display: block; }'],
  animations: [routeTransition],
})
export class AppComponent {
  public transition: string;

  constructor(protected activatedRoute: ActivatedRoute) { }

  public onChangePath() {
    const route = this.activatedRoute.firstChild;
    this.transition = route?.snapshot.data?.['animation'];
  }
}
