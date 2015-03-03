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
  generateKeyPair: function (keyName, passphrase) {
    var userId = Meteor.userId();
    var keys = openpgp.generateKeyPair({
      numBits: 1024, // Need to test speed on VPS.
      userId: userId,
      passphrase: passphrase
    });
    keys = generateKeysPromiseHandler(keys);
    var public = PublicKeys.insert({
      key: keys.public,
      userId: userId,
      added: new Date()
    });
    var private = PrivateKeys.insert({
      key: keys.private,
      userId: userId,
      added: new Date()
    });

    return {public: public, private: private};
  },
  encrypt: function (message, publicKeyId) {
    var pubicKey = PublicKeys.findOne({
      _id: publicKeyId,
      userId: Meteor.userId()
    });
    openpgpPublic = openpgp.readArmored(publicKey.key);
    openpgp.encryptMessage(openphpPublic.keys, message).then(function (message) {
      console.log("Encrypted message:", message);
    }).catch(function (error) {
      throw new Meteor.Error("Could no encrypt message", error);
    });
  }
});
