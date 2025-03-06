export const formatCurrency = (val: unknown) => {
    if (!val) return ""; // If empty, return empty string
    return new Intl.NumberFormat("en-US").format(Number(val));
  };