import React, {useState,useEffect} from 'react';
import './Count.css';
import firebaseApp from '../../firebase'

let getCountData = firebaseApp.functions().httpsCallable('getCountData')

const Count = (props) => {
    
  const [counts, setCounts] = useState([])
  console.log('count',counts)
  useEffect(()=>{

    getCountData({service: 'SERVICE_NAME'}).then((result)=>{
      console.log('result',result)
      setCounts(result.data)
    }).catch((error)=>{
      // Getting the Error details.
      var code = error.code
      var message = error.message
      var details = error.details
      console.log('error:',error)
    })

  },[])

  return (
    <div className="counts">
      <h1>Counts</h1>
      {counts && Object.keys(counts).length > 0 && 
        Object.keys(counts).map((countKey)=>{
          let count = counts[countKey]
          console.log('count = ',count)
          return(
            <div>
              {/* <h3>{count.title}</h3>
              <p>{count}</p> */}
            </div>
          )
        })
      }
    </div>
  )

}

export default Count
