import {Link,NavLink,useNavigate} from 'react-router-dom';import {Menu,X,Sparkles} from 'lucide-react';import {useState} from 'react';
import {useAuth} from '../lib/auth';import {supabase} from '../lib/supabase';
const L=[['/','Bosh sahifa'],['/about','Biz haqimizda'],['/popular','Shablonlar'],['/create','Yaratish'],['/my','Mening slaydlarim']];
export function Navbar(){const {user}=useAuth(),nav=useNavigate(),[o,setO]=useState(false);
return <header className="fixed top-0 inset-x-0 z-50 glass !rounded-none"><div className="max-w-6xl mx-auto flex items-center justify-between p-4">
<Link to="/" className="flex items-center gap-2 font-extrabold text-xl"><Sparkles className="text-purple-400"/><span className="grad">TezSlide</span></Link>
<nav className="hidden md:flex gap-6 text-sm">{L.map(([to,l])=><NavLink key={to} to={to} className={({isActive})=>isActive?'text-cyan-300':'text-white/70 hover:text-white'}>{l}</NavLink>)}</nav>
<div className="hidden md:block">{user?<button className="glass px-4 py-2" onClick={async()=>{await supabase.auth.signOut();nav('/')}}>Chiqish</button>:<Link to="/auth" className="btn">Kirish</Link>}</div>
<button className="md:hidden" onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button></div>
{o&&<div className="md:hidden p-4 flex flex-col gap-3" onClick={()=>setO(false)}>{L.map(([to,l])=><Link key={to} to={to}>{l}</Link>)}<Link to="/auth">Kirish / Ro'yxatdan o'tish</Link></div>}</header>}
export const Footer=()=><footer className="border-t border-white/10 mt-20 p-10 text-center text-white/60 text-sm"><div className="grad text-xl font-bold mb-2">TezSlide</div>
<div className="flex justify-center gap-5 mb-3">{L.map(([to,l])=><Link key={to} to={to}>{l}</Link>)}</div>© {new Date().getFullYear()} TezSlide. Barcha huquqlar himoyalangan.</footer>
