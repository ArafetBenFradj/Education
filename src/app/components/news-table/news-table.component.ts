import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css']
})
export class NewsTableComponent implements OnInit {
  news: any;
  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.newsService.getAllNews().subscribe((response) => {
      this.news = response.allNews;
    });
  }
  goToDisplayEdit(id: any) {
    this.router.navigate([`editNews/${id}`]);

  }
  deleteNews(id: any) {
    this.newsService.deleteNews(id).subscribe((responseDelete) => {
      if (responseDelete.message == "1") {
        this.newsService.getAllNews().subscribe((responseGet) => {
          this.news = responseGet.allNews;
        });

      }

    });
  }

}
