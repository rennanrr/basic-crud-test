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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.person = new Person();
    }, (reason) => {
      this.person = new Person();
    });
  }

  addPerson(): void{
    if(this.person.id === undefined) {
      this.person.id = this.id;
      this.id++;
      this.personList = [...this.personList, this.person];
      this.person = new Person();
    }
    this.modalService.dismissAll();
  }

  openPerson(content, person?): void{
    this.delete();
    this.person = person;
    this.open(content);
  }

  delete(): void{
    if(confirm('Tem certeza de que deseja excluir esta pessoa?'))
    console.log('confirmou');
  }

}
