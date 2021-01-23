import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServiceService } from 'src/app/core/services/global-service.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.css']
})
export class FaturamentoComponent implements OnInit {
  meses: number[];
  mes = 0;
  nomeCliente = '';
  nome = '';
  valorFatura = 0;
  habilitarBotaoPesquisar = false;
  mostrarCard = false;
  mostrarCardVazio = false;
  modelChanged = new Subject<string>();
  constructor(private router: Router, private globalServiceService: GlobalServiceService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    this.modelChanged.pipe(debounceTime(300)).subscribe(() => {
      if (this.nomeCliente.length >= 3 && this.mes > 0) {
        this.habilitarBotaoPesquisar = true;
      }
      if (this.nomeCliente.length < 3) {
        this.habilitarBotaoPesquisar = false;
      }
    });
  }

  ngOnInit(): void {
  }
  pesquisarServico(): void {
    this.globalServiceService
      .pesquisarServicos(this.nomeCliente, this.mes.toString())
      .subscribe(
        (resp) => {
          console.log(resp);
          if (resp === null || resp.length === 0) {
            this.mostrarCard = false;
            this.mostrarCardVazio = true;
          }
          if (resp !== null && resp.length > 0) {
            this.mostrarCard = true;
            this.nome = resp[0].nomeCliente;
            this.valorFatura = resp.length * 0.10;
            this.mostrarCardVazio = false;
          }
          this.nomeCliente = null;
          this.mes = null;
          this.habilitarBotaoPesquisar = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  pesquisar(): void {
    this.modelChanged.next();
  }
}
