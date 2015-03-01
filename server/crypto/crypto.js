var openpgp = Meteor.npmRequire('openpgp');
var Future = Meteor.npmRequire('fibers/future');

function generateKeysPromiseHandler (promise) {
  var future = new Future();
    promise.then(function (result) {
      var private = result.privateKeyArmored;
      var public = result.publicKeyArmored;
      future.return({private: private, public: public});
    }, function (error) {
      future.throw(error);
    });
    return future.wait();
}

Meteor.methods({
  generateKeyPair: function (keyName, userId, passphrase) {
    var keys = openpgp.generateKeyPair({
      numBits: 1024, // Need to test speed on VPS.
      userId: userId,
      passphrase: passphrase
    });
    return keys;
  },
  encrypt: function (message) {
    console.log("got message to encrypt!", message);
    return 'returning message';
  }
});
