import { CommonModule, DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../auth.service';

interface Report {
  account_number_reported: string;
  account_username_reported: string;
  status: number;
  reported_id: number;
  reports_created_at: Date;
  account_number: string;
  account_username: string;
  transaction_created_at: Date;
  transaction_note: String;
  amount: number;
  chronology: string;
  attachment: string[];
  twitter_reports_count: number;
}

@Component({
  selector: 'app-detail-laporan',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-laporan.component.html',
  styleUrl: './detail-laporan.component.css'
})
export class DetailLaporanComponent implements OnInit {
  reportedAccountId: number = 0;
  reportList: Report[] = [];
  datePipe: DatePipe;
  currentIndex: number = 0;

  constructor(private authService: AuthService, private route: ActivatedRoute, private injector: Injector, private router: Router) {
    this.datePipe = this.injector.get(DatePipe);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportedAccountId = +params['reported_account_id'] || 0;
      if (this.reportedAccountId !== 0) {
        this.getReport();
      }
    });
  }

  async getReport() {
    try {
      const token = this.authService.getToken();
      const response = await axios.get('/api/reportedAcc/website/reports/' + this.reportedAccountId, {
        headers: { "Authorization": "Bearer " + token }
      });
      // this.reportList = response.data.data;
      this.reportList = response.data.data.map((report: Report) => {
        if (typeof report.attachment === 'string') {
          // Jika attachment adalah string tunggal, kita akan buat array dengan satu elemen
          return { ...report, attachment: [report.attachment] };
        } else {
          return report; // Jika attachment sudah array, kita biarkan seperti itu
        }
      });
      console.log(this.reportList)
      // Ubah format tanggal menggunakan DatePipe
      this.reportList.forEach(report => {
        // Periksa apakah nilai tanggal tidak null
        if (report.reports_created_at !== null) {
          report.reports_created_at = new Date(report.reports_created_at);
        }
        if (report.transaction_created_at !== null) {
          report.transaction_created_at = new Date(report.transaction_created_at);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  nextReport() {
    if (this.currentIndex < this.reportList.length - 1) {
      this.currentIndex++;
    }
  }

  previousReport() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  investigate(){
    // alert("Yakin?");
    const body = {"status": 2}
    axios.patch('/api/reportedAcc/reports/'+ this.reportedAccountId +'/status', body, {headers: { "Authorization": "Bearer " + this.authService.getToken() }}).then(() => {
      this.router.navigateByUrl("/daftar-laporan");
    })
  }

  ditolak(){
    // alert("Yakin?");
    const body = {"status": 5}
    axios.patch('/api/reportedAcc/reports/'+ this.reportedAccountId +'/status', body, {headers: { "Authorization": "Bearer " + this.authService.getToken() }}).then(() => {
      this.router.navigateByUrl("/daftar-selesai");
    })
  }



  getCurrentReport() {
    return this.reportList[this.currentIndex];
  }

  getCurrentIndex(){
    return this.currentIndex;
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }
  
  
}
