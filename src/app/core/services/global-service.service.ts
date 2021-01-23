import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DadosRequisicaoCNPJ } from '../modal/dados-requisicao-cnpj';
import { DadosRequisicaoCPF } from '../modal/dados-requisicao-cpf';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  HOST: string;
  PATH = '/v1/api/dados';
  URL: string;
  constructor(private http: HttpClient) {
    this.HOST = environment.apiUrl;
    this.URL = `${this.HOST}${this.PATH}`;
  }

  pesquisarServicos(nome: string, mes: string): Observable<any[]> {
    const httpParams = new HttpParams()
    .set('nome', nome)
    .set('mes', mes);
    const url = `${this.URL}/pesquisar?` + httpParams.toString();
    return this.http.get<any[]>(url);
   }

  validarDadoCPF(cpf: DadosRequisicaoCPF): Observable<any>{
    return this.http.post<any>(`${this.URL}/cpf`, cpf);
  }

  validarDadoCNPJ(cnpj: DadosRequisicaoCNPJ): Observable<any>{
    return this.http.post<any>(`${this.URL}/cnpj`, cnpj);
  }
}
