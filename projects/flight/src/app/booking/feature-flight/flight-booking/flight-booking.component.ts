import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlightService } from '../../api-boarding';


@Component({
  selector: 'app-flight-booking',
  imports: [
    RouterOutlet
  ],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  providers: [
    FlightService
  ]
})
export class FlightBookingComponent {
  constructor() {
    inject(FlightService).findById(1).subscribe(console.log);
  }
}
