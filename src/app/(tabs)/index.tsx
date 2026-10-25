import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import AnimalSelectSheet, { type ScanMode } from '../../components/AnimalSelectSheet';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { DEMO_ANIMALS } from '../../data/animals';
import { colors, fonts, type Animal } from '../../theme';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [scanMode, setScanMode] = useState<ScanMode | null>(null);

  const openSheet = (mode: ScanMode) => {
    setScanMode(mode);
    setSheetVisible(true);
  };

  const goToScan = (animal: Animal, mode: ScanMode) => {
    router.push({ pathname: '/scan', params: { animal: animal.name, source: mode } });
  };

  const goToScanNew = (mode: ScanMode) => {
    router.push({ pathname: '/scan', params: { animal: 'new', source: mode } });
  };

  const comingSoon = () => Alert.alert(t('common.comingSoon'), t('common.placeholder'));

  return (
    <View style={styles.container}>
      {/* Header — matches the Stitch header, with the working language switcher.
          Note: the Stitch code labelled its third button "हिंदी" by mistake;
          this app correctly shows मराठी there. */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Ionicons name="leaf" size={22} color={colors.primaryFixed} />
          </View>
          <View>
            <Text style={styles.brand}>FARM FAMILY</Text>
            <Text style={styles.pageTitle}>{t('nav.home')}</Text>
          </View>
        </View>
        <LanguageSwitcher />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>{t('home.quickActions')}</Text>
            <Text style={styles.sectionNote}>{t('home.recentlyVisited')}</Text>
          </View>
          <View style={styles.quickRow}>
            <Link href="/animals" asChild>
              <Pressable style={styles.quickCard}>
                <View style={[styles.quickIcon, { backgroundColor: colors.primaryFixed }]}>
                  <Ionicons name="paw" size={20} color={colors.primary} />
                </View>
                <View style={styles.quickText}>
                  <Text style={styles.quickTitle}>{t('home.myCattle')}</Text>
                  <Text style={styles.quickSub}>{t('home.animalsRegistered')}</Text>
                </View>
              </Pressable>
            </Link>
            <Pressable style={styles.quickCard} onPress={comingSoon}>
              <View style={[styles.quickIcon, { backgroundColor: colors.secondaryFixed }]}>
                <Ionicons name="trending-up" size={20} color={colors.secondary} />
              </View>
              <View style={styles.quickText}>
                <Text style={styles.quickTitle}>{t('home.mandisRates')}</Text>
                <Text style={styles.quickSub}>{t('home.livePuneMarket')}</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* My Registered Animals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.animalsLabel}>
              <Ionicons name="paw" size={16} color={colors.primary} /> {t('home.myRegisteredAnimals')}
            </Text>
            <Link href="/animals" asChild>
              <Pressable style={styles.viewAll}>
                <Text style={styles.viewAllText}>{t('home.viewAll')}</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.primary} />
              </Pressable>
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.animalStrip}>
            {DEMO_ANIMALS.map((animal) => (
              <Link key={animal.id} href="/animals" asChild>
                <Pressable style={styles.animalItem}>
                  <View style={styles.animalAvatar}>
                    {animal.image ? (
                      <Image source={animal.image} style={styles.animalImage} />
                    ) : (
                      <Text style={styles.animalInitial}>{animal.initials}</Text>
                    )}
                  </View>
                  <Text style={styles.animalName}>{animal.name}</Text>
                  <Text style={styles.animalSub}>
                    {animal.breed} • {animal.tag}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </ScrollView>
          <Link href="/animals" asChild>
            <Pressable style={styles.registerCard}>
              <View style={styles.registerLeft}>
                <View style={styles.addIcon}>
                  <Ionicons name="add" size={22} color={colors.primary} />
                </View>
                <View style={styles.registerText}>
                  <Text style={styles.registerTitle}>{t('home.registerAdd')}</Text>
                  <Text style={styles.registerSub}>{t('home.registerDesc')}</Text>
                </View>
              </View>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>{t('home.addAnimal')}</Text>
              </View>
            </Pressable>
          </Link>
        </View>

        {/* AI Animal Health Scan */}
        <View style={styles.section}>
          <LinearGradient colors={['#0c392d', '#134e3f', '#082820']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.scanCard}>
            <View style={styles.orbTop} />
            <View style={styles.orbBottom} />
            <View style={styles.scanTop}>
              <View style={styles.aiPill}>
                <View style={styles.aiDot} />
                <Text style={styles.aiPillText}>{t('home.instantAI')}</Text>
              </View>
              <View style={styles.scanIconCircle}>
                <Ionicons name="scan" size={18} color="#fff" />
              </View>
            </View>
            <Text style={styles.scanTitle}>{t('home.aiHealthCheck')}</Text>
            <Text style={styles.scanDesc}>{t('home.aiScanDesc')}</Text>
            <Pressable style={styles.scanButton} onPress={() => openSheet('camera')}>
              <Ionicons name="camera" size={22} color="#0c392d" />
              <Text style={styles.scanButtonText}>{t('home.scanNow')}</Text>
              <Ionicons name="arrow-forward" size={18} color="#0c392d" />
            </Pressable>
            <Pressable style={styles.uploadButton} onPress={() => openSheet('gallery')}>
              <Ionicons name="images" size={22} color="#fff" />
              <Text style={styles.uploadButtonText}>{t('home.uploadGallery')}</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </Pressable>
          </LinearGradient>
          {/* The scan is triage only, never a final diagnosis — kept on every scan surface. */}
          <Text style={styles.disclaimer}>{t('home.triageDisclaimer')}</Text>
        </View>

        {/* Farm Services */}
        <View style={styles.section}>
          <Text style={styles.servicesLabel}>{t('home.farmServices')}</Text>
          <Text style={styles.servicesTitle}>{t('home.essentialUpdates')}</Text>
          <View style={styles.serviceCard}>
            <View style={styles.serviceTop}>
              <View style={[styles.serviceIcon, { backgroundColor: colors.tertiaryFixed }]}>
                <Ionicons name="play-circle" size={20} color={colors.tertiaryContainer} />
              </View>
              <View style={[styles.badge, { backgroundColor: colors.tertiaryContainer }]}>
                <Text style={styles.badgeTextWhite}>{t('home.lessons')}</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>{t('home.iLearning')}</Text>
            <Text style={styles.serviceDesc}>{t('home.iLearningDescFull')}</Text>
            <Pressable style={styles.serviceButton} onPress={comingSoon}>
              <Text style={[styles.serviceButtonText, { color: colors.primary }]}>{t('home.watchModules')}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </Pressable>
          </View>
          <View style={styles.serviceCard}>
            <View style={styles.serviceTop}>
              <View style={[styles.serviceIcon, { backgroundColor: colors.secondaryFixed }]}>
                <Ionicons name="medkit" size={20} color={colors.secondary} />
              </View>
              <View style={[styles.badge, { backgroundColor: colors.errorContainer }]}>
                <Text style={[styles.badgeText, { color: colors.onErrorContainer }]}>{t('home.dueSoonBadge')}</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>{t('home.vaccination')}</Text>
            <Text style={styles.serviceDesc}>{t('home.vaccinationDescFull')}</Text>
            <Pressable style={styles.serviceButton} onPress={comingSoon}>
              <Text style={[styles.serviceButtonText, { color: colors.secondary }]}>{t('home.viewVaccination')}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.secondary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <AnimalSelectSheet
        visible={sheetVisible}
        mode={scanMode}
        onClose={() => setSheetVisible(false)}
        onSelectAnimal={goToScan}
        onSelectNew={goToScanNew}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: { fontFamily: fonts.semiBold, fontSize: 10, color: colors.muted, textTransform: 'uppercase', letterSpacing: 1 },
  pageTitle: { fontFamily: fonts.semiBold, fontSize: 17, color: colors.text, lineHeight: 22 },
  content: { paddingHorizontal: 16, paddingBottom: 110, gap: 24 },
  section: { gap: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionLabel: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionNote: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  quickText: { flex: 1 },
  quickTitle: { fontFamily: fonts.bold, fontSize: 12, color: colors.text },
  quickSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  animalsLabel: { fontFamily: fonts.bold, fontSize: 12, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5 },
  viewAll: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  viewAllText: { fontFamily: fonts.bold, fontSize: 12, color: colors.primary },
  animalStrip: { gap: 12, paddingVertical: 4 },
  animalItem: { alignItems: 'center', width: 64 },
  animalAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.animalAvatar, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  animalImage: { width: '100%', height: '100%' },
  animalInitial: { fontFamily: fonts.extraBold, fontSize: 24, color: '#fff' },
  animalName: { fontFamily: fonts.bold, fontSize: 12, color: colors.text, marginTop: 6 },
  animalSub: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  registerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.border,
  },
  registerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  addIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryFixed, alignItems: 'center', justifyContent: 'center' },
  registerText: { flex: 1 },
  registerTitle: { fontFamily: fonts.bold, fontSize: 12, color: colors.text },
  registerSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  addButton: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  addButtonText: { fontFamily: fonts.bold, fontSize: 12, color: '#fff' },
  scanCard: { borderRadius: 28, padding: 16, overflow: 'hidden' },
  orbTop: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(52,211,153,0.2)' },
  orbBottom: { position: 'absolute', bottom: -32, left: -32, width: 144, height: 144, borderRadius: 72, backgroundColor: 'rgba(45,212,191,0.15)' },
  scanTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  aiPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 },
  aiDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primaryFixed },
  aiPillText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.primaryFixed },
  scanIconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  scanTitle: { fontFamily: fonts.bold, fontSize: 22, color: '#fff', lineHeight: 28 },
  scanDesc: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 16, marginTop: 4, marginBottom: 16 },
  scanButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 12, height: 48, marginBottom: 10 },
  scanButtonText: { fontFamily: fonts.bold, fontSize: 17, color: '#0c392d' },
  uploadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 12, height: 48 },
  uploadButtonText: { fontFamily: fonts.semiBold, fontSize: 17, color: '#fff' },
  disclaimer: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, lineHeight: 16, marginTop: 4 },
  servicesLabel: { fontFamily: fonts.bold, fontSize: 12, color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  servicesTitle: { fontFamily: fonts.semiBold, fontSize: 17, color: colors.text },
  serviceCard: { backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 16, gap: 8 },
  serviceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontFamily: fonts.bold, fontSize: 12 },
  badgeTextWhite: { fontFamily: fonts.bold, fontSize: 12, color: '#fff' },
  serviceTitle: { fontFamily: fonts.semiBold, fontSize: 17, color: colors.text },
  serviceDesc: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted, lineHeight: 16 },
  serviceButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: colors.surfaceContainerLow, borderRadius: 8, height: 36, marginTop: 4 },
  serviceButtonText: { fontFamily: fonts.semiBold, fontSize: 12 },
});
