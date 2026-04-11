import { jsPDF } from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  // Header section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(34, 40, 49); // Dark grey/blue
  doc.text("SHREE KRISHNA ENTERPRISES", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("123, Marketplace Road, Industrial Area, City", 105, 28, { align: "center" });
  doc.text("Phone: +91 8149111602  |  Email: parthbhojane1602@gmail.com", 105, 33, { align: "center" });

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(15, 38, 195, 38);

  // Invoice Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(50, 50, 50);
  doc.text("TAX INVOICE", 105, 48, { align: "center" });

  // Order Info & Customer Info
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  // Left Column - Bill To
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 15, 60);

  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${order.userName || 'N/A'}`, 15, 67);
  doc.text(`Phone: ${order.userPhone || 'N/A'}`, 15, 74);
  const splitAddress = doc.splitTextToSize(`Address: ${order.userAddress || 'N/A'}`, 80);
  doc.text(splitAddress, 15, 81);

  // Right Column - Invoice Details
  const rightColX = 130;
  doc.setFont("helvetica", "bold");
  doc.text(`Invoice No:`, rightColX, 60);
  doc.text(`Date:`, rightColX, 67);
  doc.text(`Status:`, rightColX, 74);

  doc.setFont("helvetica", "normal");
  doc.text(`#${(order._id || Date.now().toString()).slice(-8).toUpperCase()}`, rightColX + 25, 60);
  doc.text(`${new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`, rightColX + 25, 67);
  doc.text(`${order.status || 'Pending'}`, rightColX + 25, 74);

  // Products Table Header
  const tableTop = 105;
  doc.setFillColor(255, 152, 0); // Theme orange color
  doc.rect(15, tableTop, 180, 10, "F");
  
  doc.setTextColor(255, 255, 255); // White text
  doc.setFont("helvetica", "bold");
  doc.text("Item Description", 20, tableTop + 7);
  doc.text("Qty", 120, tableTop + 7, { align: "center" });
  doc.text("Rate", 150, tableTop + 7, { align: "right" });
  doc.text("Amount", 185, tableTop + 7, { align: "right" });

  doc.setTextColor(0, 0, 0); // Reset text color

  // Products List
  doc.setFont("helvetica", "normal");
  let yPos = tableTop + 17;
  
  const products = order.products || [];
  let subtotal = 0;

  products.forEach((item, index) => {
    const itemSubtotal = item.total || (item.price * item.quantity) || 0;
    subtotal += itemSubtotal;

    doc.text(`${index + 1}. ${item.name}`, 20, yPos);
    doc.text(`${item.quantity}`, 120, yPos, { align: "center" });
    doc.text(`Rs. ${parseFloat(item.price || 0).toFixed(2)}`, 150, yPos, { align: "right" });
    doc.text(`Rs. ${parseFloat(itemSubtotal).toFixed(2)}`, 185, yPos, { align: "right" });
    yPos += 10;
  });

  // Calculate Shipping (assuming basic logic if exact shipping not saved, or just use total difference)
  const orderTotal = order.totalAmount || subtotal;
  let shippingCost = orderTotal - subtotal;
  if(shippingCost < 0) shippingCost = 0;

  // Divider above totals
  doc.line(15, yPos + 2, 195, yPos + 2);
  yPos += 10;

  // Totals Area
  doc.text("Subtotal:", 150, yPos, { align: "right" });
  doc.text(`Rs. ${subtotal.toFixed(2)}`, 185, yPos, { align: "right" });
  yPos += 8;

  doc.text("Shipping:", 150, yPos, { align: "right" });
  doc.text(`Rs. ${shippingCost.toFixed(2)}`, 185, yPos, { align: "right" });
  yPos += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", 150, yPos, { align: "right" });
  doc.text(`Rs. ${orderTotal.toFixed(2)}`, 185, yPos, { align: "right" });

  // Footer text
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text("Thank you for your business!", 105, 275, { align: "center" });
  doc.text("This is a computer-generated invoice and requires no signature.", 105, 280, { align: "center" });

  // Save the PDF
  const filename = `Invoice_${(order._id || 'Order').slice(-8).toUpperCase()}.pdf`;
  doc.save(filename);
};
