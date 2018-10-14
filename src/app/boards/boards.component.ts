import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FsService } from '../fs.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})


export class BoardsComponent implements OnInit, OnDestroy {
  displayedColumns = ['title', 'description', 'author'];
  boards = [];
  getBoardsSubscription: Subscription = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fs: FsService,
  ) { }

  ngOnInit() {
    this.getBoardsSubscription = this.fs.getBoards()
      .subscribe(res => {
        console.log(res);
        this.boards = res;
      }, err => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    if (this.getBoardsSubscription) {
      this.getBoardsSubscription.unsubscribe();
    }
  }

  goToBoardsDetails(board) {
    this.fs.setBoardLocal(board).subscribe(res => {
      const id = board.id;
      this.router.navigate(['/boards-details', id]);
    });
  }

}
