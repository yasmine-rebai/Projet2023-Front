import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OffreService } from 'src/app/services/offre.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css'],

})
export class ManageJobsComponent implements OnInit {
  items: any 
  pageOfItems: Array<any>;
  p: number = 1
  page = 1;
  count = 0;
  pageSize =3;
  pageSizes = [3, 6, 9];
  formOffer: FormGroup
  offers: any
  citys: any
  city: any
  categories: any
  id_city: any
  Offre:any
  fileToUplod: Array<File> = [];
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  // myDate=new Date(Date.now())
  //Date1 : Date =new Date()
  LocalDate: String = new Date().toLocaleString();
  date = new Date();
  constructor(private offreService: OffreService) {
  }

  ngOnInit(): void {
    // console.log(this.datePipe.transform(this.LocalDate,"yyyy-MM-dd"));
    this.getAllJob();
    this.getAllCity();
    this.getAllCategorie();
    let id: any
    this.offreService.getCity(id).subscribe(data => {
      this.city = data;
    })

  }


  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth()+1),
        this.padTo2Digits(date.getDate()),
      ].join('-') 
    
    );

  }
  result() {

    const result = this.formatDate(new Date());
    console.log(result);
    return result //  👉️ "2022-03-07 16:10:22
  }
  // getOffreById(id:any) {
  //   this.offreService.getOffreById(id).subscribe(
  //     (res: any) => {
  //       this.Offre = res
  //       console.log("Offre", this.Offre)
  //     })
  // }
  deleteoffre(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.offreService.deleteOffer(id).subscribe(
          (res: any) => {
            console.log("deleted !")
            this.getAllJob();
          }
        )
        Swal.fire(
          'Deleted!',
          'Your job has been deleted.',
          'success'
        )
      }
    })
  }

  getAllJob() {
    this.offreService.getAlloffer().subscribe(
      (res: any) => {
        this.offers = res.filter((element: any) => (element.societe.iduser == this.userconnect.iduser))
        console.log("offers", this.offers)
      })
  }

  getAllCity() {
    this.offreService.getAllCity().subscribe(
      (res: any) => {
        this.citys = res
        console.log("city", this.citys)
      })
  }


  getAllCategorie() {
    this.offreService.getAllCategorie().subscribe(
      (res: any) => {
        this.categories = res
        console.log("categories", this.categories)
      })
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
handlePageChange(event: number): void {
  this.page = event;
  this.getAllJob();
}

handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getAllJob();
}
}
