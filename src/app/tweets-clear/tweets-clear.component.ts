import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import axios from 'axios';
import { NgComponentOutlet, NgFor } from '@angular/common';

interface tweet {
  twitter_report_id: string;
  post_date: Date;
  twitter_username: string;
  tweet_link: string;
}

interface reportedAccountNumber {
  account_id: number;
}

@Component({
  selector: 'app-tweets-clear',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './tweets-clear.component.html',
  styleUrl: './tweets-clear.component.css'
})
export class TweetsClearComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  account_number: string = '';
  list_tweet_acc: tweet[] = [];
  report_id: number = 0;

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
}
