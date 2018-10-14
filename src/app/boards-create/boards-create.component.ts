import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl, FormGroupDirective, FormBuilder,
  FormGroup, NgForm, Validators
} from '@angular/forms';

import { FsService } from '../fs.service';


@Component({
  selector: 'app-boards-create',
  templateUrl: './boards-create.component.html',
  styleUrls: ['./boards-create.component.css']
})


export class BoardsCreateComponent implements OnInit {
  title = '';
  description = '';
  author = '';
  boardsForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fs: FsService,
  ) { }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.fs.postBoards(form)
      .subscribe(res => {
        form['id'] = res['id'];
        this.fs.setBoardLocal(form).subscribe(res1 => {
          this.router.navigate(['/boards-details', form['id']]);
        });
      }, (err) => {
        console.log(err);
      });
  }
}
