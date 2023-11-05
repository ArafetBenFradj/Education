import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsURl: string = "http://localhost:3000/news";
  constructor(private http: HttpClient) { }
  addNews(news : any , file :File){
    let formData = new FormData();
    formData.append("nameNews",news.nameNews);
    formData.append("dateNews",news.dateNews);
    formData.append("descriptionNews",news.descriptionNews);
    formData.append("img",file);
    return this.http.post<{ message: string }>(this.newsURl +"/addNews" , formData);
  }
  editNews(id :any , news : any ,file : File) {
    const formData = new FormData();
    formData.append('_id' , news.id);
    formData.append('nameNews' , news.nameNews);
    formData.append('dateNews' , news.dateNews);
    formData.append('descriptionNews', news.descriptionNews);
    formData.append('img', file);
    return this.http.put<{ newsIsUpdated: boolean }>(`${this.newsURl }/editNews/${id}`, formData);
   }
    // Request : Boolean
  deleteNews(id : any) { 
    return this.http.delete<{ message: string }>(`${this.newsURl}/deleteNews/${id}`)
  }
  getAllNews(){
    return this.http.get<{allNews : any}>(this.newsURl );
  }
  getNewsById(id :any){
    return this.http.get<{news : any}>(`${this.newsURl}/getNewsById/${id}`);
  }

}
