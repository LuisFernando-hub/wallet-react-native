import { View, Text, Platform } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

export const BalanceCard = ({ summary }) => {
  // Centralizando a lógica de formatação
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
    <View style={[styles.balanceCard, Platform.OS === 'web' && { elevation: 0, boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }]}>
      <Text style={styles.balanceTitle}>Saldo Total</Text>
      <Text style={styles.balanceAmount}>{formatCurrency(total)}</Text>
      
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Entradas</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            + {formatCurrency(income)}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Saídas</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            - {formatCurrency(Math.abs(expenses))}
          </Text>
        </View>
      </View>
    </View>
  );
};