document.addEventListener('alpine:init', () => {
    // alert("!")
    Alpine.data('app', () => ({
        // garmentOne: '',
        garments : [],
        init() {
            // const self = this;
        	fetch('/api/garments')
        		.then(r => r.json())
        		.then(userData => {
                    console.log(userData)

                    this.garments = userData.data
                    console.log(this.garments)
                })
        },
        
    }));
})