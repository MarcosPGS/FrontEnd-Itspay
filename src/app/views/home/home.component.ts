import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosRequisicaoCNPJ } from 'src/app/core/modal/dados-requisicao-cnpj';
import { DadosRequisicaoCPF } from 'src/app/core/modal/dados-requisicao-cpf';
import Swal from 'sweetalert2';
import { GlobalServiceService } from '../../core/services/global-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;
  valor: string;
  resposta: any;

  constructor(
    private fb: FormBuilder, private globalServiceService: GlobalServiceService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      valor: ['', Validators.required]
    });
  }

  validarDados(): void{
    this.valor = this.formulario.value.valor;
    if (this.formulario.value.valor.length === 11) {
      this.globalServiceService.validarDadoCPF(this.montarObjetoIncluirCPF(this.valor)).subscribe( resp => {
        this.resposta = resp;
        this.validarMensagem(this.resposta.mensagem);
        this.formulario.reset();
      });
    }

    if (this.formulario.value.valor.length === 14) {
      this.globalServiceService.validarDadoCNPJ(this.montarObjetoIncluirCNPJ(this.valor)).subscribe( resp => {
        this.resposta = resp;
        this.validarMensagem(this.resposta.mensagem);
        this.formulario.reset();
      });
    }


  }

  validarMensagem(msg: any): void {
    if (msg === 'CPF válido.' || msg === 'CNPJ válido.') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: msg,
        showConfirmButton: false,
        timer: 3500
      });
    }
    if (msg === 'CPF inválido.' || msg === 'CNPJ inválido.'){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: msg,
        showConfirmButton: false,
        timer: 3500
      });
    }
  }

  public montarObjetoIncluirCPF(valor: string): DadosRequisicaoCPF {
    const cpf = {
      idCliente: 1,
        cpf: valor
      };
    return cpf;
  }

  public montarObjetoIncluirCNPJ(valor: string): DadosRequisicaoCNPJ {
    const cnpj = {
      idCliente: 1,
        cnpj: valor
      };
    return cnpj;
  }
}
