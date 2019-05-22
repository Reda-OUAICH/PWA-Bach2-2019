import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../../services/merchant/merchant.service'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    providers: [ MerchantService ]
})

export class HomePageComponent implements OnInit {

    /* Déclaration */
    public merchantCollection: Array<any>
    public merchantCollectionRaw: Array<any>
    public categoriesCollectionSlug: Array<string>
    public categoriesCollection: Array<any>
    public activeCategory: string

    constructor(
        private MerchantService: MerchantService
    ) { 
        this.categoriesCollectionSlug = []
        this.categoriesCollection = []
        this.activeCategory = 'all'
    }

    /*
        Call the function from MerchantService to fetch data from api
    */
    private getMerchantList = () => {
        this.MerchantService.readAllItems()
        .then( apiResponse => {
            this.getMerchantCategories(apiResponse.data)
            this.merchantCollectionRaw = apiResponse.data
            this.merchantCollection = apiResponse.data
        })
        .catch( apiResponse => console.error(apiResponse))
    }

    /*
        Map over all merchant categories 
        and filter to fill array with onne occurrence of each
    */
    private getMerchantCategories = (data: any) => {
        data.map((item: any) => {
            item.category.isActive = false
            if(this.categoriesCollectionSlug.indexOf(item.category.slug) === -1) {
                this.categoriesCollectionSlug.push(item.category.slug)
                this.categoriesCollection.push(item.category)
            }
        })
    }

    /*
        Filter merchant using the slug of the button category
        and display the appropriate results
    */
    public sortMerchant = (cat: any) => {
        this.activeCategory = cat.slug
        this.merchantCollection = this.merchantCollectionRaw
        let filteredMerchant = this.merchantCollectionRaw.filter(merchant => merchant.category.slug === cat.slug)
        this.merchantCollection = filteredMerchant
    }

    ngOnInit() {
        this.getMerchantList()
    }

}
