import { getBaseUrl } from "@/shared/store/baseUrl";
import { routes } from "@/shared/store/routes";
import axios from "axios";

export const authLogin = async (usr: string | Blob, pwd: string | Blob) => {
  try {
    const formData = new FormData();
    formData.append("usr", usr);
    formData.append("pwd", pwd);

    const response = await axios.post(
      `${getBaseUrl().method}/${routes.login}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: unknown | any) {
    if (error?.response === undefined) {
      throw {
        message:
          "Couldn't perform your request. Please make sure your phone has an Internet connection and try again",
        data: null,
      };
    }
    const { status, data } = error?.response;

    if (status >= 400 || status <= 499) {
      throw {
        message:
          data.message ||
          "Currently unable to process your request, please try again later",
        data: null,
      };
    }
    throw {
      message:
        "Couldn't perform your request. Please make sure your phone has an Internet connection and try again",
      data: null,
    };
  }
};

export const checkShipmentStatus = async () => {
  try {
    const formData = new FormData();
    formData.append("doctype", "AWB Status");
    formData.append("fields", JSON.stringify(["*"]));

    const response = await axios.get(
      `${getBaseUrl().method}/${routes.getshipmentStatus}`,
      {
        params: {
          doctype: "AWB Status",
          fields: JSON.stringify(["*"]),
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error: unknown | any) {
    const { status, data } = error?.response;

    if (status >= 400 || status <= 499) {
      throw {
        message:
          data.message ||
          "Currently unable to process your request, please try again later",
        data: null,
      };
    }
    throw {
      message:
        "Couldn't perform your request. Please make sure your phone has an Internet connection and try again",
      data: null,
    };
  }
};

export const getShipmentList = async (searchTerm: any) => {
  try {
    const requestBody = {
      doctype: "AWB",
      fields: ["*"],
      filters: {
        name: ["like", `%${searchTerm}%`],
      },
    };

    const response = await axios.get(
      `${getBaseUrl().method}/${routes.getshipmentList}`,
      {
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error: unknown | any) {
    console.log(error?.response);

    const { status, data } = error?.response;

    if (status >= 400 || status <= 499) {
      throw {
        message:
          data.message ||
          "Currently unable to process your request, please try again later",
        data: null,
      };
    }
    throw {
      message:
        "Couldn't perform your request. Please make sure your phone has an Internet connection and try again",
      data: null,
    };
  }
};
