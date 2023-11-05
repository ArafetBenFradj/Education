import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  addNewsForm: FormGroup;
  imagePreview: string;
  newsId: any;
  news: any = {};
  btnTitle: string = "Add News";
  bannerTitle: string = "Add-Form"
  title: string = "Add News";
  text: string = "";
  date: Date = new Date();
  constructor(private formBuilder: FormBuilder, private newsService: NewsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.addNewsForm = this.formBuilder.group({
      nameNews: ['', [Validators.required, Validators.minLength(3)]],
      descriptionNews: ['', [Validators.required, Validators.minLength(10)]],
      img: [''],
    });
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.btnTitle = "Edit News";
      this.bannerTitle = "Edit-Form"
      this.newsService.getNewsById(this.newsId).subscribe((response) => {
        this.news = response.news;
        this.imagePreview = this.news.imgNews;
      });
    }
  }
  addOrEditNews() {
    this.addNewsForm.value.dateNews = this.date;
    if (this.newsId) {
      this.newsService.editNews(this.newsId, this.news, this.addNewsForm.value.img).subscribe((response) => {
        console.log("here reponse Add Match from BE", response.newsIsUpdated);
        if (response.newsIsUpdated) {
          this.router.navigate(["admin"]);
        }
      });
    } else {
      this.newsService.addNews(this.addNewsForm.value, this.addNewsForm.value.img).subscribe((response) => {
        console.log("here response from BE", response.message);
        this.router.navigate(["admin"]);
      });
    }

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addNewsForm.patchValue({ img: file });
    this.addNewsForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
