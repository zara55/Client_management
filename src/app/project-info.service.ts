import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Client, Project } from './project.interface';



@Injectable({
  providedIn: 'root'
})
export class ProjectInfoService {
  private apiUrl = 'http://localhost:3000/projectInfo';
  private apiUrl1 = 'http://localhost:3000/clientInfo';

  constructor(private http: HttpClient) {}
  // concatenate array using fork joins
  // getProjectInfo(){
  //   const projectInfo = this.http.get<any>(this.apiUrl);
  //   const clientInfo = this.http.get<any>(this.apiUrl1);

  //   return forkJoin([projectInfo, clientInfo]).pipe(
  //     map(([projectInfoResponse, clientInfoResponse]) => {
  //       const projects = projectInfoResponse || [];
  //       const clients = clientInfoResponse || [];

  //       return [...projects, ...clients];
  //     })
  //   );
  // }
  getProjectInfo(): Observable<Project[]>{
    return this.http.get<Project[]>(this.apiUrl);
  }
  getProjectById(id:any){
    return this.http.get<any>(this.apiUrl).pipe( // Get the entire object
    map((response) => {
      const project = response.find((item:any) => item.id == id); // Find the object
      return project;
    })
  );  }
  postProjectInfo(data:{}){
    return this.http.post(this.apiUrl,data);
  }
  postClientInfo(data:{}){
    return this.http.post(this.apiUrl1,data);
  }
  getClientInfo():Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl1);
  }
  getClientById(id:any){
    return this.http.get<any>(this.apiUrl1).pipe( // Get the entire object
    map((response) => {
      const project = response.find((item:any) => item.id == id); // Find the object
      return project;
    })
  );  }
  updateProjectInfo(project: Project): Observable<Project> {
    const url = `${this.apiUrl}/${project.id}`;  // Assuming the API uses the project ID in the URL
    return this.http.put<Project>(url, project);  // PUT request to update the project
  }
  updateClientInfo(project: Client): Observable<Client> {
    const url = `${this.apiUrl1}/${project.id}`;  // Assuming the API uses the project ID in the URL
    return this.http.put<Client>(url, project);  // PUT request to update the project
  }
}
