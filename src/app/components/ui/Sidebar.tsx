import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeSlashOutline,
  IoPersonOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { signIn, signOut } from "@/auth";
import { auth } from "@/auth";

interface MenuItems {
  path: string;
  icon: React.ReactNode;
  title: string;
}

const menuItems: MenuItems[] = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
  },
  {
    path: "/dashboard/todos",
    icon: <IoCheckboxOutline size={30} />,
    title: "TODOS",
  },
  {
    path: "/dashboard/cookies",
    icon: <IoCodeSlashOutline size={30} />,
    title: "Cookies",
  },
  {
    path: "/dashboard/products",
    icon: <IoStorefrontOutline size={30} />,
    title: "Store",
  },
  {
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
    title: "Profile",
  },
];

export const Sidebar = async () => {
  const session = await auth();

  const username = session?.user?.name || "No Name";

  const roles = session?.token?.roles ?? '';

  const userImage =
    session?.user?.picture ||
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={userImage}
            alt="userimg"
            width={150}
            height={150}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {username}
          </h5>
          <span className="hidden text-gray-400 lg:block">{roles ? roles.map((role: string) => <span>{role}</span>) : 'not-user'}</span>
        </div>
        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((menuItem) => (
            <SidebarItem key={menuItem.path} {...menuItem} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        {!!session ? (
          <form
            action={async (formData) => {
              "use server";
              await signOut();
            }}
          >
            <button
              className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              type="submit"
            >
              <CiLogout />
              Sign out
            </button>
          </form>
        ) : (
          <>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Signin with GitHub</button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Signin with google</button>
            </form>
          </>
        )}
      </div>
    </aside>
  );
};
