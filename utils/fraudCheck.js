export const fraudCheck = (user, amount) => {
  if (!user || !amount) return true;
  const dailyLimit = 10000;
  if (amount > dailyLimit) {
    return false;
  }
  return true;
};

