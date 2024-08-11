import { DataProvider } from "react-admin";
import { Post, getPostsByStatus } from "./posts";

let apiUrl = "https://staging.iskibris.com/api/applications/test";
const cache: Record<string, any> = {};

const fetchJson = (url: string, options: RequestInit = {}) => {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const dataProvider: DataProvider = {
  getList: (resource: string, params: any) => {
    apiUrl = "https://staging.iskibris.com/api/applications/test";

    const { filter, sort, range } = params;
    const fetchParams = {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    };

    console.log(filter);
    if (filter) {
      const query = Object.keys(filter)
        .map((key) => `${key}=${filter[key]}`)
        .join("&");
      apiUrl += `?${query}`;
    }
    console.log(filter);
    console.log(apiUrl);

    if (sort) {
      //apiUrl += `&_sort=${sort.field}&_order=${sort.order}`;
      apiUrl += `&_sort=id&_order=${sort.order}`;
    }

    if (range) {
      apiUrl += `&_start=${range[0]}&_end=${range[1]}`;
    }

    return fetchJson(apiUrl, fetchParams)
      .then((response) => {
        const data = response.data;
        const total = data.length;
        return { data, total };
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  },

  getOne: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  },

  create: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error creating data:", error);
        throw error;
      });
  },

  update: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error updating data:", error);
        throw error;
      });
  },

  delete: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error deleting data:", error);
        throw error;
      });
  },

  getMany: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  },

  getManyReference: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  },

  updateMany: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "PATCH",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error updating data:", error);
        throw error;
      });
  },

  deleteMany: (resource: string, params: any) => {
    return fetchJson(apiUrl, {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
      .then((response) => {
        const data = response.data;
        return { data };
      })

      .catch((error) => {
        console.error("Error deleting data:", error);
        throw error;
      });
  },

  updatePostStatus: async (source, destination) => {
    // implement your custom updatePostStatus logic here
    // you can use the fetchJson function to make API calls
  },
};

export default dataProvider;

export type MyDataProvider = typeof dataProvider;
