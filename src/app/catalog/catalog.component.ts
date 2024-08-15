import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  isCheckboxVisible = false;
  blocks: any[] = [];
  filteredBlocks: any[] = [];
  activeCategory: 'Womens' | 'Mens' | 'Unisex' | null = null;
  isClickedWomen = false;
  isClickedMen = false;
  isClickedUnisex = false;
  sortOption: string = ''; // To store the selected sort option

  // Array of image URLs
  imageUrls: string[] = [
    'ring0.png',
    'ring1.png',
    'ring2.png',
    'ring3.png',
    'ring4.png',
    'ring5.png',
    'ring6.png',
    'ring7.png',
    'ring8.png',
    'ring9.png',
    'ring10.png',
    'ring11.png',
    'ring12.png',
    'ring13.png',
    'ring14.png',
    'ring15.png',
    'ring0.png',
    'ring1.png',
    'ring2.png',
    'ring3.png',
    'ring4.png',
    'ring5.png',
    'ring6.png',
    'ring7.png',
    'ring8.png',
    'ring9.png',
    'ring10.png',
    'ring11.png',
    'ring12.png',
    'ring13.png',
    'ring14.png',
    'ring15.png',
    'ring0.png',
    'ring1.png',
    'ring2.png',
    'ring3.png',
    'ring4.png',
    'ring5.png',
    'ring6.png',
    'ring7.png',
    'ring8.png',
    'ring9.png',
    'ring10.png',
    'ring11.png',
    'ring12.png',
    'ring13.png',
    'ring14.png',
    'ring15.png',

    // Add more image URLs as needed
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.blocks = data;
      this.assignRandomImages(); // Assign random images after fetching products
      this.filteredBlocks = this.blocks; // Initially show all products
    });
  }

  // Method to assign random images to each product block
  assignRandomImages(): void {
    this.blocks.forEach((block) => {
      block.randomImage = this.getRandomImageUrl();
    });
  }

  // Method to get a random image URL
  getRandomImageUrl(): string {
    return this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
  }

  toggleCategory(category: 'Womens' | 'Mens' | 'Unisex') {
    this.activeCategory = this.activeCategory === category ? null : category;

    this.isClickedWomen =
      category === 'Womens' && this.activeCategory === 'Womens';
    this.isClickedMen = category === 'Mens' && this.activeCategory === 'Mens';
    this.isClickedUnisex =
      category === 'Unisex' && this.activeCategory === 'Unisex';

    this.filterBlocks();
  }

  filterBlocks() {
    if (this.activeCategory !== null) {
      this.filteredBlocks = this.blocks.filter(
        (block) =>
          block.prodmeta_section.toLowerCase() ===
          this.activeCategory!.toLowerCase()
      );
    } else {
      this.filteredBlocks = this.blocks; // Show all products if no category is selected
    }

    // Apply sorting after filtering
    this.sortBlocks();
  }

  sortBlocks() {
    if (this.sortOption === 'Low to High') {
      this.filteredBlocks.sort(
        (a, b) => a.attr_14k_regular - b.attr_14k_regular
      );
    } else if (this.sortOption === 'High to Low') {
      this.filteredBlocks.sort(
        (a, b) => b.attr_14k_regular - a.attr_14k_regular
      );
    }
  }

  onSortChange(event: any) {
    this.sortOption = event.target.value;
    this.filterBlocks(); // Re-filter and sort based on the selected option
  }

  rateProduct(block: any, rating: number): void {
    block.rating = rating;
  }
  onStyleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.isCheckboxVisible = selectElement.value === 'Show';
  }
}
