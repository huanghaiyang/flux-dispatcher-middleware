# flux-dispatcher-packer
flux dispatcher 事件监听器，用于dispatch回调

# 安装
```
npm install flux-dispatcher-packer --save
```
# how to use
```javascript
const Dispatcher = require('flux-dispatcher-packer')(require('flux').Dispatcher)
```

```javascript
var flightDispatcher = new Dispatcher();

var CityStore = {
	city: null
};

flightDispatcher.register(function(payload) {
	if (payload.actionType === 'city-update') {
		CityStore.city = payload.selectedCity;
	}
});

flightDispatcher.on('afterDispatching', (payload) => {
	assert.equal(CityStore.city, payload.selectedCity)
})

flightDispatcher.on('afterDispatching', (payload) => {
	assert.equal(CityStore.city, payload.selectedCity)
})

flightDispatcher.dispatch({
	actionType: 'city-update',
	selectedCity: 'paris'
});

flightDispatcher.unbind('afterDispatching')

assert.equal(flightDispatcher.events['afterDispatching'], undefined)
```
