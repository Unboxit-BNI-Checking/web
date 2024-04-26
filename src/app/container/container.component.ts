import { Component, ContentChildren, QueryList } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  @ContentChildren(Component) children = new QueryList<Component>()
}
