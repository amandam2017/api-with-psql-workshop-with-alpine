
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
            // this.filterData();
            // this.addGarments();
            // this.priceFilter();

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

        

        login(){
            app.post('/api/login', cors(), function (req, res, next) {

                // get the username using ES6 constructor
                const { username } = req.body;
                console.log(username);
                // const username = req.body.username;
            
                if (username === adminUser.username) {
            
                    const key = generateAccessToken({username});
            
                    res.json({key})
                }
                else {
                    res.json({
                        message: 'User not allowed to login',
                        status: 401
                    })
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
                    description:this.description,
                    img:this.img,
                    price:this.price,
                    gender:this.gender,
                    season:this.season,
                }),
            };

            const message = 'garment added successfully'

            fetch(url, options)
                .then(r => (this.showAll()))
                let myResults= this.showAll()
                
                .then(myResults => this.garments = myResults.data);

                this.description= '',
                this.img = '',
                this.price = '',
                this.gender = '',
                this.season = ''
        },

        

    }

    ));
})

