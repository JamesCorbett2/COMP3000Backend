exports = async function(senderId, recipientId, _id) {
  const usersCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("UserData");
  const requestsCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("FriendRequests");

  if (!senderId || !recipientId || !_id) {
    return { error: "Invalid input. SenderId, recipientId, and requestId are required." };
  }

  try {
    // Add recipientId to senderId's friend list
    const senderUpdateResult = await usersCollection.updateOne(
      { username: senderId },
      { $addToSet: { friends: recipientId } }
    );

    if (senderUpdateResult.modifiedCount !== 1) {
      return { error: "Failed to add recipientId to senderId's friend list." };
    }

    // Add senderId to recipientId's friend list
    const recipientUpdateResult = await usersCollection.updateOne(
      { username: recipientId },
      { $addToSet: { friends: senderId } }
    );

    if (recipientUpdateResult.modifiedCount !== 1) {
      // Rollback the previous update if the second update fails
      await usersCollection.updateOne(
        { username: senderId },
        { $pull: { friends: recipientId } }
      );
      return { error: "Failed to add senderId to recipientId's friend list." };
    }

    // Delete the friend request
    const deleteResult = await requestsCollection.deleteOne({ _id: _id });
    if (deleteResult.deletedCount !== 1) {
      return { error: "Failed to delete the friend request." };
    }

    return true;
  } catch (error) {
    return false;
  }
};

