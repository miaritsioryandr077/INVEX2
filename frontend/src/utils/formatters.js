export const formatNumber = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  };