import Purchases, { PurchasesOffering } from "react-native-purchases";

export async function initializeRevenueCat(userId: string) {
  Purchases.configure({
    apiKey: process.env.REVENUECAT_API_KEY!,
    appUserID: userId,
  });
}

export async function getOfferings(): Promise<PurchasesOffering[]> {
  try {
    const offerings = await Purchases.getOfferings();
    return Object.values(offerings.all);
  } catch (error) {
    console.error("Error fetching offerings:", error);
    return [];
  }
}

export async function purchasePackage(packageToPurchase: any) {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return customerInfo;
  } catch (error) {
    console.error("Error purchasing package:", error);
    throw error;
  }
}

export async function restorePurchases() {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error("Error restoring purchases:", error);
    throw error;
  }
}
