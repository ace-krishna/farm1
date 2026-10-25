import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '../../components/LanguageSwitcher';
import { colors } from '../../theme';

export default function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('profile.title')}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('profile.language')}</Text>
        <Text style={styles.body}>{t('profile.languageDesc')}</Text>
        <View style={styles.switcher}>
          <LanguageSwitcher />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('profile.about')}</Text>
        <Text style={styles.body}>{t('profile.aboutDesc')}</Text>
      </View>
      <Text style={styles.muted}>{t('profile.version')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, gap: 12 },
  heading: { fontSize: 24, fontWeight: '800', color: colors.text },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontWeight: '700', color: colors.text, fontSize: 16 },
  body: { color: colors.text, marginTop: 6 },
  switcher: { marginTop: 12 },
  muted: { color: colors.muted },
});
