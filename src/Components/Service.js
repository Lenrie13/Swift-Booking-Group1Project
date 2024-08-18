export const getDiscountForRoomType = (roomType) => {
    const discounts = {
      single: 0.1, // 10% discount
      double: 0.15, // 15% discount
      deluxe: 0.2, // 20% discount
      suite: 0.25, // 25% discount
    };
  
    return discounts[roomType] || 0;
  };
  
  export const applyDiscount = (roomType, basePrice) => {
    const discount = getDiscountForRoomType(roomType);
    return basePrice - basePrice * discount;
  };
  