import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/services/candidat.service';
import { CandidatureService } from 'src/app/services/candidature.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  notifsc: any
  candidaturesA: any
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  LocalDate: String = new Date().toLocaleString();
  date = new Date();
  constructor(private CandidatService: CandidatService, private candidatureService: CandidatureService) { }

  ngOnInit(): void {
    this.getAllNotifc()
    this.getCandidatureA()
  }

  getAllNotifc() {
    this.CandidatService.getAllNotif().subscribe(
      (res: any) => {
        this.notifsc = res.filter((element: any) => element.candidature.candidat.iduser== this.userconnect.iduser)
        console.log("notificationsc", this.notifsc)
      })
  }
  getCandidatureA() {
    this.candidatureService.getSocieteCandidature(this.userconnect.iduser).subscribe(
      (res: any) => {
        this.candidaturesA=res
        console.log("Cadidature société", this.candidaturesA)

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
}
