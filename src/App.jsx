import {Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {Navbar,Footer} from './components/Layout';import {useAuth} from './lib/auth';
import Home from './pages/Home';import About from './pages/About';import Popular from './pages/Popular';import Create from './pages/Create';
import Auth from './pages/Auth';import My from './pages/My';import Editor from './pages/Editor';
const P=({children})=>{const {user,loading}=useAuth();if(loading)return <div className="pt-40 text-center">Yuklanmoqda…</div>;return user?children:<Navigate to="/auth" replace/>};
export default function App(){const l=useLocation();return <div className="min-h-screen"><Navbar/><Routes location={l}>
<Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/popular" element={<Popular/>}/>
<Route path="/auth" element={<Auth/>}/><Route path="/create" element={<P><Create/></P>}/><Route path="/my" element={<P><My/></P>}/>
<Route path="/editor/:id" element={<P><Editor/></P>}/><Route path="*" element={<Navigate to="/"/>}/></Routes><Footer/></div>}
