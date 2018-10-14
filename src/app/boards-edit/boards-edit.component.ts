import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { FsService } from '../fs.service';


@Component({
  selector: 'app-boards-edit',
  templateUrl: './boards-edit.component.html',
  styleUrls: ['./boards-edit.component.css']
})


export class BoardsEditComponent implements OnInit {
  boardsForm: FormGroup;

  board: null;
  id: '';
  title: '';
  description: '';
  author: '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fs: FsService,
  ) { }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required]
    });

    this.fs.getBoardLocal().subscribe(res => {
      if (res && res.id) {
        this.board = res;
        this.id = res.id;
        console.log('cache edit');
        this.setBoardFormData(res);
      } else {
        this.getBoardDetails(this.route.snapshot.params['id']);
      }
    });
  }

  setBoardFormData(data) {
    this.boardsForm.setValue({
      id: data.id,
      title: data.title,
      description: data.description,
      author: data.author
    });
  }

  getBoardDetails(id) {
    this.fs.getBoard(id).subscribe(data => {
      this.id = data.id;
      this.setBoardFormData(data);
    });
  }

  onFormSubmit(form: NgForm) {
    const id = form['id'];

    this.fs.updateBoard(id, form)
      .subscribe(res => {
        this.fs.setBoardLocal(form).subscribe(res1 => {
          console.log('cache edit', res1);
          this.router.navigate(['/boards-details', this.id]);
        });
      }, (err) => {
        console.log(err);
      });
  }

  goToBoardsDetails() {
    this.router.navigate(['/boards-details', this.id]);
  }
}
