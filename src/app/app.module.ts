import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppRouter } from './app.router';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { RegionMonitorComponent } from './region-monitor/region-monitor.component';
import { SystemMonitorComponent } from './system-monitor/system-monitor.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatIconRegistry } from '@angular/material';
import { CardComponent } from './commons/card/card.component';
import { CardSmallComponent } from './commons/card/card-small.component';
import { CardRegionComponent } from './commons/card/card-region.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsRegionBriefComponent } from './commons/charts/echarts-region-brief.component';
import { EchartsSystemBriefComponent } from './commons/charts/echarts-system-brief.component';
import { EchartsSystemRealtimeComponent } from './commons/charts/echarts-system-realtime.component';
import { PieChartComponent } from './commons/charts/pie-chart.component';
import { TableComponent } from './commons/table/table.component';
import { QueryComponent } from './commons/query/query.component';

import { ChartService } from './service/chart.service';
import { DataGetService } from './service/data-get.service';
import { DataTransferService } from './service/data-transfer.service';
import { TimesliceService } from './service/timeslice.service';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    HomeComponent,
    RegionMonitorComponent,
    SystemMonitorComponent,
    AnalysisComponent,
    ErrorPageComponent,
    CardComponent,
    CardSmallComponent,
    CardRegionComponent,

    EchartsRegionBriefComponent,
    EchartsSystemBriefComponent,
    EchartsSystemRealtimeComponent,
    PieChartComponent,
    TableComponent,
    QueryComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRouter,
    NgxEchartsModule,
    HttpModule,
    HttpClientModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [ChartService, DataGetService, DataTransferService, TimesliceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private mdIconRegistry: MatIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
 }
