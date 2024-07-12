'use client';

import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

interface Props {
    selectedTab?: number;
    tabOptions? : number[];
}



export const TabBar = ({ tabOptions = [1,2,3,4], selectedTab = 1}: Props) => {

    const [ selected, setSelected ] = useState( selectedTab );

    useEffect(() => {
        const tabCookie = getCookie('selectedTab');
        let initialTab = selectedTab;
    
        if (tabCookie) {
          const tabNumber = Number(tabCookie);
          if (!isNaN(tabNumber) && tabNumber >= 1 && tabNumber <= tabOptions.length) {
            initialTab = tabNumber;
          } else {
            initialTab = 1; // Default value if the cookie is invalid
            setCookie('selectedTab', initialTab.toString())
          }
        }
    
        setSelected(initialTab);
      }, [selectedTab, tabOptions.length]);

    const handleSelectTab = (tab: number) => {
        setSelected(tab);
        setCookie('selectedTab', tab.toString() );
    }

    return (

        <div className={`
                grid w-full space-x-2 rounded-xl bg-gray-200 p-2
                ${ 'grid-cols-' + tabOptions.length }
            `}>
            
            
            {
                tabOptions.map((tab) => (
                    <div key={tab}>
                        <input 
                            checked={selected === tab}
                            type="radio" 
                            id={tab.toString()} 
                            className="peer hidden"
                            onChange={() => {}}
                        />

                        <label 
                            onClick={() => handleSelectTab(tab)}
                            className=" transition-all block cursor-pointer select-none rounded-xl check p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                        >
                            {tab}
                        </label>
                    </div>
                ))
            }
        </div>

    )
}