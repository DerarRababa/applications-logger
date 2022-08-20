import axios from 'axios'


export const fetchData = (dispatch)  => {
    axios.get(`${process.env.REACT_APP_API_END_POINT}a2fbc23e-069e-4ba5-954c-cd910986f40f`).then((res)=>{
        dispatch({
          type: 'GET_DATA',
          data: res
        })
     }) 
}
  

