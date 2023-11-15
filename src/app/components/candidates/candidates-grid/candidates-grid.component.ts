import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/services/candidat.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-candidates-grid',
  templateUrl: './candidates-grid.component.html',
  styleUrls: ['./candidates-grid.component.css']
})
export class CandidatesGridComponent implements OnInit {
  profil:any
  items: any 
  pageOfItems: Array<any>;
  p: number = 1
  page = 1;
  count = 0;
  pageSize =3;
  pageSizes = [3, 6, 9];
  searchFilter: any = ''
  candidat : any
  city : any
  constructor(private candidatService :CandidatService, private offreService :OffreService) { }

  ngOnInit(): void {
    this.getAllcandidat();

    let id: any
    this.offreService.getCity(id).subscribe(data => {
      this.city = data;
    })
  }
  getAllcandidat() {
    this.candidatService.getAllCandidat().subscribe(
      (res: any) => {
        this.candidat = res
        console.log("candidat", this.candidat)
      })
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
handlePageChange(event: number): void {
  this.page = event;
  this.getAllcandidat();
}

handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getAllcandidat();
}

OnChangeExp(event: any) {
  
  if(event.target.checked){
    console.log("detected value category ", event.target.value)
    this.candidatService.getAllCandidat().subscribe(
      (res: any) => {
        this.candidat = res.filter((candidat: any) => candidat.experiencecandidat == event.target.value)
      })
  }
  else
  {
    this.getAllcandidat();
  }
}

OnChangeLieu(event: any) {
  
  if(event.target.checked){
    console.log("detected value category ", event.target.value)
    this.candidatService.getAllCandidat().subscribe(
      (res: any) => {
        this.candidat = res.filter((candidat: any) => candidat.city.admin_name == event.target.value)
      })
  }
  else
  {
    this.getAllcandidat();
  }
}
getCandidatPro() {
  
  this.candidatService.getAllCandidat().subscribe(
    (res: any) => {
      this.candidat = res.filter((candidat:any)=>(candidat.profil==this.profil)
    
     )
      
    }
  )
}
}
