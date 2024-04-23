exports = async function getPacks(username) {
  try {
    const mongodb = context.services.get("mongodb-atlas");
    const packsCollection = mongodb.db("ProjectGeam").collection("PackData");

    const packs = await packsCollection.find({});
    const resultDocument = { packs: packs };

    return resultDocument;
  } catch (error) {
    console.error("Error fetching packs:", error);
    return { error: "An error occurred while fetching packs" };
  }
};
