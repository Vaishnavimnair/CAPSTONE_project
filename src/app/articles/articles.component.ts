import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { ArticlesService } from '../articles.service'; // Import the ArticlesService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, SlicePipe],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  selectedArticle: any = null; // Property to store the selected article for the modal
  isModalOpen: boolean = false; // Property to control modal visibility

  constructor(private articlesService: ArticlesService) {} // Inject the ArticlesService

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articlesService.getArticles().subscribe((data) => {
      this.articles = data; // Assign fetched articles to the articles property
      this.filteredArticles = this.articles; // Initially show all articles
    });
  }

  filterArticles(category: string): void {
    this.filteredArticles =
      category === 'all'
        ? this.articles
        : this.articles.filter((article) => article.category === category);
  }

  openModal(article: any): void {
    this.selectedArticle = article; // Set the selected article
    this.isModalOpen = true; // Open the modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Close the modal
  }
}
