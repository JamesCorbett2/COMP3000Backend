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

    // Update user points and remove the completed challenge
    const updatedUser = await usersCollection.findOneAndUpdate(
      { username: userEmail },
      { $inc: { points: 100 }, $pull: { receivedChallenges: challenge } }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error completing challenge:", error);
    return { error: "An error occurred while completing the challenge" };
  }
};
