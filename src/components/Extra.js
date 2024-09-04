import React from 'react';
import ReactDOM from 'react-dom';

import Star from './Star.js'
export default function Extra(){


    let [data,setdata]=React.useState(
        {
            name:"ankit dubey",
            cont:766454511,
            isfav:true
        }
    )

    

    function clickk(){
        setdata(
            prevstate=>{
                return(
                    {
                        ...prevstate,
                        istrue:!prevstate.istrue
                    }
                )
            }
        )
    }
 return(
   <Star 
     isfilled={data.istrue}
     clik={clickk}
    
   />
 )

};