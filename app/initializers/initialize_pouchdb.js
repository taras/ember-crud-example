import Photo from 'ember-crud-example/models/photo';
import {get_initializer} from 'ember-pouchdb/get_initializer';

var initializePouchDB = get_initializer({
	docTypes: {
		photo: Photo
	}	
});

export default initializePouchDB;