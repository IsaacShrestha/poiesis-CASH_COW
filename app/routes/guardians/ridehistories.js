import Ember from 'ember';

export default Ember.Route.extend({
    firebaseApp: Ember.inject.service(),
    beforeModel: function(){
        if(!this.get('session.isAuthenticated')){
        this.transitionTo('login');
        }      
        let user = this.get('firebaseApp').auth().currentUser;
        let id = user.uid;
        let _this = this;
        this.get('store').findRecord('user', id).then(function(rec){
            if (rec.get('role')!='guardians'){
                alert('Cannot access this page!');
                _this.transitionTo(rec.get('role'));
            }
            else{
                _this.get('store').findRecord('guardian', id).then(function(rec){},function(err){
                    alert('Create a profile first!!!');
                    _this.transitionTo('guardians.profile');
                });
            }
        });        
    },
    model(){
        let user = this.get('firebaseApp').auth().currentUser;
        let id = user.uid;
        let _this = this;
        return this.store.findAll('request').then(function(){
            return _this.store.filter('request', function(records){
                return records.get('requestedBy')==id;
            });
        });
    },
});