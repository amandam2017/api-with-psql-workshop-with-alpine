document.addEventListener('alpine:init', () => {
    // alert("!")
    Alpine.data('app', () => ({
        garments : [],
        init() {
            const self = this;
        	fetch('/api/garments')
        		.then(r => r.json())
        		.then(userData => {
                    self.garments = userData.data
                })
        },
        
    }));
})