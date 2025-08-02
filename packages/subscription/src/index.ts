export * from "./stripe";
export * from "./types";

export const initializeRevenueCat = async (userId: string) => {
  throw new Error('RevenueCat is only available in React Native environment');
};

export const getOfferings = async () => {
  throw new Error('RevenueCat is only available in React Native environment');
};

export const purchasePackage = async (packageToPurchase: any) => {
  throw new Error('RevenueCat is only available in React Native environment');
};

export const restorePurchases = async () => {
  throw new Error('RevenueCat is only available in React Native environment');
};
