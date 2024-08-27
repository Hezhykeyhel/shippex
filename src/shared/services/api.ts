import axios from 'axios';

const API_BASE_URL = 'https://shippex-demo.bc.brandimic.com/api/method';

export const useLogin = async (usr, pwd) => {
  try {
    const formData = new FormData();
    formData.append('usr', usr);
    formData.append('pwd', pwd);

    const response = await axios.post(`${API_BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error?.response === undefined) {
      throw {message:"Couldn't perform your request. Please make sure your phone has an Internet connection and try again",data:null}
    }
    const {status,data} = error?.response;
    
    if (status >= 400 || status <= 499) {
      throw {message: data.message || "Currently unable to connect to server, Please try again",data:null}
    }
    throw {message:"Couldn't perform your request. Please make sure your phone has an Internet connection and try again",data:null}
  }
};


export const getShipmentStatusList = async () => {
  try {
    const formData = new FormData();
    formData.append('doctype', 'AWB Status');
    formData.append('fields', JSON.stringify(['*']));

    const response = await axios.get(`${API_BASE_URL}/frappe.client.get_list`, {
      params: {
        doctype: 'AWB Status',
        fields: JSON.stringify(['*']),
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const {status,data} = error?.response;
    
    if (status >= 400 || status <= 499) {
      throw {message: data.message || "Currently unable to connect to server, Please try again",data:null}
    }
    throw {message:"Couldn't perform your request. Please make sure your phone has an Internet connection and try again",data:null}
  }
  }


  export const getShipmentList = async (searchTerm) => {
    try {
      const requestBody = {
        doctype: 'AWB',
        fields: ['*'],
        filters: {
          name: ['like', `%${searchTerm}%`],
        },
      };
  
      const response = await axios.get(`${API_BASE_URL}/frappe.client.get_list`, {
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }catch (error) {
      console.log(error?.response);
      
      const {status,data} = error?.response;
      
      if (status >= 400 || status <= 499) {
        throw {message: data.message || "Currently unable to connect to server, Please try again",data:null}
      }
      throw {message:"Couldn't perform your request. Please make sure your phone has an Internet connection and try again",data:null}
    }
  };