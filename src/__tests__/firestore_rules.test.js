const firebase = require("@firebase/testing");
const { default: Game } = require("../entities/Game");

const PROJECT_ID = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG).projectId;

const myUid = "1234"
const myAuth = { uid: myUid, email: "user@example.org" }
const otherUid = "5678"
const otherAuth = { uid: otherUid, email: "other_user@example.org" }

const initAdminDb = () => firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
const initDb = (options = {}) => {
  const { auth } = options;
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();
}


beforeEach(async() => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

describe("get games", () => {
  it("allows get always", async() => {
    const db = initDb();
    const testDoc = db.collection("games").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });
});

describe("write games", () => {
  it ("allows write if user owns the game", async() => {
    const adminDb = initAdminDb();
    const setupDoc = await adminDb.collection("games").add({ ownerId: myUid });

    const db = initDb({ auth: myAuth });
    const testDoc = db.collection("games").doc(setupDoc.id);
    await firebase.assertSucceeds(testDoc.set({ wasabi: "geek" }));
  });

  it ("does not allow write if user does not own the game", async() => {
    const adminDb = firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
    const setupDoc = await adminDb.collection("games").add({ ownerId: myUid });

    const db = initDb({ auth: otherAuth });
    const testDoc = db.collection("games").doc(setupDoc.id);
    await firebase.assertFails(testDoc.set({ wasabi: "geek" }));
  });
});

describe("list games", () => {
  it("does not normally allow listing ", async() => {
    const db = initDb();
    const query = db.collection("games");
    await firebase.assertFails(query.get());
  });

  it("allows listing of owned games", async() => {
    const db = initDb({ auth: myAuth });
    const query = db.collection("games").where("ownerId", "==", myUid);
    await firebase.assertSucceeds(query.get());
  });

  it("allows search of games by shortCode", async() => {
    const db = initDb();
    const query = db.collection("games")
      .where("shortCode", "==", 123)
      .where("state", "==", Game.STATE_WAITING_FOR_PLAYERS);
    await firebase.assertSucceeds(query.get());
  });
});
