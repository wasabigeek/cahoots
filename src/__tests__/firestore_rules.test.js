const firebase = require("@firebase/testing");

const PROJECT_ID = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG).projectId;

const myUid = "1234"
const myAuth = { uid: myUid, email: "user@example.org" }
const otherUid = "5678"
const otherAuth = { uid: otherUid, email: "other_user@example.org" }

const initAdminDb = () => firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
const initDb = ({ auth }) => firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();


beforeEach(async() => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

describe("games collection", () => {
  it("allows get always", async() => {
    const db = firebase.initializeTestApp({ projectId: PROJECT_ID }).firestore();
    const testDoc = db.collection("games").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  })

  it ("allows write if user owns the game", async() => {
    const adminDb = initAdminDb();
    const setupDoc = await adminDb.collection("games").add({ ownerId: myUid });

    const db = initDb({ auth: myAuth });
    const testDoc = await db.collection("games").doc(setupDoc.id);
    await firebase.assertSucceeds(testDoc.set({ wasabi: "geek" }));
  });

  it ("does not allow write if user does not own the game", async() => {
    const adminDb = firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
    const setupDoc = await adminDb.collection("games").add({ ownerId: myUid });

    const db = initDb({ auth: otherAuth });
    const testDoc = await db.collection("games").doc(setupDoc.id);
    await firebase.assertFails(testDoc.set({ wasabi: "geek" }));
  });


  // it("allows listing if ", () => {
  //   const db = firebase.initializeTestApp({
  //     projectId: PROJECT_ID,
  //     auth: { uid: "alice", email: "alice@example.com" }
  //   });
  //   const testDoc = db
  // })
});
