import Loadable from 'react-loadable';
import Loading from '../components/common/Loading';

//懒加载
const Login=Loadable({
    loader:()=>import('../components/pages/Login'),
    loading:Loading
})
const DashBoard=Loadable({
    loader:()=>import('../components/pages/DashBoard'),
    loading:Loading
})
const NotFound=Loadable({
    loader:()=>import('../components/pages/NotFound'),
    loading:Loading
})
const Settings=Loadable({
    loader:()=>import('../components/pages/Settings'),
    loading:Loading
})
const ArticleList=Loadable({
    loader:()=>import('../components/pages/Article'),
    loading:Loading
})
const ArticleEdit=Loadable({
    loader:()=>import('../components/pages/Article/ArticleEdit'),
    loading:Loading
})

export const mainRoutes=[
    {
        pathname:'/login',
        component:Login
    },
    {
        pathname:'/404',
        component:NotFound
    } 
]

export const admainRoutes=[
    {
        pathname:'/admin/dashboard',
        component:DashBoard,
        title:"仪表盘",
        isNav:true,
        icon:"dashboard"
    },
    {
        pathname:'/admin/article',
        component:ArticleList,
        exact:true,
        title:"文章管理",
        isNav:true,
        icon:"book"
    },
    {
        pathname:'/admin/article/edit/:id',
        component:ArticleEdit,
        title:"文章编辑",
        isNav:false,
        icon:"book"
    },
    {
        pathname:'/admin/settings',
        component:Settings,
        title:"设置",
        isNav:true,
        icon:"setting"
    }
]


