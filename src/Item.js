
import React, { useContext } from 'react'
import UseContext from './UseContext'

const Item = () => {

 const {List,data,Loading}=useContext(UseContext);
 const context=useContext(UseContext);
 const handleclick=(page)=>{
    context.click(page)
    
    
}
const handledelete=(key)=>{
    context.delete(key)
}


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
                        <button key={page} onClick={()=>handleclick(page)} >{page}</button>
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