import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { DEMO_ANIMALS } from '../data/animals';
import { colors, fonts } from '../theme';

export default function AnimalsScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.heading}>{t('animals.title')}</Text>
      </View>
      <Text style={styles.muted}>{t('animals.registered')} · {t('home.demoData')}</Text>
      {DEMO_ANIMALS.map((animal) => (
        <View key={animal.id} style={styles.card}>
          <View style={styles.avatar}>
            {animal.image ? (
              <Image source={animal.image} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{animal.initials}</Text>
            )}
          </View>
          <View>
            <Text style={styles.name}>{animal.name}</Text>
            <Text style={styles.muted}>
              {animal.breed} {animal.tag}
            </Text>
          </View>
        </View>
      ))}
      {/* TODO: wire this to the add-animal form from the next Stitch screen. */}
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>{t('animals.addAnimal')}</Text>
      </Pressable>
      <Text style={styles.muted}>{t('common.placeholder')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingTop: 48, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  heading: { fontFamily: fonts.extraBold, fontSize: 24, color: colors.text },
  muted: { fontFamily: fonts.regular, color: colors.muted },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.animalAvatar, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { color: '#fff', fontSize: 20, fontFamily: fonts.extraBold },
  name: { fontFamily: fonts.bold, color: colors.text, fontSize: 16 },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontFamily: fonts.bold },
});
