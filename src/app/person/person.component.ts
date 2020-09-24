import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from './person.service';

import { Person } from './Person';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: Person[] = [];
  person: Person = new Person();
  id: number = 0;
  validation: Person = new Person();
  lengthStorage: number = 0;

  constructor(private modalService: NgbModal,
    private personService: PersonService) { }

  ngOnInit(): void {
    let localStorage: Person[] = this.personService.getLocalStorageData();
    this.lengthStorage = localStorage ? localStorage.length : 0;
    this.persons = localStorage ? localStorage : [];
  }

  importLocalStorage(): void{
    if(confirm('Tem certeza de que deseja importar os dados locais? Todas as informações que ainda não estão salvas serão perdidas.')){
      let localStorage: Person[] = this.personService.getLocalStorageData();
      this.persons = localStorage ? localStorage : [];
    }
  }

  saveLocalStorage(): void{
    if(confirm('Tem certeza de que deseja salvar? Todas as informações que já estão salvas serão alteradas pelas atuais.')){
      this.personService.setLocalStorageData(this.persons);
      this.lengthStorage = this.persons ? this.persons.length : 0;
    }
  }

  cleanLocalStorage(): void{
    if(confirm('Tem certeza de que deseja excluir os dados locais? Todas as informações salvas serão perdidas.')){
      this.personService.deleteLocalStorageData();
    }
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      this.person = new Person();
      this.validation = new Person();
    });
  }

  save(): void{
      if(this.person.id === undefined) {
        this.person.id = this.id;
        this.person.createdAt = new Date(Date.now());
        this.id++;
        this.persons = [...this.persons, this.person];
      }
      else {
        if(confirm(`Tem certeza de que deseja editar ${this.person.name}?`)){
          const index = this.persons.map(person => {return person.id}).indexOf(this.person.id);
          this.person.updatedAt = new Date(Date.now());
          this.persons[index] = this.person;
        }
      }
      this.person = new Person();
      this.validation = new Person();
      this.modalService.dismissAll();
  }

  edit(content, person): void{
    this.person = {...person};

    this.openModal(content);
    this.validation.name = 'is-valid';
    this.validation.cellphone = 'is-valid';
    this.validation.cpf = 'is-valid';
  }

  delete(person): void{
    if(confirm(`Tem certeza de que deseja excluir ${this.person.name}?`)) {
      const index = this.persons.map(e => {return e.id}).indexOf(person.id);
      this.persons.splice(index, 1);
      this.person = new Person();
      this.validation = new Person();
      this.modalService.dismissAll();
    }
  }

  verify(attribute, value): void{
    switch(attribute){
      case 'name':
        this.validation.name = 
          value?
          'is-valid' : 'is-invalid';
        break;

      case 'cellphone':
        this.person.cellphone = value;
        this.validation.cellphone = 
          value.match('^\(.+\)[0-9]{2}\(.+\){2}[0-9]{2}\(.+\){2}[0-9]{5}\-[0-9]{4}$')?
          'is-valid' : 'is-invalid';
        break;

      case 'cpf':
        this.person.cpf = value;
        this.validation.cpf = 
          value.match('^[0-9]{3}.[0-9]{3}.[0-9]{3}\-[0-9]{2}$') && this.isValidCPF(value)?
          'is-valid' : 'is-invalid';
          break;
    }
  }

  isValidCPF(cpf): boolean {
    const arrayCpf = cpf.replace(/\D/g,'').split('');
    const arrayWeight = [[10,9,8,7,6,5,4,3,2], [11,10,9,8,7,6,5,4,3,2]];
    var calcCD = [0, 0];

    for(let x = 0; x < arrayWeight.length; x++) {
      for(let y = 0; y < arrayWeight[x].length; y++) {
        calcCD[x] += arrayWeight[x][y] * arrayCpf[y];
      }
      calcCD[x] = (calcCD[x] * 10) % 11;
      calcCD[x] = calcCD[x] === 10 ? 0 : calcCD[x];
    }
    return (calcCD[0] == arrayCpf[9] && calcCD[1] == arrayCpf[10]) ? true : false;
  }
}