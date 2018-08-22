import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { RegionMonitorComponent } from './region-monitor/region-monitor.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { SystemMonitorComponent } from './system-monitor/system-monitor.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'monitor-region',
    component: RegionMonitorComponent
  },
  {
    path: 'monitor-system',
    component: SystemMonitorComponent
  },
  {
    path: 'analysis',
    component: AnalysisComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  { path: 'not-found',
    component: ErrorPageComponent
  },
  { path: '**',
  redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRouter {

}
