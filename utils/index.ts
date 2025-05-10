export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

   // Helper function to truncate long text safely
 export const truncateText = (text: string | undefined, maxLength: number = 120): string => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };