import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.map(user => user.data().length > 0);  
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase
  .firestore()
  .collection('users')
  .where('userId', '==', userId)
  .get();

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id 
  }))

  return user; 
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase
  .firestore()
  .collection('users')
  .limit(10)
  .get();
  
  return result.docs
    .map(user => ({...user.data(), docId: user.id}))
    .filter(profile => profile.userId !== userId && !following.includes(profile.userId)); 
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile = false) {
  return await firebase
  .firestore()
  .collection('users')
  .doc(loggedInUserDocId)
  .update({
    following: isFollowingProfile ? 
      FieldValue.arrayRemove(profileId) : 
      FieldValue.arrayUnion(profileId)
  });

}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowedProfile = false) {
  return await firebase
  .firestore()
  .collection('users')
  .doc(profileDocId)
  .update({
    followers: isFollowedProfile ? 
      FieldValue.arrayRemove(loggedInUserDocId) : 
      FieldValue.arrayUnion(loggedInUserDocId)
  })
}

export async function getPhotos(userId, following) {
  const result = await firebase
  .firestore()
  .collection('photos')
  .where('userId', 'in', following)
  .get();
  
  return result.docs
    .map(user => ({...user.data(), docId: user.id}))
    .filter(profile => profile.userId !== userId && !following.includes(profile.userId)); 
}