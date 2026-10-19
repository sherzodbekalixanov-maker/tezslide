import {createContext,useContext,useEffect,useState} from 'react';import {supabase} from './supabase';
const C=createContext();export const useAuth=()=>useContext(C);
export function AuthProvider({children}){const [user,setUser]=useState(null),[loading,setL]=useState(true);
useEffect(()=>{supabase.auth.getSession().then(({data})=>{setUser(data.session?.user??null);setL(false)});
const {data:s}=supabase.auth.onAuthStateChange((_e,ses)=>setUser(ses?.user??null));return()=>s.subscription.unsubscribe()},[]);
return <C.Provider value={{user,loading}}>{children}</C.Provider>}
