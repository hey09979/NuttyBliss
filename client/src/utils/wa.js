export const openWhatsApp = (order, adminPhone) => {
  const { customerDetails, orderItems, totalPrice, _id } = order;
  
  let itemStrings = orderItems.map(item => 
    `• *${item.name}* (x${item.qty}) - ₹${item.price * item.qty}`
  ).join('\n');

  const message = `*NEW ORDER FROM NUTTYBLISS* 🥜✨\n\n` +
    `*Order ID:* #${_id.substring(18)}\n` +
    `*Status:* Pending Confirmation\n\n` +
    `*Customer Details:*\n` +
    `Name: ${customerDetails.name}\n` +
    `Phone: ${customerDetails.phone}\n` +
    `Address: ${customerDetails.address}, ${customerDetails.postalCode}\n\n` +
    `*Items:*\n${itemStrings}\n\n` +
    `*Total amount to pay:* ₹${totalPrice}\n\n` +
    `Please confirm my order. Thank you! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${adminPhone.replace('+', '').replace(' ', '')}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};
