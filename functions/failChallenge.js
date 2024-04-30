exports = async function(challenge) {
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

    // Remove the failed challenge
    const updatedUser = await usersCollection.findOneAndUpdate(
      { username: userEmail },
      { $pull: { receivedChallenges: challenge } }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error failing challenge:", error);
    return { error: "An error occurred while failing the challenge" };
  }
};
