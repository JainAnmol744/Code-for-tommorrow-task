import React,{useEffect,useState} from 'react'
import Postcontext from './UseContext'
import axios from 'axios'
const Store = (props) => {
    
    const [List, SetList] = useState([]);
    const [currentpage, setcurrentpage]= useState(1);
    const [Loading, setLoading] = useState(true);
   

useEffect(()=>{
    const fetch = ()=>{
        setTimeout(async()=>{

            const data = await axios.get('https://jsonplaceholder.typicode.com/posts')
            if(data){
    
                SetList(data.data);
                setLoading(false);
            }

        }, 5000)
      
    }

    fetch();
},[])


const startindex = (currentpage -1) * 6;
const endindex = startindex + 6;

const data = List.slice(startindex, endindex)
const handledelete=(key)=>{
    const newList = [...List]
    newList.splice(key,1);
    SetList(newList);
}


const handleclick = (page)=>{
    setcurrentpage(page);
}




const sharedValue={
    Loading:Loading,
    delete:handledelete,
    click:handleclick,
    data:data,
    List:List
    
}

  return (
    <>
    <Postcontext.Provider value={sharedValue}>
        {props.children}
    </Postcontext.Provider>
    </>
  )
}

export default Store