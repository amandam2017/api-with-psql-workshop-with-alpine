// const { default: axios } = require("axios");
// const { append } = require("express/lib/response");

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
        userInput: '',
        formfields: '',
        token: null,
        info_message: '',
        // error: false,
        init() {
            // console.log(this.show)
            if(localStorage['token'] !== undefined) {
                // send user to login screen
                // this.show = false;
                this.token = localStorage.getItem('token')
                this.showAll();
            }

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
                    // console.log(this.garments)
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
                        this.token = r.key;
                        localStorage.setItem('token', r.key)
                        
                        this
                            .showAll()
                            .then(() => this.show = true )
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


            fetch(url, options)
                .then(r => r.json() )
                // .then(r => console.log(r) )
                .then(r => {
                    if (r.status === 'success'){
                        // show the new data
                        this.showAll()

                        // show success message
                        this.info_message = 'New Garment has been added!';
                        setTimeout()

                        // clear the input forms
                        
                        this.description = '',
                        this.img = '',
                        this.price = '',
                        this.gender = '',
                        this.season = ''

                        // hide the form...
                        this.open = false;


                    } else if (r.status === 'error'){

                        // show the error message
                        const error = r.message;
                        this.info_message = error
                        this.error =true;
                        // stay on the form...
                    } 

                } ),

                setTimeout(() =>  { 
                    this.info_message = '';
                    this.error = false;
                    }, 3000);

        },

        deleteGament(id){
            axios
            .delete(`/api/garments/${id}`)
            .then(r => this.showAll())
            .catch(err => console.log(err))

        }

    }

    ));
})

