document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({

        garments: [],
        seasonFilter: '',
        genderFilter: '',
        maxPrice: 0,
        init() {
            fetch('/api/garments')
                .then(r => r.json())
                .then(results => {
                    // console.log(results)
                    this.garments = results.data
                    // console.log(this.garments)
                })

        },
        filterData() {
            console.log(this.genderFilter)
            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
                .then(r => r.json())
                .then(results => this.garments = results.data)
                .catch(err => console.log('No data'))
        },

        priceFilter() {
            console.log(this.maxPrice);
            fetch(`/api/garments/price/${this.maxPrice}`)
                .then(r => r.json())
                .then(function (myresults) {
                    this.garments = myresults.data
                    console.log(this.garments);
                })
                .catch(err => console.log(err))
        }

    }));
})