import Ember from 'ember';

export default Ember.Route.extend({
    firebaseApp: Ember.inject.service(),
    beforeModel: function(){
        if(!this.get('session.isAuthenticated')){
        this.transitionTo('login');
        }             
    },
    model() {
        let user = this.get('firebaseApp').auth().currentUser;
        let id = user.uid;
        let email = this.set('loginEmail', user.email);
        
        return this.get('store').findRecord('guardian', id).then(function(userProfile){
          return userProfile;
        },function(){
          return null;
        });
    },
    actions:{
        updateprofile(){
            let controller = this.get('controller');
            let email = controller.get('email');
            let password = controller.get('password');
            let name = controller.get('name');
            let address = controller.get('address');
            let phone = controller.get('phone');
            let kidemail = controller.get('kidemail');
            let _this = this;
            let user = this.get('firebaseApp').auth().currentUser;
            let id = user.uid;
            this.get('store').findRecord('guardian', id).then(function(record){
                if (name) {
                    record.set('name', name);
                }
                else{
                    if (!record.get('name')){alert('Enter name');throw new Error('Enter data');}
                    record.set('name', record.get('name'));
                }
                if (address){
                    record.set('address', address);
                }
                else{
                    if (!record.get('address')){alert('Enter address');throw new Error('Enter data');}
                    record.set('address', record.get('address'));
                }
                if (phone){
                    record.set('phone', phone);
                }
                else{
                    if (!record.get('phone')){alert('Enter phone');throw new Error('Enter data');}
                    record.set('phone', record.get('phone'));
                }
                if (kidemail){
                    record.set('kidEmails', kidemail);
                }
                else{
                    if (!record.get('kidEmails')){alert('Enter kids email');throw new Error('Enter data');}
                    record.set('kidEmails', record.get('kidEmails'));
                }
                record.save();
            }, function(){
                let newProfile = _this.get('store').createRecord('guardian', {
                    id: id,
                    name: name,
                    address: address,
                    phone: phone,
                    kidEmails: kidemail
                });
                newProfile.save().then(function(){
                    alert("Profile created!!");
                })
            });
            if(password){
                user.updatePassword(password).then(function(){
                    alert('Profile Updated!!');
                });
            }
        }
    }
});
