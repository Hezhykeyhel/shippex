import Environments from "./env";
import { HitchpayType, PaystackType } from "./type";

export const hitchpay : HitchpayType = {
  uat: "https://staging.hitchpay.app",
};
export const paystackPublickey : PaystackType = {
  uat_public_key: "pk_test_941a38c39dd7896b32b79a3d07cff314e79b3437",
};

export const ENVIRONMENT = Environments.UAT;
export const BASE_URL_HITCHPAY = hitchpay[ENVIRONMENT] ;
export const PAYSTACKPUBLICKEY = paystackPublickey[ENVIRONMENT];



// https://staging.hitchpay.app/api/v1/bills-payment/get_tv_billers_with_service_id/?service_id





// https://staging.hitchpay.app/api/v1/bills-payment/get_tv_biller_services/