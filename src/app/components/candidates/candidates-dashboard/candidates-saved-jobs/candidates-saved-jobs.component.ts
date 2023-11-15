import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-candidates-saved-jobs',
  templateUrl: './candidates-saved-jobs.component.html',
  styleUrls: ['./candidates-saved-jobs.component.css']
})
export class CandidatesSavedJobsComponent implements OnInit {
  items: any 
  pageOfItems: Array<any>;
  p: number = 1
  page = 1;
  count = 0;
  pageSize =3;
  pageSizes = [3, 6, 9];
  jobseved:any
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  constructor(private candidatService:CandidatService, private router:Router) { }

  ngOnInit(): void {
    this.getAllJobSaved()
  }
  getAllJobSaved() {
    this.candidatService.getAllJobSaved().subscribe(
      (res: any) => {
        this.jobseved = res.filter((element: any) => (element.candidat.iduser == this.userconnect.iduser))
        console.log("jobseved",this.jobseved)

      })
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
handlePageChange(event: number): void {
  this.page = event;
  this.getAllJobSaved();
}

handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getAllJobSaved();
}
}
