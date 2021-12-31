import { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const {user} = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    if(user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return {user: activeUser};
}

