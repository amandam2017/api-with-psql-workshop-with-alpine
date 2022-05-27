
document.addEventListener('alpine:init', () => {

    Alpine.data('app', () => ({

        garments: [],
        seasonFilter: '',
        genderFilter: '',
        maxPrice: 0,
        description: '',
        img: '',
        price: '',
        gender: '',
        season: '',
        username: 'amandam2017',
        userInput: '',
        init() {
            this.showAll();

        },
        showAll(){
            fetch('/api/garments')
                .then(r => r.json())
                .then(results => {
                    console.log(results)
                    this.garments = results.data
                    console.log(this.garments)
                })
        },

        filterData() {
            // console.log(this.genderFilter)
            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
                .then(r => r.json())
                .then(results => this.garments = results.data)
                .catch(err => console.log('No data'))
        },

        priceFilter() {
            console.log(this.maxPrice);
            fetch(`/api/garments/price/${this.maxPrice}`)
                .then(r => r.json())
                .then(myResults => this.garments = myResults.data)
                .catch(err => console.log(err))
        },

        addGarments() {
            url = `/api/garment`
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    description:this.description,
                    img:this.img,
                    price:this.price,
                    gender:this.gender,
                    season:this.season,
                }),
            };

            fetch(url, options)
                .then(r => (this.showAll()))
                let myResults= this.showAll()
                
                .then(myResults => this.garments = myResults.data)
        },

        login(){

        }

    }

    ));
})

