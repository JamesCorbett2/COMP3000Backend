exports = async function(userEmail) {
  const usersCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
  
  try {
    // Find the user document by email
    const user = await usersCollection.findOne({ username: userEmail });
    
    if (!user) {
      return { error: "User not found" };
    }
    
    // Extract the friends array from the user document
    const friends = user.friends || [];
    
    return friends;
  } catch (error) {
    console.error("Error retrieving user friends:", error);
    return { error: "An error occurred while retrieving user friends" };
  }
};

