import { useUser } from '@clerk/clerk-expo'
import { useRouter, useFocusEffect } from 'expo-router'
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Platform } from 'react-native'
import { useTransactions } from '../../hooks/useTransactions';
import { useCallback, useEffect, useState } from 'react';
import PageLoader from '../../components/PageLoader';
import { styles } from '../../assets/styles/home.styles';
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from '../../components/BalanceCard';
import { TransactionItem } from '../../components/TransactionItem';
import NoTransactionsFound from '../../components/NoTransactionsFound';
import { SignOutButton } from '../../components/SignOutButton';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useUser();
  const { transactions, summary, isLoading, loadData, deleteTransaction, fetchSummary } = useTransactions(user.id)

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadData(), fetchSummary()]);
    setRefreshing(false);
  }, [loadData, fetchSummary]);

  useEffect(() => {
    loadData();
    fetchSummary();
  }, [loadData, fetchSummary]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  const handleDelete = async (id) => {
    // No Web, window.confirm é funcional, mas para uma UX melhor use Sonner ou um Modal customizado
    if (Platform.OS === 'web') {
      const ok = window.confirm("Deseja realmente excluir esta transação?");
      if (ok) {
        await deleteTransaction(id);
        toast.success("Transação excluída!");
      }
    } else {
      // Lógica de Alert.alert para Mobile
    }
  };

  if (isLoading && !refreshing) return <PageLoader />

  return (
    // Adicione uma View de "Wrapper" com maxWidth para telas grandes
    <View style={[styles.container, { alignItems: 'center' }]}>
      <View style={[styles.content, { width: '100%', maxWidth: 800 }]}>
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode='contain'
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Bem-vindo,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
               style={[styles.addButton, { cursor: 'pointer' }]} // Cursor pointer para Web
               onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color="#FFF"/>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton/>
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Transações Recentes</Text>
          <TouchableOpacity onPress={onRefresh} style={{ padding: 8 }}>
            <Ionicons name="refresh" size={20} color="#666"/>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.transactionsList}
          contentContainerStyle={[styles.transactionsListContent, { paddingBottom: 40 }]}
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
          ListEmptyComponent={<NoTransactionsFound />}
          showsVerticalScrollIndicator={Platform.OS === 'web'} // Mostrar no Chrome é mais natural
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  )
}