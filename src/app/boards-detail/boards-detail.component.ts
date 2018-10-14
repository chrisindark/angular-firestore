import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FsService} from '../fs.service';


@Component({
  selector: 'app-boards-detail',
  templateUrl: './boards-detail.component.html',
  styleUrls: ['./boards-detail.component.css']
})


export class BoardsDetailComponent implements OnInit {
  board = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fs: FsService
  ) { }

  ngOnInit() {
    this.fs.getBoardLocal().subscribe(res => {
      if (res && res.id) {
        this.board = res;
        console.log('cache detail');
      } else {
        this.getBoardDetails(this.route.snapshot.params['id']);
      }
    });
  }

  getBoardDetails(id) {
    this.fs.getBoard(id)
      .subscribe(res => {
        this.board = res;
        this.fs.setBoardLocal(res).subscribe(res1 => {
          console.log(res);
        });
      });
  }

  deleteBoard(id) {
    this.fs.deleteBoard(id)
      .subscribe(res => {
          this.router.navigate(['/boards']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
