import fire from "../config/fire-config";

export default () => {
  const data = [];

  for (let i = 0; i < 5; i++) {
    const random = (Math.random() * 10).toString(16);

    fire().firestore().collection("showcase").add({
      title: random,
    });

    data.push({
      title: random,
    });
  }

  return data;
};
