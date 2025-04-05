import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { ProjectInfoService } from '../project-info.service';

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, FormsModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.css'
})
export class ClientInfoComponent {
  searchQuery = '';
  statusFilter = '';
  startDateFilter: string | null = null;
  endDateFilter: string | null = null;
  showFilters: boolean = false;
  clientInfo: any;
  checked: { [id: string]: boolean } = {};
  activeTab: string = 'manageInfo'
  @ViewChild('confirmationModal') confirm!: TemplateRef<any>;
  @ViewChild('DeletingModal') delete!: TemplateRef<any>;

  selectedId: any;
  removeData: any;
  isEnableClient: boolean = false;
  clientDetails: any;
  selectedClientId: any;
  responseData: any;
  constructor(private router: Router, public service: ProjectInfoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  createNewClient() {
    this.router.navigate(['/clientDetail']);
  }
  goBack() {
    this.router.navigate(['/manageInfo']);
  }
  ngOnInit() {
    this.getClientInfoDetail();
  }
  getClientInfoDetail() {
    this.service.getClientInfo().subscribe(
      (success) => {
        this.clientInfo = success;
        this.responseData = this.clientInfo
        this.clientInfo.forEach((data: any) => {
          this.checked[data.id] = false;
        });
      },
      (error) => {
        console.error('Error fetching project info:', error);
      }
    );
  }
  editClientItem(clientInfo: any) {
    if (this.selectedClientId)
      this.clientDetails = clientInfo;
    this.dialog.open(this.confirm);


  }
  deleteClientItem(item: any) {
    if (this.selectedClientId == item.id)
      this.removeData = item;
    this.dialog.open(this.delete);

  }
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
  editProjectInfo() {
    this.router.navigate(['/clientDetail', this.clientDetails.id], { state: { showData: this.isEnableClient } })
  }
  deleteProjectInfo() {
    if (this.removeData) {
      const index = this.clientInfo.findIndex((data: any) => data.id == this.removeData.id);
      if (index != -1) {
        this.clientInfo.splice(index, 1);
        this.snackBar.open('Item Deleted successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
      else { }
    }
  }
  checkBoxChange(event: any, id: any) {
    if (this.selectedClientId === id) {
      this.selectedClientId = null;
    } else {
      this.selectedClientId = id;
    }
    this.isEnableClient = this.selectedClientId !== null;
  }
  onHandleSearch() {
    console.log(this.searchQuery)
    if (this.searchQuery != '') {
      this.clientInfo = this.responseData.filter((project: any) => project.companyName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
    else {
      this.clientInfo = this.responseData;
    }
  }
}

