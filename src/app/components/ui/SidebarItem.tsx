'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    path: string;
    icon: React.ReactNode;
    title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {

    const pathname = usePathname();

  return (
        <li>
            {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
            <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${pathname === path && 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'}`}>
                {icon}
                <span className="-mr-1 font-medium hover:text-blue-300">{title}</span>
            </Link>
        </li>
  )
}
