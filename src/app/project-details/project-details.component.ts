import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { ClientInfoComponent } from '../client-info/client-info.component';
import { ProjectInfoService } from '../project-info.service';
import { ProjectInfoComponent } from '../project-info/project-info.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, FormsModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, ProjectInfoComponent, ClientInfoComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  projectInfo: any;
  searchQuery = '';
  statusFilter = '';
  startDateFilter: string | null = null;
  endDateFilter: string | null = null;
  showFilters: boolean = false;
  clientInfo: any;
  checked: { [id: string]: boolean } = {};
  activeTab: string = 'manageInfo'
  // note:confirm! is assign value later so using ! in assign variable for viewchild
  @ViewChild('confirmationModal') confirm!: TemplateRef<any>;
  @ViewChild('DeletingModal') delete!: TemplateRef<any>;

  projectDetails: any;
  isEnable: boolean = false;
  selectedId: any;
  removeData: any;
  isEnableClient: boolean = false;
  clientDetails: any;
  selectedClientId: any;
  responseData: any;
  isFilterOpen: boolean = false;

  constructor(private router: Router, public service: ProjectInfoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  createNewProject() {
    this.router.navigate(['/projectInfo']);
  }

  ngOnInit() {
    this.getProjectInfoDetail();
  }
  getProjectInfoDetail() {
    this.service.getProjectInfo().subscribe(
      (success) => {
        this.projectInfo = success;
        this.responseData = [...this.projectInfo];
        this.projectInfo.forEach((data: any) => {
          this.checked[data.id] = false;
        });
      },
      (error) => {
        console.error('Error fetching project info:', error);
      }
    );
  }
  editItem(projectInfo: any) {
    if (this.selectedId)
      this.projectDetails = projectInfo;
    this.dialog.open(this.confirm);


  }
  deleteItem(item: any) {
    if (this.selectedId == item.id)
      this.removeData = item;
    this.dialog.open(this.delete);

  }
  editProjectInfo() {
    this.router.navigate(['/projectInfo', this.projectDetails.id], { state: { showData: this.isEnable } });
  }
  deleteProjectInfo() {
    if (this.removeData) {
      const index = this.projectInfo.findIndex((data: any) => data.id == this.removeData.id)
      if (index != -1) {
        this.projectInfo.splice(index, 1);
        this.snackBar.open('Item Deleted successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
      else { }
    }
  }

  checkBox(event: any, id: any) {
    if (this.selectedId === id) {
      this.selectedId = null;
    } else {
      this.selectedId = id;
    }
    this.isEnable = this.selectedId !== null;
    // this.selectedId = this.selectedId === id ? null : id;
    // this.isEnable = event.checked == true ? true : false;
  }
  onHandleSearch() {
    console.log(this.searchQuery)
    if (this.searchQuery != '') {
      this.projectInfo = this.responseData.filter((project: any) => project.projectName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      console.log(this.projectInfo)
    }
    else {
      this.projectInfo = this.responseData;
    }
  }
  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }
  onApplyFilters() {
    this.projectInfo = this.responseData.filter((project: any) => {
      const matchesStatus = this.statusFilter ? project.projectStatus.toLowerCase() === this.statusFilter.toLowerCase() : true;
      const matchesStartDate = this.startDateFilter ? new Date(project.startDate) >= new Date(this.startDateFilter) : true;
      const matchesEndDate = this.endDateFilter ? new Date(project.startDate) <= new Date(this.endDateFilter) : true;

      return matchesStatus && matchesStartDate && matchesEndDate;
    });

  }

}
