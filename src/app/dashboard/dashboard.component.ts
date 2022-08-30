import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DadosService } from './service';

declare var google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      });
  }

  /**
   * Inicializa a API de gráticos com delay de 1 segundo,
   * o que permite a integração da API com o Angular.
   * 
   * @returns void
   */
  init(): void {
    if(typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 200);
    }
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada.
   * Responsável por chamar os métodos geradores dos gráficos.
   * 
   * @returns void
   */
  exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3DPieChart();
    this.exibirBarChart();
    this.exibitLineChart();
    this.exibirColumnChart();
    this.exibirDonutChart();
  }

  /**
   * Exibe o gráfico Pie Chart.
   * 
   * @returns void
   */
  exibirPieChart(): void {
    const element = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(element);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Pie Chart em 3D.
   * 
   * @returns void
   */
  exibir3DPieChart(): void {
    const element = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(element);
    const opcoes = this.obterOpcoes();

    opcoes['is3D'] = true;
    chart.draw(this.obterDataTable(), opcoes);
  }

  /**
   * Exibe o gráfico Bar Chart.
   * 
   * @returns void
   */
  exibirBarChart(): void {
    const element = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(element);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }
  /**
   * Exibe o gráfico Line Chart.
   * 
   * @returns void
   */
  exibitLineChart(): void {
    const element = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(element);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Column Chart.
   * 
   * @returns void
   */
  exibirColumnChart(): void {
    const element = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(element);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Donut Chart.
   * 
   * @returns void
   */
  exibirDonutChart(): void {
    const element = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(element);
    const opcoes = this.obterOpcoes();

    opcoes['pieHole'] = 0.3;
    chart.draw(this.obterDataTable(), opcoes);
  }
  
  /**
   * Cria e retorna o objeto DataTable da API.
   * Reponsável por definir os ados do gráfico.
   * 
   * @returns any
   */
  obterDataTable(): any {
    const dataTable = new google.visualization.DataTable();

    dataTable.addColumn('string', 'Mês');
    dataTable.addColumn('number', 'Quantidade');
    dataTable.addRows(this.dados);

    return dataTable;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico.
   * 
   * @returns any
   */
  obterOpcoes(): any {
    return {
      'title': 'Quantidade de cadastros primerio semestre',
      'width': 400,
      'height': 300
    };

  }
}
