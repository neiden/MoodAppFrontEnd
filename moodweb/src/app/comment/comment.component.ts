import { Component, Input } from '@angular/core';
import { CommentData } from 'src/models/account';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
@Input() commentData!: CommentData; 



}
