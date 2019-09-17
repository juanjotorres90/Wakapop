import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  // products: Product[];
  products;

  searchTerm: string = '';
  // filteredItems: Product[] = [];
  filteredItems = [];

  filteredProducts;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.products = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

  setFilteredItems() {
    this.filteredItems = [];
    console.log("Buscando: ", this.searchTerm);
   
    let include;

    this.products.map(product => {
      include = product.payload.doc.data().title.includes(this.searchTerm);
      if(include == true) {
        console.log('include!!!!', product.payload.doc.data().title);
        this.filteredItems.push(product);
      }
    }
    );

    console.log('Estos son los productos filtrados', this.filteredItems);
  }

}
