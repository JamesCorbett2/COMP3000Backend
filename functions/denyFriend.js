exports = async function(_id) {
  const friendRequestsCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("FriendRequests");

  if (!_id) {
    return { error: "Invalid input. RequestId is required." };
  }

  try {
    // Delete the friend request
    const deleteResult = await friendRequestsCollection.deleteOne({ _id: _id });
    
    if (deleteResult.deletedCount !== 1) {
      return { error: "Failed to delete the friend request." };
    }

    return true;
  } catch (error) {
    return false;
  }
};
