import axios from 'axios'
import React, { useState, useEffect } from 'react'


const Item = () => {

    
    const [List, SetList] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [currentpage, setcurrentpage]= useState(1);

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


    const handledelete=(key)=>{
        const newList = [...List]
        newList.splice(key,1);
        SetList(newList);
    }


    const handleclick = (page)=>{
        setcurrentpage(page);
    }

    const startindex = (currentpage -1) * 6;
    const endindex = startindex + 6;
    const data = List.slice(startindex, endindex)

  return (
    <>
    { 
       Loading && <div className="spinner-border" role="status">
       <span className="sr-only"></span>
     </div>
    }
    {!Loading && 
    <div className='container my-3'>
        <div className='row'>
            {
                data && data.map((item, key)=>(
                    <div className='col-md-4 my-2' key={key}>
                        <div className="card" style={{"width": "18rem" , "height":"20rem"}}>
                            <div className="card-body">
                            <button onClick={(key)=> handledelete(key)} style={{"border":"none","color":"red", "textAlign":"end"}}>X</button>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.body}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        <div className='container d-flex justify-content-between'>
            {
                Array.from({length: List.length/6},(_,index)=> index+1).map(
                    (page)=>(
                        <button key={page} onClick={()=>handleclick(page)} disabled={currentpage===page}>{page}</button>
                    )
                )
            }
        </div>

    </div>
}
    </>
  )
}

export default Item