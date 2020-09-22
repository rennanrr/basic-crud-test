import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList:User[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    
  }

  openUser(id) {
    
  }

}
