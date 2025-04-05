import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ManagementInfoComponent } from './management-info/management-info.component';
import { ProjectInfoComponent } from './project-info/project-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ManagementInfoComponent,ProjectInfoComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-management';
}
