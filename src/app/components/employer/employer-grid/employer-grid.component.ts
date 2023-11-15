import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/services/employer.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-employer-grid',
  templateUrl: './employer-grid.component.html',
  styleUrls: ['./employer-grid.component.css']
})
export class EmployerGridComponent implements OnInit {
  companyname:any
  categories:any
  items: any 
  pageOfItems: Array<any>;
  p: number = 1
  page = 1;
  count = 0;
  pageSize =4;
  pageSizes = [3, 6, 9];
  searchFilter: any = ''
  city : any
  term:string
  societes : any
    userconnect = JSON.parse(localStorage.getItem('userconnect')!)
    state = JSON.parse(localStorage.getItem('state')!)
  constructor(private employerService :EmployerService, private offreService:OffreService) { }

  ngOnInit(): void {
    this.getAllsociete();
    this.getAllCategorie();
    let idcity: any
    this.offreService.getCity(idcity).subscribe(data => {
      this.city = data;
    })
  }
  getAllsociete() {
    this.employerService.getAllSociete().subscribe(
      (res: any) => {
        this.societes = res
        console.log("societes", this.societes)
      })}

      onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }
    handlePageChange(event: number): void {
      this.page = event;
      this.getAllsociete();
    }
    
    handlePageSizeChange(event: any): void {
      this.pageSize = event.target.value;
      this.page = 1;
      this.getAllsociete();
    }
    getAllCategorie() {
      this.offreService.getAllCategorie().subscribe(
        (res: any) => {
          this.categories = res
          console.log("categories",this.categories)
        })
    }
  
  
    OnChangeCategory(event: any) {
      
      if(event.target.checked){
        console.log("detected value category ", event.target.value)
        this.employerService.getAllSociete().subscribe(
          (res: any) => {
            this.societes = res.filter((societes: any) => societes.categorie.titlecategorie == event.target.value)
          })
      }
      else
      {
        this.getAllsociete();
      }
    }
    OnChangeType(event: any) {
    
      if(event.target.checked){
        console.log("detected value type ", event.target.value)
        this.employerService.getAllSociete().subscribe(
          (res: any) => {
            this.societes = res.filter((societes: any) => societes.contract_type == event.target.value)
          })
      }
      else{
        this.getAllsociete();
      }
    }
    OnChangeLieu(event: any) {
      
      if(event.target.checked){
        console.log("detected value category ", event.target.value)
        this.employerService.getAllSociete().subscribe(
          (res: any) => {
            this.societes = res.filter((societes: any) => societes.city.admin_name == event.target.value)
          })
      }
      else
      {
        this.getAllsociete();
      }
    }
    getCompanyPro() {
  
      this.employerService.getAllSociete().subscribe(
        (res: any) => {
          this.societes = res.filter((societes:any)=>(societes.companyname==this.companyname)
        
         )
          
        }
      )
    }
}
