import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports/reports.service';

export interface Reports {
  incident: string;
  comment: string;
  location: object;
  reporter: object;
  createdAt: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'incident',
    'comment',
    'location',
    'reporter',
    'createdAt',
  ];

  reports: Reports;
  dataSource;
  loading;
  reportCount;
  constructor(private reportServ: ReportsService) {}

  ngOnInit(): void {
    this.getReport();
  }
  getReport() {
    this.loading = true;
    this.reportServ
      .getReports()
      .then((resp) => {
        this.reports = resp.reports;
        console.log(this.reports);
        this.dataSource = this.reports;
        this.loading = false;
        this.getAddress();
      })
      .catch((error) => {
        this.loading = false;
      });
  }
  getAddress() {


    let report;
    report = this.reports;

    report.forEach(element => {

      this.reportServ
    .getAddress(element.location.latitude, element.location.longitude)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      this.loading = false;
    });
    });
  }
}
