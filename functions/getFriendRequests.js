exports = async function getFriendRequests() {
  const currentUser = context.user;
  if (!currentUser || !currentUser.id) {
    return { success: false, message: "User not authenticated" };
  }
  
  const friendRequestsCollection = context.services.get("mongodb-atlas").db("ProjectGeam").collection("FriendRequests");
  const friendRequests = await friendRequestsCollection.find({ recipientId: currentUser.data.email }).toArray();

  return {friendRequests: friendRequests};
};
