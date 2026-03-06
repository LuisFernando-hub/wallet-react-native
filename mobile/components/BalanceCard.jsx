import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  const balance = Number(summary?.balance ?? 0).toFixed(2);

  const balance2 = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(summary?.balance || 0)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ka-GE", {
      style: "currency",
      currency: "GEL",
      minimumFractionDigits: 2,
    }).format(value || 0);
  };

  const income = parseFloat(summary?.income || 0);
  const expenses = parseFloat(summary?.expenses || 0);
  const total = parseFloat(summary?.balance || 0);

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>₾{Number(summary?.balance ?? 0).toFixed(2)}</Text>
      <Text style={styles.balanceAmount}>₾{summary?.balance}</Text>
      <Text style={styles.balanceAmount}>₾{balance}</Text>
      <Text style={styles.balanceAmount}>₾{balance2}</Text>
      <Text style={styles.balanceAmount}>₾{total} total</Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +₾{parseFloat(summary.income).toFixed(2)}
            +₾{income} income
          </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -₾{Math.abs(parseFloat(summary.expenses)).toFixed(2)}
            +₾{expenses} expenses
          </Text>
        </View>
      </View>
    </View>
  );
};