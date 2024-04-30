exports = async function addChallengesToInventory(username, packID) {
  try {
    // Access the MongoDB Atlas service
    const mongodb = context.services.get("mongodb-atlas");
    const usersCollection = mongodb.db("ProjectGeam").collection("UserData");
    const packsCollection = mongodb.db("ProjectGeam").collection("PackData");
    
    // Find the user and pack documents by their IDs
    const user = await usersCollection.findOne({ username: username });
    const pack = await packsCollection.findOne({ _id :packID });
    
    if (!user) {
      return false;
    }
    
    if (!pack) {
      return false ;
    }
    
    user.inventory = user.inventory || [];
    user.inventory.push(...pack.packContent);
    
    // Update the user document with the new inventory
    await usersCollection.updateOne(
      { username:username },
      { $set: { inventory: user.inventory } }
    );
    
    // Return a success message
    return true;
  } catch (error) {
    // Handle any errors and return an error message
    console.error("Error adding challenges to inventory:", error);
    return false ;
  }
};
