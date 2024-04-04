// export function sortItems(items: any, priorityValue: string): any[] | null {
//     // Check if the items array and priorityValue are defined.
//     if (!items || !priorityValue) {
//       return null;
//     }
  
//     // Sort the items array based on the priorityValue state.
//     return items?.sort((a, b) => {
//       if (a.priority === priorityValue && b.priority === priorityValue) {
//         return a.name.localeCompare(b.name);
//       } else if (a.priority === priorityValue) {
//         return -1;
//       } else if (b.priority === priorityValue) {
//         return 1;
//       } else {
//         return a.priority < b.priority ? -1 : 1;
//       }
//     });
//   }