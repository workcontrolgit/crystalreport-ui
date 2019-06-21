import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

import { HttpClient } from '@angular/common/http';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  name = 'Angular 5';
  fileUrl: any;
  public fileName: string;

  constructor(private quoteService: QuoteService, private _httpClient: HttpClient, private _FileSaverService: FileSaverService) { }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });
  }
  onDown(type: string, fromRemote: boolean) {
    this.isLoading = true;
    const fileName = `EmployeeProfile.${type}`;
    if (fromRemote) {
      this._httpClient.get(`http://localhost:11444/api/Details/Report/DownloadReport`, {
        observe: 'response',
        responseType: 'blob'
      })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe(res => {
        this._FileSaverService.save(res.body, fileName);
      });
      return;
    }
  }
}
