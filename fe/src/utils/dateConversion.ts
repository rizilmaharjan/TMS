export function formatDate(inputDate:any) {
    const date = new Date(inputDate);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const ampm = date.getHours() < 12 ? "am" : "pm";
  
    return `${month} ${day}, ${hour}${ampm}`;
  }
  
  