/**
 * Business Configuration for Dynamic Stress Buster Cafe
 * 
 * Edit these values whenever real business locations or contact details change.
 * All Google Maps links and contact widgets dynamically derive their destination URLs from this config.
 */

export const businessConfig = {
  cafeName: "Dynamic Stress Buster Cafe",
  tagline: "Sip. Relax. Recharge.",
  address: "Plot 42, Green Serenity Boulevard, Mindful Haven Quarter, Bengaluru, Karnataka 560038, India",
  isPlaceholderAddress: true, // Set to false once real official address is updated
  displayAddress: "Plot 42, Green Serenity Boulevard, Mindful Haven Quarter, Bengaluru, Karnataka 560038",
  phone: "+91 98765 43210",
  altPhone: "+91 80 4123 4567",
  email: "hello@dynamicstressbuster.cafe",
  supportEmail: "care@dynamicstressbuster.cafe",
  
  // Coordinates (Optional; used for pinpoint directions if set)
  latitude: 12.9716,
  longitude: 77.5946,

  // Opening Hours
  openingHours: {
    weekdays: "8:00 AM – 11:00 PM (Monday – Friday)",
    weekends: "7:30 AM – 11:30 PM (Saturday – Sunday)",
    kitchenCloses: "30 minutes before closing",
    workFriendlyHours: "All Day — High Speed Wi-Fi & Power Sockets Available"
  },

  // Social Media Links
  socials: {
    instagram: "https://instagram.com/dynamicstressbustercafe",
    facebook: "https://facebook.com/dynamicstressbustercafe",
    twitter: "https://twitter.com/dynamicstresscafe",
    youtube: "https://youtube.com/@dynamicstressbustercafe"
  },

  // Tax and Delivery Policy (Disabled by default until actual policies supplied)
  orderingPolicy: {
    taxRatePercent: 0, // 5% GST if enabled in future
    deliveryFee: 0,    // Free demo pickup or dining
    packagingFee: 0,
    currencySymbol: "₹"
  }
};

/**
 * Returns Google Maps URL formatted per Google API specification:
 * https://www.google.com/maps/search/?api=1&query=URL_ENCODED_CAFE_ADDRESS
 */
export function getGoogleMapsUrl(customAddress = null) {
  const targetAddress = customAddress || businessConfig.address;
  const encodedAddress = encodeURIComponent(targetAddress);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}

/**
 * Returns Google Maps Directions URL (from user location to destination)
 */
export function getGoogleMapsDirectionsUrl() {
  if (businessConfig.latitude && businessConfig.longitude) {
    return `https://www.google.com/maps/dir/?api=1&destination=${businessConfig.latitude},${businessConfig.longitude}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessConfig.address)}`;
}
