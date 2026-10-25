import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors } from '../../theme';

export default function MarketplaceScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('marketplace.title')}</Text>
      <Text style={styles.body}>{t('marketplace.desc')}</Text>
      <Text style={styles.muted}>{t('marketplace.comingSoon')}</Text>
      <Text style={styles.muted}>{t('common.placeholder')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, gap: 8 },
  heading: { fontSize: 24, fontWeight: '800', color: colors.text },
  body: { color: colors.text },
  muted: { color: colors.muted },
});
