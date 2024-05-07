import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getToken());

    const options = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
      {
        name: "Admin 1",
        color: "#FEEEE9",
        data: [
          { x: "Jan", y: 232 },
          { x: "Feb", y: 113 },
          { x: "Mar", y: 341 },
          { x: "Apr", y: 224 },
          { x: "May", y: 522 },
          { x: "Jun", y: 411 },
          { x: "Jul", y: 243 },
          { x: "Aug", y: 243 },
          { x: "Sep", y: 243 },
          { x: "Oct", y: 243 },
          { x: "Nov", y: 243 },
          { x: "Dec", y: 243 },
        ],
      },
      {
        name: "Admin 2",
        color: "#F9BBA4",
        data: [
          { x: "Jan", y: 232 },
          { x: "Feb", y: 113 },
          { x: "Mar", y: 341 },
          { x: "Apr", y: 224 },
          { x: "May", y: 522 },
          { x: "Jun", y: 411 },
          { x: "Jul", y: 243 },
          { x: "Aug", y: 243 },
          { x: "Sep", y: 243 },
          { x: "Oct", y: 243 },
          { x: "Nov", y: 243 },
          { x: "Dec", y: 243 },
        ],
      },
      {
        name: "Admin 3",
        color: "#F37548",
        data: [
          { x: "Jan", y: 232 },
          { x: "Feb", y: 113 },
          { x: "Mar", y: 341 },
          { x: "Apr", y: 224 },
          { x: "May", y: 522 },
          { x: "Jun", y: 411 },
          { x: "Jul", y: 243 },
          { x: "Aug", y: 243 },
          { x: "Sep", y: 243 },
          { x: "Oct", y: 243 },
          { x: "Nov", y: 243 },
          { x: "Dec", y: 243 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    };

    const getChartOptions = () => {
      return {
        series: [35.1, 23.5],
        colors: ["#FEEEE9", "#F37548"],
        chart: {
          height: 320,
          width: "100%",
          type: "donut",
        },
        stroke: {
          colors: ["transparent"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: 20,
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: "Seluruh Laporan Masuk",
                  fontFamily: "Inter, sans-serif",
                  formatter: function (w: { globals: { seriesTotals: any[]; }; }) {
                    const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                      return a + b
                    }, 0)
                    return '$' + sum + 'k'
                  },
                },
                value: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
                  offsetY: -20,
                  formatter: function (value: string) {
                    return value + "k"
                  },
                },
              },
              size: "80%",
            },
          },
        },
        grid: {
          padding: {
            top: -2,
          },
        },
        labels: ["Belum Selesai", "Selesai"],
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: function (value: string) {
              return value + "k"
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (value: string) {
              return value  + "k"
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      }
    }

    if (document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("column-chart"), options);
      chart.render();
    }

    if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
      chart.render();
    
      // Get all the checkboxes by their class name
      const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');
  }
}
}
