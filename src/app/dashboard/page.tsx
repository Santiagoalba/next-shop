import Image from 'next/image';
import { WidgetItem } from '../components/ui/WidgetItem';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';


export const metadata = {
 title: 'Dashboard page',
 description: 'Dashboard page',
};

export default async function DashboardPage() {

  const session = await auth();

  if (!session?.user) {
    redirect('api/auth/signin')
  }

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">  
     
        <WidgetItem title="Usuario conectado Server side">
          <div className='flex justify-start items-start'>
            <Image className='mr-4 object-contain rounded-full' src={session?.user.picture} width={100} height={100} alt="User Avatar" />
            <div className='flex flex-col border text-black text-sm mt-4'>
              <span>User: {session?.user.name}</span>
              <span>Email: {session?.user.email}</span>
            </div>
          </div>
        </WidgetItem> 
         
      </div>  
    </div>
  );
}