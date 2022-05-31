// const { default: axios } = require("axios");

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
        show: false,
        // username: 'amandam2017',
        userInput: '',
        token: null,
        init() {
            console.log(this.show)
            if(localStorage['token'] !== undefined) {
                // send user to login screen
                // this.show = false;
                this.token = localStorage.getItem('token')
                this.showAll();
            } 
            // this.filterData();
            // this.addGarments();
            // this.priceFilter();

        },
        logout(){
            this.show = false;
            localStorage.clear()
        },
        showAll() {
            return fetch('/api/garments')
                .then(r => r.json())
                .then(results => {
                    console.log(results)
                    this.garments = results.data
                    this.show = true;
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



        login() {
            url = `/api/login`
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    username: this.userInput,
                }),
            }

            fetch(url, options)
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.key) {
                        console.log(r.key, '--');
                        this.token = r.key;
                        localStorage.setItem('token', r.key)
                        
                        this
                            .showAll()
                            .then(() => this.show = true )

                        // .then(myResults => {
                        //     this.garments = myResults.data
                        // });
                    } else {
                        alert('not logged in!')
                    }
                })
            
            
            
            

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
                    description: this.description,
                    img: this.img,
                    price: this.price,
                    gender: this.gender,
                    season: this.season,
                }),
            };

            const message = 'garment added successfully'

            fetch(url, options)
                .then(r => (this.showAll()))
            let myResults = this.showAll()

                .then(myResults => this.garments = myResults.data);

            this.description = '',
                this.img = '',
                this.price = '',
                this.gender = '',
                this.season = ''
        },



    }

    ));
})

