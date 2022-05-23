document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({

        garments: [],
        seasonFilter: '',
        genderFilter: '',
        init() {
            fetch('/api/garments')
                .then(r => r.json())
                .then(results => {
                    console.log(results)
                    this.garments = results.data
                    console.log(this.garments)

                })

        },
        filterData() {
            console.log(this.genderFilter)
            fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
            .then(r => r.json())
            .then(results=>{
                console.log(results);
                this.garments = results.data
                console.log(this.garments);
            }).catch(err => console.log('No data'))

                // .then(function (result) {
                //     console.log(result.data);
                //     this.garments = result.data

                // }).catch(err => console.log('No data'))
        }



    }));
})