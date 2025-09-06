import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '../../components/header/header';
import CardList from '../../components/card-list/card-list';
import Footer from '../../components/footer/Footer';

export default function Home( ) {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <CardList/>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'magenta',
  }
});
