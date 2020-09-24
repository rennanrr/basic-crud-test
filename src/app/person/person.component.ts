import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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
        const index = this.persons.map(person => {return person.id}).indexOf(this.person.id);
        this.person.updatedAt = new Date(Date.now());
        this.persons[index] = this.person;
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
    if(confirm('Tem certeza de que deseja excluir esta pessoa?')) {
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