import { Animated } from "react-native";
export const formatDateOfBirth = (date: string) => {
  if (!date) {
    return "";
  }
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const newDate = date.split("-");
  const day = newDate[0];
  const monthIndex = months.indexOf(newDate[1].toLowerCase()) + 1;
  const month =
    monthIndex.toString().length === 1
      ? `0${monthIndex.toString()}`
      : monthIndex.toString();
  const year = newDate[2];
  return `${year}-${month}-${day}`;
};

export const asteriskPhoneNumber = (number_: string) =>
  `${number_?.slice(0, 4)}****${number_?.slice(8, number_?.length)}`;
export const asteriskEmail = (email: string) =>
  `${email?.slice(0, 2)}******** @${email.split("@")[1]}`;

export const triggerShakeAnimation = (animValue: Animated.Value) => {
  Animated.sequence([
    Animated.timing(animValue, {
      toValue: -10, // move left
      duration: 100,
      useNativeDriver: true, // this option is required for performance
    }),
    Animated.timing(animValue, {
      toValue: 10, // move right
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: -10, // move left
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(animValue, {
      toValue: 0, // reset position
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start(); // start the sequence
};

export const Currency = (currency?: string) => {
  const currencyUpper = currency?.toUpperCase();
  switch (currencyUpper) {
    case "NGN": {
      return "\u20A6";
    }
    case "USD": {
      return "\u0024";
    }
    case "EUR": {
      return "\u20AC";
    }
    case "GBP": {
      return "\u00A3";
    }
    case "JPY": {
      return "\u00A5";
    }
    case "AUD": {
      return "\u0024";
    }
    case "CAD": {
      return "\u0024";
    }
    case "CHF": {
      return "CHF";
    }
    case "CNY": {
      return "\u5143";
    }
    case "DKK": {
      return "Kr";
    }
    case "GHS": {
      return "GH₵";
    }
    case "ZAR": {
      return "R";
    }
    case "INR": {
      return "\u20B9";
    }
    case "BRL": {
      return "R$";
    }
    case "MXN": {
      return "$";
    }
    case "KRW": {
      return "\u20A9";
    }
    case "MYR": {
      return "RM";
    }
    case "NZD": {
      return "$";
    }
    case "PHP": {
      return "\u20B1";
    }
    default: {
      return "\u20B1";
    }
  }
};

// export const getBankName = (code?: string, bankList: BankType[] = []) => {
//   // const bank = bankList?.find((b: BankType) => b.institutionCode === code);
//   const bank = bankList?.find((b: BankType) => b.bankCode === code);

//   return bank?.bankName;
// };

export function getTimeBasedGreeting(): string {
  // Get the current date and time
  const currentHour = new Date().getHours();

  // Set the greeting based on current hour
  let greeting: string;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // Return the greeting
  return greeting;
}

export const transactionBackground = (status: string) => {
  if (status === "APPROVED") return "rgba(0, 178, 146, 0.16)";
  if (status === "REJECTED") return "rgba(220, 48, 39, 0.16)";
  return "rgba(0, 0, 0, 0.07)";
};

export const transactionColor = (status: string) => {
  if (status === "STAGING") return "rgba(119, 119, 119, 1)";
  if (status === "REJECTED" || status === "REJECT")
    return "rgba(194, 32, 23, 1)";
  if (status === "APPROVED") return "rgba(70, 157, 142, 1)";
  return "grey";
};
