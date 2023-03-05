import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: { hl: "en", gl: "US" },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_YOUTUBE_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

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