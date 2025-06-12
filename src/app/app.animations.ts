import { animate, group, query, style, transition, trigger } from '@angular/animations';

const transitionTime = '0.2s';

export const routeTransition = trigger('routeTransition', [
  transition('MyLists => ListDetails', [
    // Set initial styles for the entering component
    query(':enter', [
      style({
        position: 'absolute',
        inset: 0,
        transform: 'translateX(100%)',
      })
    ], { optional: true }),

    // Animate both leaving and entering components in parallel
    group([
      query(':leave', [
        animate(transitionTime, style({})) // wait the entering component to cover this before leaving
      ], { optional: true }),

      query(':enter', [
        animate(transitionTime, style({ transform: 'translateX(0)' }))
      ], { optional: true })
    ])
  ]),
  transition('ListDetails => MyLists', [
    query(':leave', [
      style({
        position: 'absolute',
        inset: 0,
        transform: 'translateX(0)',
      })
    ], { optional: true }),
    query(':leave', [
      animate(transitionTime, style({ transform: 'scale(0.8)', opacity: 0 }))
    ], { optional: true }),
  ]),
]);
