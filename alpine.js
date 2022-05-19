Alpine.data('users', () => ({
    init() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(r => r.json())
			.then(userData => this.users = userData )
    },
	users : []
}));