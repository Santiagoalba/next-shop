"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ProfilePage () {
  const session = useSession();
  if(session.data === null) return;
  const userData = session.data.session.user;

  return (
    <div>
      { 
        userData ? (
        <div>
          <h1 className="text-2xl mb-2">Usuario client side</h1>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <div className="flex items-center">
            <span className="mr-2">User image</span>
            <Image src={userData.image} height={45} width={45} alt="usr-img" className="rounded-full mt-2"/>
          </div>
        </div>
        ) : (<h1>Not logged in</h1>)
      }
    </div>
  );
}
