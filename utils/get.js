import fire from "../config/fire-config";

const getMovies = async (db) => {
  return new Promise((resolve) => {
    db.collection("showcase")
      .get()
      .then((snap) => {
        const movies = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        resolve(movies);
      });
  });
};

export default async () => {
  const db = await fire().firestore();
  const result = await getMovies(db);

  return result;
};
