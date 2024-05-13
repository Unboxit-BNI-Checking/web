import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../auth.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SearchPipe } from '../search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

interface tweet {
  twitter_report_id: number;
  post_date: Date;
  twitter_username: string;
  tweet_link: string;
}

interface reportedAccountNumber {
  account_id: number;
}

@Component({
  selector: 'app-tweets',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, SearchPipe, NgxPaginationModule, FormsModule],
  templateUrl: './tweets.component.html',
  styleUrl: './tweets.component.css',
})
export class TweetsComponent implements OnInit {

  itemsPerPage: number = 10;
  currentPage: number = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  account_number: string = '';
  list_tweet_acc: tweet[] = [];
  report_id: number = 0;
  searchText = '';
  sortDirection: string = 'asc';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.account_number = params['norek'];
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.report_id = params['report_id'];
    });
    axios
      .get('/api/twitter_reports/' + this.account_number, {
        headers: { Authorization: 'Bearer ' + this.authService.getToken() },
      })
      .then((response) => {
        console.error(response.data);
        this.list_tweet_acc = response.data;
      });
  }

  sortDataByReportCounts(key: number) {
    let aValue: number, bValue: number;

    this.list_tweet_acc.sort((a, b) => {
      if (key === 0) {
        aValue = a.twitter_report_id;
        bValue = b.twitter_report_id;
      } else if (key === 1) {
        aValue = parseInt(a.twitter_username);
        bValue = parseInt(b.twitter_username);
      }
      return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  formatDate(timestamp: string): string {
    // Parse the timestamp into a Date object
    const date = new Date(timestamp);
    // Adjust for GMT +7 timezone offset
    date.setHours(date.getHours() + 7);
    // Format the date using DatePipe
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || '';
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
