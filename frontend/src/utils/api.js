import axios from "axios";

export const fetchDataFromApi = async (obj) => {

 // const {data}= await axios.get(`${BASE_URL}/${url}`,options);
  const { data } = await axios(obj
  //   {
  //   method: method,
  //   url: `http://localhost:3001/${url}`,
  //   params:params,
  //   headers:headers,
  //   data: body,
  // }
  );
 // console.log(data.data)
  return data.data;


  // axios({
  //   method: method,
  //   url: `http://localhost:3001/${url}`,
  //   data: body,
  // })
  //   .then(function (response) {
  //     console.log(response);
  //     alert("add successfully");
  //     return response.data.data
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};
