import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationComponent } from '../../ui-common';


@Component({
  selector: 'app-sidebar-cmp',
  imports: [
    NavigationComponent
  ],
  template: `
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="http://angulararchitects.io" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img src="paper-design/angular_gradient.png" alt="Angular Logo" />
          </div>
        </a>
        <a href="http://angulararchitects.io" class="simple-text logo-normal">
          Flights 42
        </a>
      </div>

      <app-navigation />
      
    </div>
  `
})
export class SidebarComponent {}
