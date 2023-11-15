import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from 'src/app/services/employer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard-password',
  templateUrl: './dashboard-password.component.html',
  styleUrls: ['./dashboard-password.component.css']
})
export class DashboardPasswordComponent implements OnInit {
  connect: boolean = false
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  id = this.activatedRoute.snapshot.params['id']
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private employerService :EmployerService) { }

  ngOnInit(): void {
  }
  deleteSociete(id: any) {
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

        this.employerService.deleteSociete(this.userconnect.iduser).subscribe(
          (res: any) => {
            console.log("deleted !")
            this.onLogout()
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
  onLogout() {
    Swal.fire('Logout !!')
    localStorage.clear()
    this.router.navigateByUrl('/login')
    this.connect = false
  }
}
