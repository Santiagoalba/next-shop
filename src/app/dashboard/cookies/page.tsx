import { TabBar } from "@/app/components/TabBar";
import { cookies } from 'next/headers'

export const metadata = {
 title: 'Cookies Page',
 description: 'This is a page used to save cookies.',
};

export default function CookiesPage() {
    const cookieStore = cookies();
    const selectedTab = Number(cookieStore.get('selectedTab')?.value) || 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar selectedTab={selectedTab}/>
      </div>
    </div>
  );
}