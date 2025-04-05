import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProjectInfoService } from '../project-info.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectInfoComponent } from '../project-info/project-info.component';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';

interface DataItem {
  id: number,
  projectName: string
  projectDesc: string,
  clientName: string
  startDate: any,
  endDate: any,
  projectStatus: string,
  emailId: any,
  mobileNo: number
}
@Component({
  selector: 'app-management-info',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, FormsModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, ProjectInfoComponent, ClientInfoComponent, ProjectDetailsComponent],
  templateUrl: './management-info.component.html',
  styleUrl: './management-info.component.css'
})

export class ManagementInfoComponent {

  activeTab: string = 'projectInfo'

  constructor() { }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

