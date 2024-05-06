import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DaftarLaporanComponent } from './daftar-laporan/daftar-laporan.component';
import { DaftarSelesaiComponent } from './daftar-selesai/daftar-selesai.component';
import { LoginComponent } from './login/login.component';
import { TweetsComponent } from './tweets/tweets.component';
import { DetailLaporanComponent } from './detail-laporan/detail-laporan.component';
import { DetailLaporanClearComponent } from './detail-laporan-clear/detail-laporan-clear.component';
import { DetailLaporanInvestigasiComponent } from './detail-laporan-investigasi/detail-laporan-investigasi.component';
import { AuthGuard } from './auth.guard';

export const routes:  Routes = [
  // TODO: Later make sure to add "authenticated" logic for this base path 
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'daftar-laporan', component: DaftarLaporanComponent, canActivate: [AuthGuard] },
  { path: 'detail-laporan-clear/:reported_account_id', component: DetailLaporanClearComponent, canActivate: [AuthGuard] },
  { path: 'detail-laporan-investigasi/:reported_account_id', component: DetailLaporanInvestigasiComponent, canActivate: [AuthGuard] },
  { path: 'daftar-selesai', component: DaftarSelesaiComponent, canActivate: [AuthGuard] },
  { path: 'detail-laporan/:reported_account_id', component: DetailLaporanComponent, canActivate: [AuthGuard] },
  { path: 'tweets', component: TweetsComponent, canActivate: [AuthGuard] }
];