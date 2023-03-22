import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoodAPIService } from '../mood-api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private moodAPIService: MoodAPIService
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      post_id: ['', Validators.required],
      u_id: ['', Validators.required],
      likes: [0],
      content: ['', Validators.required],
      post_date: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    const post = this.postForm.value;

    this.moodAPIService.createPost(post).subscribe(() => {
      // navigate to the home page or wherever you want to go
      this.router.navigate(['/create_post']);
    });
  }
}
