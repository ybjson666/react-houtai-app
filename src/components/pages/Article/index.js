import React, { Component } from 'react'
import { Card,Button,Table,Modal,message } from 'antd'
import moment from 'moment'
import xlsx from 'xlsx'


import { getArticles,deleArticle } from './../../../utils/api';


const ButtonGroup=Button.Group



const formatTitle={
    id:"id",
    title:"标题",
    author:"作者",
    createTime:"创建时间",
    amount:"阅读量"
}

export default class ArticleList extends Component {

    state={
        articleList:[],
        articleColums:[],
        total:0,
        isLoading:false,
        offset:0,
        limited:10
    }
    componentDidMount(){

        this.fetchArticles()
            
    }

    fetchArticles=async()=>{

        const {offset,limited}=this.state;

        this.setState({isLoading:true});
        const res=await getArticles({offset,limited});
        
        const articleList=res.list;
        const total=res.total;    
        const articleColums=Object.keys(res.list[0]).map((item)=>{
         
        return  {
                    title:formatTitle[item],
                    dataIndex:item,
                    key:item,
                    render:item==='createTime'?(record)=>(<span>{moment(record).format('YYYY-MM-DD')}</span>):null,
                    align:"center"
                }
      })

      articleColums.push({
          title:"操作",
          dataIndex:"action",
          align:"center",
          render:(text,record)=>{
            return  (<ButtonGroup>
                        <Button size="small" type="primary" onClick={()=>{this.toEdit(record)}}>编辑</Button>
                        <Button size="small" type="danger" onClick={()=>{this.deleArticle(record)}}>删除</Button>
                    </ButtonGroup>)
          }
      })
     
      this.setState({
          articleList,
          articleColums,
          isLoading:false,
          total
      })

    }

    pageChange=(page,pageSize)=>{
        this.setState({
            offset:(page-1)*pageSize,
            limited:pageSize
        },()=>{
            this.fetchArticles()
        })
    }

    toExcell=()=>{

        //组合数据

        // 这样一步写也可以  const data=[Object.keys(this.state.articleList[0]).map((item)=>formatTitle[item])];
        let data=[Object.keys(this.state.articleList[0])];
            data[0]=data[0].map((item)=>formatTitle[item]);
       
        for(let i=0;i<this.state.articleList.length;i++){
            let dataIem=this.state.articleList[i];
            dataIem.createTime=moment(dataIem.createTime).format('YYYY-MM-DD');
            data.push(Object.values(dataIem))
        }

        const ws=xlsx.utils.aoa_to_sheet(data);
        const wb=xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb,ws,"SheetJS");
        xlsx.writeFile(wb,`react${moment().format('YYYY-MM-DD')}sheetjs.xlsx`);
    }

    deleArticle=(record)=>{
        let that=this;
        Modal.confirm({
            title:`确定要删除${record.title}吗?`,
            content:`此操作不可逆，请谨慎！！`,
            cancelText:"我点错了",
            onOk(){
                deleArticle(record.id).then((res)=>{
                    message.success(res.msg);
                    setTimeout(()=>{
                        that.setState({
                            offset:0
                        },()=>{
                            that.fetchArticles()
                        })
                        
                    },1000)
                })
            }
        })
    }
    toEdit=(record)=>{
        this.props.history.push({pathname:`/admin/article/edit/${record.id}`,state:{title:record.title}});
    }

    render() {
        
        return (
            <div>
                <Card
                    title="文章列表"
                    bordered={false}
                    extra={ <Button type="primary" onClick={this.toExcell}>导出 excell</Button> }
                >
                <Table

                    dataSource={this.state.articleList}
                    columns={this.state.articleColums}
                    rowKey="id"
                    pagination={
                        {
                            total:this.state.total,
                            hideOnSinglePage:true,
                            onChange:this.pageChange,
                            showQuickJumper:true,
                            current:(this.state.offset / this.state.limited)+1
                        }
                    }
                    loading={this.state.isLoading}
                />
                </Card>
            </div>
        )
    }
}
