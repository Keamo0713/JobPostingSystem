import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [animate('400ms ease-in')]),
]);

export const slideIn = trigger('slideIn', [
  state('void', style({ transform: 'translateY(-20px)', opacity: 0 })),
  transition(':enter', [animate('400ms ease-out')]),
]);
