const Dispatcher = require('../tasks/index')(require('flux').Dispatcher)
import _ from 'lodash'

const assert = require('chai').assert;
describe('flux Dispatcher', function() {
	describe('create a flux Dispatcher', function() {
		it('should be a new Dispatcher', function() {

			var flightDispatcher = new Dispatcher();

			assert.equal(_.isObject(flightDispatcher.events), true)

		});
	});

	describe('test super dispatcher', function() {
		it('dispatch ok', function() {

			var flightDispatcher = new Dispatcher();

			// Keeps track of which country is selected
			var CountryStore = {
				country: null
			};

			// Keeps track of which city is selected
			var CityStore = {
				city: null
			};

			flightDispatcher.register(function(payload) {
				if (payload.actionType === 'city-update') {
					CityStore.city = payload.selectedCity;
				}
			});

			flightDispatcher.dispatch({
				actionType: 'city-update',
				selectedCity: 'paris'
			});

			assert.equal(CityStore.city, 'paris')


			CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
				if (payload.actionType === 'country-update') {
					CountryStore.country = payload.selectedCountry;
				}
			});

			flightDispatcher.dispatch({
				actionType: 'country-update',
				selectedCountry: 'australia'
			});

			assert.equal(CountryStore.country, 'australia')

		});
	});

	describe('test new dispatcher', function() {
		it('dispatch ok', function() {

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

		});
	});
});