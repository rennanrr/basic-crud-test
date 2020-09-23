import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Person } from './Person';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  personList: Person[] = [];
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
        this.id++;
        this.personList = [...this.personList, this.person];
      }
      else {
        const index = this.personList.map(person => {return person.id}).indexOf(this.person.id);
        this.personList[index] = this.person;
      }
      this.person = new Person();
      this.validation = new Person();
      this.modalService.dismissAll();
  }

  edit(content, person): void{
    console.log(person);
    this.person.id = person.id; 
    this.person.name = person.name; 
    this.person.cellphone = person.cellphone;
    this.person.cpf = person.cpf; 
    this.openModal(content);
    this.verify('name', person.name);
    this.verify('cellphone', person.cellphone);
    this.verify('cpf', person.cpf);
  }

  delete(person): void{
    if(confirm('Tem certeza de que deseja excluir esta pessoa?')) {
      const index = this.personList.map(e => {return e.id}).indexOf(person.id);
      this.personList.splice(index, 1);
      this.person = new Person();
      this.validation = new Person();
      this.modalService.dismissAll();
    }
  }

  verify(attribute, value): void{
    console.log(value);
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
          console.log(this.validation);
        break;

      case 'cpf':
        this.person.cpf = value;
        this.validation.cpf = 
          value.match('^[0-9]{3}.[0-9]{3}.[0-9]{3}\-[0-9]{2}$')?
          'is-valid' : 'is-invalid';
          break;
    }
  }
}