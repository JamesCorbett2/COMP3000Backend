exports = async function addChallengesToInventory(username, packName) {
  try {
    // Access the MongoDB Atlas service
    const mongodb = context.services.get("mongodb-atlas");
    const usersCollection = mongodb.db("ProjectGeam").collection("UserData");
    const packsCollection = mongodb.db("ProjectGeam").collection("PackData");
    
    // Find the user and pack documents by their IDs
    const user = await usersCollection.findOne({ username: username });
    const pack = await packsCollection.findOne({ packName:packName });
    
    if (!user) {
      return { success: false, message: "User not found" };
    }
    
    if (!pack) {
      return { success: false, message: "Pack not found" };
    }
    
    user.inventory = user.inventory || [];
    user.inventory.push(...pack.packContent);
    
    // Update the user document with the new inventory
    await usersCollection.updateOne(
      { username:username },
      { $set: { inventory: user.inventory } }
    );
    
    // Return a success message
    return { success: true, message: "Challenges added to inventory successfully" };
  } catch (error) {
    // Handle any errors and return an error message
    console.error("Error adding challenges to inventory:", error);
    return { success: false, message: "Failed to add challenges to inventory" };
  }
};
