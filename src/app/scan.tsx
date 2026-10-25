import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../theme';

// Placeholder scan screen. Carlos will send the camera screen code later;
// when it arrives, this file is replaced by that camera implementation.
// It already receives the animal + source chosen in the Home popup.
export default function ScanScreen() {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{ animal?: string; source?: string }>();
  const animalName = params.animal === 'new' ? t('scan.scanNew') : params.animal ?? '';
  const sourceLabel = params.source === 'gallery' ? t('scan.sourceGallery') : t('scan.sourceCamera');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.heading}>{t('scan.title')}</Text>
      </View>
      <View style={styles.viewfinder}>
        <Text style={styles.viewfinderText}>{t('scan.viewfinder')}</Text>
        {animalName ? (
          <Text style={styles.viewfinderSub}>
            {t('scan.selectedAnimal')}: {animalName} · {sourceLabel}
          </Text>
        ) : null}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('scan.resultTitle')}</Text>
        <Text style={styles.body}>{t('scan.resultMonitor')}</Text>
      </View>
      <Text style={styles.disclaimer}>{t('scan.disclaimer')}</Text>
      <Text style={styles.muted}>{t('scan.cameraComing')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 48, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  heading: { fontFamily: fonts.extraBold, fontSize: 24, color: colors.text },
  viewfinder: { height: 240, borderRadius: 16, backgroundColor: colors.scan, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 8 },
  viewfinderText: { fontFamily: fonts.semiBold, color: '#fff', textAlign: 'center' },
  viewfinderSub: { fontFamily: fonts.regular, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border },
  cardTitle: { fontFamily: fonts.bold, color: colors.text, fontSize: 16 },
  body: { fontFamily: fonts.regular, color: colors.text, marginTop: 6 },
  disclaimer: { fontFamily: fonts.regular, color: colors.muted, fontSize: 12 },
  muted: { fontFamily: fonts.regular, color: colors.muted },
});
