exports = (user) => {
  // use collection that Custom User Data is configured on
  const collection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");

  // insert custom data into collection, using the user id field that Custom User Data is configured on
  const doc = collection.insertOne({ Id: user.id, name: user.data.name });
};
