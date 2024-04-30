exports = async function() {
  const currentUser = context.user;
  
  if (!currentUser) {
    return { error: "User not authenticated" };
  }

  const userEmail = currentUser.data.email; // Assuming email is used as the user identifier
  const usersCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
  
  try {
    // Find the user document by email
    const user = await usersCollection.findOne({ username: userEmail });
    
    if (!user) {
      return { error: "User not found" };
    }
    
    // Extract the received challenges array from the user document
    const receivedChallenges = user.receivedChallenges || [];
    
    return receivedChallenges;
  } catch (error) {
    console.error("Error retrieving received challenges:", error);
    return { error: "An error occurred while retrieving received challenges" };
  }
};
