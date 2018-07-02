import { element } from 'protractor';
import { CalculosService } from './../app.calculosService';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';
import * as jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService, CalculosService ]
})
export class HomeComponent implements OnInit {

  @ViewChild('content') content:ElementRef; 
  public modalValSaude: boolean =  false;
  public peso: number;
  public altura: number;
  public fa: any;
  public idade: number;
  public sexo: string;
  public imc: any;
  public ndc: any;
  public calDef: any;
  public tmb: any;
  public dadosPessoaForm: FormGroup;
  public ofertas: Oferta[];
  public gordura
  public carboidrato
  public proteina
  public modalCardapio = false;
  public modalValMetab = true;
  public faDesc;
  public relatorio =  false;

  ngOnInit() {
    this.ofertasService.getOfertas2()
      .then(( ofertas: Oferta[] ) => { 
        console.log('a função resolve() foi resolvida depois de 3 segundos')
        this.ofertas = ofertas
      })
      .catch(( param: any ) => { 
        console.log(param) 
      })
  }

  public atribuirVal(){
    this.peso =  this.dadosPessoaForm.value.peso;
    this.altura = this.dadosPessoaForm.value.altura;
    this.idade = this.dadosPessoaForm.value.idade;
    this.sexo = this.dadosPessoaForm.value.sexo;
    this.fa = this.dadosPessoaForm.value.fa;
  

  public gerarPDF(){
    let doc = new jsPDF();
    console.log('doc',doc)
    let specialElementHandlers = {
      '#editor': function(element, renderer){
      return true;
      }
    };

    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width':190,
      'elementHandlers': specialElementHandlers
    });
      doc.save('test.pdf')
  }

  public setStatusModal(){
    this.modalValMetab = true;
    this.modalValSaude =  false;
    this.modalCardapio = false;
  }

  public calcValMed(){
    this.tmb = this.calculosService.TMB(this.sexo, this.idade, this.altura, this.peso);
    this.ndc = this.calculosService.NDC(this.tmb,this.fa);
    this.calDef = this.calculosService.qtdCaloriasObj(this.ndc);
    this.imc = this.calculosService.IMC(this.peso, this.altura,this.sexo);
    this.proteina = this.calculosService.demandaProteina(parseFloat(this.ndc.toFixed(2)));
    this.carboidrato = this.calculosService.demandaCarboidrato(parseFloat(this.ndc.toFixed(2)));
    this.gordura = this.calculosService.demandaGordura(parseFloat(this.ndc.toFixed(2)));
    if(this.fa == 1.2) this.faDesc = "Sedentario"
    if(this.fa == 1.375) this.faDesc = "Atividade Leve"
    if(this.fa == 1.55) this.faDesc = "Atividade Moderada"
    if(this.fa == 1.725) this.faDesc = "Atividade Alta"
    if(this.fa == 1.9) this.faDesc = "Atividade Muito Alta"
  }

  public calcResult():void{
    let check = 0;
    if(this.dadosPessoaForm.value.peso < 14 || this.dadosPessoaForm.value.peso > 110){
      this.toastr.error( 'O peso deve ser menor que 45Kg ou maior que 110Kg', 'Peso Inválido', {
        timeOut: 3000,
        closeButton: true
      });
      check++;
      this.dadosPessoaForm.controls.peso.setValue('');
    }

    if(this.dadosPessoaForm.value.altua < 145 || this.dadosPessoaForm.value.altura > 195){
      this.toastr.error( 'A altura não deve ser maior que 195Cm ou menor que 140Cm', 'Altura Inválida', {
        timeOut: 3000,
        closeButton: true
      });
      check++;
      this.dadosPessoaForm.controls.altura.setValue('');
    }
    if(this.dadosPessoaForm.value.idade < 14 || this.dadosPessoaForm.value.idade > 65){
      this.toastr.error( 'A idade não deve ser maior que 65 anos ou menor que 14 anos', 'Idade Inválida', {
        timeOut: 3000,
        closeButton: true
      });
      check++;
      this.dadosPessoaForm.controls.idade.setValue('');
    }
    if(this.dadosPessoaForm.value.fa.lenght > 1){
      this.toastr.error( 'Escolha somente uma opção de FA', 'Quantidade de FA Inválida', {
        timeOut: 3000,
        closeButton: true
      });
      check++;
      this.dadosPessoaForm.controls.idade.setValue('');
    }
    if(this.dadosPessoaForm.value.fa.length > 1){
      this.toastr.error( 'Escolha somente uma opção de FA', 'Quantidade de FA Inválida', {
        timeOut: 3000,
        closeButton: true
      });
      check++;
      this.dadosPessoaForm.controls.idade.setValue('');
    }
    if(check !== 0){
      this.calcValMed();
      this.dadosPessoaForm.controls.fa.setValue('');
    }
    if(check === 0){
      this.calcValMed();
      this.calcValMed();
      this.trocarModal();
    }
  }

  public trocarModal(){
    this.modalValMetab = false;    
    this.modalValSaude =  true;
  }

  public trocarModalCardapio(){
    this.modalValSaude =  false;
    this.modalCardapio = true;
  }

  public limpar():void{
    this.dadosPessoaForm.controls.peso.setValue('');
    this.dadosPessoaForm.controls.altura.setValue('');
    this.dadosPessoaForm.controls.idade.setValue('');
    this.dadosPessoaForm.controls.sexo.setValue('');
    this.dadosPessoaForm.controls.fa.setValue('');
  }

  constructor(private toastr: ToastrService, private calculosService: CalculosService,
    private ofertasService: OfertasService, private formBuilder: FormBuilder) {
    this.dadosPessoaForm = this.formBuilder.group({
      peso: ['', Validators.required],
      altura: ['', Validators.required],
      idade: ['', Validators.required],
      sexo: ['', Validators.required],
      fa: ['', Validators.required],
    });
  }
}
