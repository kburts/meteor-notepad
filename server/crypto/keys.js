/* Keys Collection */
/*
 * Schema:
 * _id
 * userId
 * key
 */

PublicKeys = new Mongo.Collection("publickeys");
PrivateKeys = new Mongo.Collection("privatekeys");

Meteor.publish('keys', function () {
  var query = {userId: Meteor.userId()};
  var options = {fields: {key: 1}};
  var public = PublicKeys.find(query, options);
  return public;
});
