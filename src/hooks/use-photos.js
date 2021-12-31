import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.production.min";
import UserContext from '../context/user';
import { getPhoto, getUserByUserId } from '../services/firebase'

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const { user: {uid: userId = ''} } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const {following} = await getUserByUserId(userId);
      let followedUserPhotos = [];

      if(following.length > 0) {
        followedUserPhotos = await getPhoto(userId, following)
      }
    }
    console.log(userId);
  }, [])

  return {photos};
}