import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DaftarLaporanComponent } from './daftar-laporan/daftar-laporan.component';
import { DaftarSelesaiComponent } from './daftar-selesai/daftar-selesai.component';
import { LoginComponent } from './login/login.component';
import { TweetsComponent } from './tweets/tweets.component';
import { DetailLaporanComponent } from './detail-laporan/detail-laporan.component';

export const routes:  Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'daftar-laporan', component: DaftarLaporanComponent },
  { path: 'daftar-selesai', component: DaftarSelesaiComponent },
  { path: 'detail-laporan', component: DetailLaporanComponent },
  { path: 'tweets', component: TweetsComponent }
];