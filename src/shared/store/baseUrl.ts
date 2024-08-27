type Environments = "staging" | "development" | "production";

const environment: Environments = "production";

export const AppUrls = {
  production: `https://shippex-demo.bc.brandimic.com/api/`,
  staging: `https://shippex-demo.bc.brandimic.com/api/`,
  uat: `https://shippex-demo.bc.brandimic.com/api/`,
};

const baseUrlGetter = (filter: "method") => `${AppUrls[environment]}${filter}`;

export const getBaseUrl = () => ({
  method: baseUrlGetter("method"),
});
