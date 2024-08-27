type HttpMethods = "post" | "get" | "put" | "delete";

const routeCreator = (path: string, method: HttpMethods = "get") => ({
  method,
  path,
});

export const routes = {
  login: routeCreator("login", "post"),
  getshipmentStatus: routeCreator("frappe.client.get_list", "get"),
  getshipmentList: routeCreator("frappe.client.get_list", "get"),
};
