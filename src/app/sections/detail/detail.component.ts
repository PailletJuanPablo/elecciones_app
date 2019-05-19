import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  nroMesa: string;
  mesaData;
  establecimientoData;
  mesaChartData = [];
  mesaChartLabels = [];
  pieChartColors = [
    {
      backgroundColor: [],
    }
  ];
  processed = false;
  dtOptions: DataTables.Settings = {};
  mesaChartOptions: ChartOptions = {
    legend: {
      position: 'top'
    },
    responsive: true
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dtOptions = {
      searching: false,
      info: false,
      lengthChange: false,
      pageLength: 8,
      order: [[1, "desc"]],
      language: {
        "lengthMenu": "Mostrando _MENU_ records per page",
        "info": "Página _PAGE_ de _PAGES_",
        "infoEmpty": "No records available",
        "infoFiltered": "(filtrado de _MAX_ registros totales)",
        "paginate": {
          "first": "Primera",
          "last": "Última",
          "next": "Siguiente",
          "previous": "Anterior"
        },
        "search": 'Buscar',
      }
    }

  }

  search() {
    this.processed = false;
    this.mesaData = null;
    this.establecimientoData = null;
    this.mesaChartData = [];
    this.mesaChartLabels = [];
    this.dataService.getDataFromMesa(this.nroMesa).then((data) => {
      console.log(data);
      this.mesaData = data.mesaApiData,
        this.establecimientoData = data.establecimientoApiData,
        this.generateGraphic();
      this.processed = true;
    }
    ).catch((error) => console.log(error))
  }


  generateGraphic() {
    this.mesaData.resultados.map((res) => {
      this.mesaChartData.push(res.cant_votos);
      this.mesaChartLabels.push(res.descripcion_candidatura);
      const color = Math.floor(Math.random() * 16777216).toString(16);
      this.pieChartColors[0].backgroundColor.push('#000000'.slice(0, -color.length) + color)
    })
  }

  roundNumber(number) {
    return Math.round(Number(number) * 100) / 100
  }


}
