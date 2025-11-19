import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ad } from './models/ad.model';
import { AdsService } from './services/ads.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  ads: Ad[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private adsService: AdsService) {}

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.isLoading = true;
    this.error = null;

    this.adsService.getAds().subscribe({
      next: (data: Ad[]) => {        
        this.ads = data;
        this.isLoading = false;
      },
      error: (err: any) => {         
        console.error('Failed to load ads', err);
        this.error = 'Failed to load ads from server';
        this.isLoading = false;
      }
    });
  }
}
