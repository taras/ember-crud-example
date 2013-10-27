import Photo from 'ember-crud-example/models/photo';
import {initializer} from 'ember-pouchdb/initializer';

var initializePouchDB = initializer({
	docTypes: {
		photo: Photo
	}	
});

export default initializePouchDB;