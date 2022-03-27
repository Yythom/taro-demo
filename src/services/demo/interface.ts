const A = {
	name: 1,
	age: 2,
}
function getOf<T extends Object, K extends keyof T>(obj: T, key: K,) {
	return obj[key]
}


getOf(A, 'name',)